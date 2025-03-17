"use server";

import { ForbiddenError, ValidationError } from "@/error";
import { db } from "@/lib/db";
import { CaloriesResponseSchema, MealSchemaBasic, MealSchemaBasicType, MealSchemaFullInfo, MealSchemaFullInfoType } from "@/schemas/index";
import { endOfDay, startOfDay } from "date-fns";
import { createTranslator } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { currentUser } from './auth';
import { increaseRequestsAmount } from "./user";

export const createMeal = async (mealSchemaBasicValues: MealSchemaBasicType, mealSchemaFullInfo: MealSchemaFullInfoType, date: Date) => {
    const mealSchemaBasicValid = MealSchemaBasic.safeParse(mealSchemaBasicValues);
    const locale = await getLocale();
    const messages = await getMessages();
    const t = createTranslator({ locale, messages });

    try {
        if (!mealSchemaBasicValid.success) {
            console.error(mealSchemaBasicValid.error.format());
            throw new ValidationError(locale, messages);
        }

        const mealSchemaFullInfoValid = MealSchemaFullInfo.safeParse(mealSchemaFullInfo);
        if (!mealSchemaFullInfoValid.success) {
            console.error(mealSchemaFullInfoValid.error.format());
            throw new ValidationError(locale, messages);
        }

        const user = await currentUser();

        const { name, weight } = mealSchemaBasicValid.data;
        const { time, avgCalories, carbohydrates, fats, proteins } = mealSchemaFullInfoValid.data;
        const [hours, minutes] = time.split(":").map(Number);
        date.setHours(hours, minutes, 0, 0);

        await db.meal.create({
            data: {
                name,
                weight,
                calories: avgCalories,
                carbohydrates,
                fats,
                proteins,
                userId: user.id as string,
                date
            },
        });
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message as string };
        }
        console.error(error);
        return { error: t("Error.unknownError") as string };
    }
};

export const getMealsByDate = async (date: Date) => {
    const user = await currentUser();
    const meals = await db.meal.findMany({
        where: {
            date: {
                gte: startOfDay(date),
                lte: endOfDay(date),
            },
            userId: user.id
        },
        orderBy: {
            date: "asc"
        }
    });

    return meals;
}

export const getMealsBetween = async (startDate: Date, endDate: Date) => {
    const user = await currentUser();
    const meals = await db.meal.findMany({
        where: {
            date: {
                gte: startOfDay(startDate),
                lte: endOfDay(endDate),
            },
            userId: user.id,
        },
        orderBy: {
            date: "asc"
        }
    });

    return meals;
}

export const predictCalories = async (mealName: string, weight: number) => {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
    const locale = await getLocale();
    const messages = await getMessages();
    const t = createTranslator({ locale, messages });

    try {
        // Check and increase requests amount
        await increaseRequestsAmount();

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: t("OpenAI.SystemMessage"),
                },
                {
                    role: "user",
                    content: t("OpenAI.UserPromt").replace(":mealName", mealName).replace(":weight", weight.toString()),
                },
            ],
            response_format: zodResponseFormat(CaloriesResponseSchema, "calories"),
        });
        return completion.choices[0].message.parsed;
    } catch (error) {
        if (error instanceof ForbiddenError) {
            return {
                minCalories: 0,
                maxCalories: 0,
                avgCalories: 0,
                proteins: 0,
                fats: 0,
                carbohydrates: 0,
                comment: t("Error.requestLimit"),
                error: error.message,
            };
        }
        if (error instanceof Error) {
            console.error(t("Error.calculateCalories"), error);
            return {
                minCalories: 0,
                maxCalories: 0,
                avgCalories: 0,
                proteins: 0,
                fats: 0,
                carbohydrates: 0,
                comment: t("Error.unknownMeal"),
                error: error.message ?? t("Error.unknownError"),
            };
        }
        return {
            minCalories: 0,
            maxCalories: 0,
            avgCalories: 0,
            proteins: 0,
            fats: 0,
            carbohydrates: 0,
            comment: t("Error.unknownError"),
            error: t("Error.unknownError"),
        };
    }
}

export const deleteMeal = async (mealId: string) => {
    const user = await currentUser();

    await db.meal.deleteMany({
        where: {
            id: mealId,
            userId: user.id
        }
    })
}

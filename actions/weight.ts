"use server";

import { calculateCalories } from "@/lib/calories-calculator-util";
import { db } from "@/lib/db";
import { CalorieCalculatorInput } from "@/types/calorie-calculator.types";
import { endOfDay, startOfDay } from "date-fns";
import { currentUser } from "./auth";

export const createOrUpdateWeightRecord = async (values: CalorieCalculatorInput) => {
    const user = await currentUser();

    const { weight } = values;
    const { calories, carbohydrates, fats, proteins } = calculateCalories(values);

    const weightRecord = await db.weight.findFirst({
        where: {
            userId: user.id,
            date: {
                gte: startOfDay(new Date()),
                lt: endOfDay(new Date())
            }
        }
    });

    const data = {
        userId: user.id as string,
        date: new Date(),
        weight,
        caloriesIntake: calories,
        carbohydratesIntake: carbohydrates,
        fatsIntake: fats,
        proteinsIntake: proteins,
    }

    if (weightRecord) {
        const updatedWeight = await db.weight.updateMany({
            where: {
                id: weightRecord.id
            },
            data
        });
        console.debug('Updated weight: ', updatedWeight);
    } else {
        const savedWeight = await db.weight.create({
            data
        });
        console.debug('Saved weight: ', savedWeight);
    }
}

export const getLatestWeightRecord = async (date: Date) => {
    const user = await currentUser();
    const weightRecord = await db.weight.findFirstOrThrow({
        where: {
            userId: user.id,
            date: {
                lte: endOfDay(date),
            }
        },
        orderBy: {
            date: 'desc'
        }
    });

    return weightRecord;
}

export const getEarliestWeightRecord = async () => {
    const user = await currentUser();
    const weightRecord = await db.weight.findFirstOrThrow({
        where: {
            userId: user.id,
        },
        orderBy: {
            date: 'asc'
        }
    });

    return weightRecord;
}

interface WeightProps {
    startDate?: Date;
    endDate?: Date;
    order?: 'asc' | 'desc';
}

export const getWeightRecordsBetween = async (props?: WeightProps) => {
    const user = await currentUser();
    return await db.weight.findMany({
        where: {
            userId: user.id,
            date: {
                gte: props?.startDate ? startOfDay(props?.startDate) : undefined,
                lte: props?.endDate ? endOfDay(props?.endDate) : undefined,
            },
        },
        orderBy: {
            date: props?.order || 'desc'
        }
    })
}

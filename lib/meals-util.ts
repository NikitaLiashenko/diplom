import { Goal, Meal, Weight } from "@prisma/client";
import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import { SERVICE_DATE_FORMAT } from "./date-util";

export const groupMealsByDate = (meals: Meal[]): Record<string, Meal[]> => {
    return meals.reduce<Record<string, Meal[]>>((acc, meal) => {
        const dateKey = format(startOfDay(new Date(meal.date)), SERVICE_DATE_FORMAT);

        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }

        acc[dateKey].push(meal);

        return acc;
    }, {});
}

export const mealsByDateContainsKey = (mealsByDate: Record<string, Meal[]>, key: string): boolean => {
    return !!mealsByDate[key]?.length;
}

export const calculateTotalParam = (meals: Meal[], reducer: (sum: number, meal: Meal) => number): number => {
    return meals.reduce(reducer, 0);
}

export const calculateCompletedParamPercent = (meals: Meal[], reducer: (sum: number, meal: Meal) => number, paramIntake: number): number => {
    return calculateTotalParam(meals, reducer) / paramIntake * 100;
}

export const getDailyCaloriesStatus = (weights: Weight[], meals: Meal[], day: Date, goal: Goal): 'completed' | 'not completed' | 'no info' => {
    const weightRecordByDay = weights.find(weight => isSameDay(startOfDay(weight.date), day) || isBefore(startOfDay(weight.date), day));
    if (!weightRecordByDay) {
        return 'no info';
    }
    const caloriesIntake = weightRecordByDay.caloriesIntake;
    const totalCalories = calculateTotalParam(meals, (sum, meal) => sum + meal.calories);
    const CALORIES_THRESHOLD = Number(process.env.NEXT_PUBLIC_CALORIES_THRESHOLD);

    const difference = caloriesIntake - totalCalories;

    let isCompleted = false;

    switch (goal) {
        case "gain":
            isCompleted = totalCalories >= caloriesIntake || Math.abs(difference) < CALORIES_THRESHOLD;
            break;
        case "maintain":
            isCompleted = Math.abs(difference) < CALORIES_THRESHOLD;
            break;
        case "lose":
        default:
            isCompleted = totalCalories <= caloriesIntake || Math.abs(difference) > CALORIES_THRESHOLD;
            break;
    }

    return isCompleted ? "completed" : "not completed";
}
import { Gender, Goal } from "@prisma/client";

export interface CalorieCalculatorInput {
    weight: number; // kg
    height: number; // cm
    birthDate: Date;
    gender: Gender;
    activityLevel: number;
    goal: Goal;
}

export interface CalorieObject {
    calories: number;
    proteins: number;
    fats: number;
    carbohydrates: number;
}

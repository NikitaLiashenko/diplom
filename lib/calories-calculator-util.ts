import { CalorieCalculatorInput, CalorieObject } from "@/types/calorie-calculator.types";
import { getAgeFromBirthDate } from './date-util';
import { User } from "next-auth";

export const calculateCalories = ({
    weight,
    height,
    birthDate,
    gender,
    activityLevel,
    goal,
}: CalorieCalculatorInput): CalorieObject => {
    const age = getAgeFromBirthDate(birthDate);

    // BMR calculation (Mifflin-St Jeor Formula)
    const bmr =
        gender === "male"
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161;

    // Total Daily Energy Expenditure (TDEE)
    let tdee = bmr * activityLevel;

    // Adjust for goal
    if (goal === "lose") tdee -= 500; // Deficit for weight loss
    if (goal === "gain") tdee += 500; // Surplus for weight gain

    // Macronutrients calculation
    const proteins = weight * 1.5; // 1.5g per kg
    const fats = (tdee * 0.25) / 9; // 25% of calories from fat
    const remainingCalories = tdee - proteins * 4 - fats * 9;
    const carbohydrates = remainingCalories / 4;

    return {
        calories: Math.round(tdee),
        proteins: Math.round(proteins),
        fats: Math.round(fats),
        carbohydrates: Math.round(carbohydrates),
    };
}

export const isBodyStatsFilled = (user: User) => {
    return !!user.height
        && !!user.weight
        && !!user.gender
        && !!user.birthDate
        && !!user.activityLevel
        && !!user.goal;
} 

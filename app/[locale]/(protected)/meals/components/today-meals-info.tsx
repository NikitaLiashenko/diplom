'use client';

import { getMealsByDate } from "@/actions/meals";
import { getLatestWeightRecord } from "@/actions/weight";
import CircularProgress from "@/components/ui/circular-progress";
import { colors } from "@/components/ui/colors";
import { icons } from "@/components/ui/icons";
import { formatDate } from "@/lib/date-util";
import { useDateLocale } from "@/lib/hooks/date-format";
import { calculateTotalParam } from "@/lib/meals-util";
import { CalorieObject } from "@/types/calorie-calculator.types";
import { Meal } from "@prisma/client";
import { Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { calculateCompletedParamPercent } from '../../../../../lib/meals-util';
import AddMealDialog from "./add-meal-dialog";
import MealCard from "./meal-card";
import MealCardSkeleton from "./meal-card-skeleton";

interface TodayMealsInfoProps {
    date: Date;
    updateCalendarInfo: () => void;
}

const TodayMealsInfo = ({ date, updateCalendarInfo }: TodayMealsInfoProps) => {
    const t = useTranslations("MealPage");
    const dateLocale = useDateLocale();

    const [meals, setMeals] = useState<Meal[]>([]);
    const [mealsIntake, setMealsIntake] = useState<CalorieObject>();
    const [mealsCompletedIntake, setMealsCompletedIntake] = useState<CalorieObject>();
    const [mealsCompletedIntakePercent, setMealsCompletedIntakePercent] = useState<CalorieObject>();
    const [mounted, setMounted] = useState(false);
    const [isPending, startTransition] = useTransition();

    const getTodayMeals = async () => {
        startTransition(() => {
            getMealsByDate(date)
                .then(mealsResponse => setMeals(mealsResponse))
                .catch(err => {
                    console.error(err);
                    toast.error(err);
                });
        })
    }

    const getCaloriesIntake = async () => {
        startTransition(() => {
            getLatestWeightRecord(date)
                .then(weightRecord => {
                    const calorieObject = {
                        calories: weightRecord.caloriesIntake,
                        carbohydrates: weightRecord.carbohydratesIntake,
                        fats: weightRecord.fatsIntake,
                        proteins: weightRecord.proteinsIntake
                    }
                    setMealsIntake(calorieObject);
                    updateMealsCompletedIntake(calorieObject);
                })
                .catch((error: Error) => {
                    console.error(error);
                    toast.error(error.message);
                })
        })
    }

    function updateMealsCompletedIntake(mealsIntake: CalorieObject) {
        setMealsCompletedIntake({
            calories: calculateTotalParam(meals, (sum, meal) => sum + meal.calories),
            carbohydrates: calculateTotalParam(meals, (sum, meal) => sum + meal.carbohydrates),
            fats: calculateTotalParam(meals, (sum, meal) => sum + meal.fats),
            proteins: calculateTotalParam(meals, (sum, meal) => sum + meal.proteins),
        });
        setMealsCompletedIntakePercent({
            calories: calculateCompletedParamPercent(meals, (sum, meal) => sum + meal.calories, mealsIntake.calories),
            carbohydrates: calculateCompletedParamPercent(meals, (sum, meal) => sum + meal.carbohydrates, mealsIntake.carbohydrates),
            fats: calculateCompletedParamPercent(meals, (sum, meal) => sum + meal.fats, mealsIntake.fats),
            proteins: calculateCompletedParamPercent(meals, (sum, meal) => sum + meal.proteins, mealsIntake.proteins),
        });
    }

    const updateStates = async () => {
        getTodayMeals();
        updateCalendarInfo();
    }

    useEffect(() => {
        setMounted(true);
        getTodayMeals();
        getCaloriesIntake();
    }, [date]);

    useEffect(() => {
        if (mealsIntake) {
            updateMealsCompletedIntake(mealsIntake);
        }
    }, [meals, mealsIntake]);

    return (
        <>
            <div>
                <CircularProgress
                    color={colors['calories']}
                    value={mealsCompletedIntakePercent?.calories || 0}
                    progressName={t("calories")}
                    icon={icons['calories']}
                    label={`${mealsCompletedIntake?.calories || 0} / ${mealsIntake?.calories || 0}`}
                    size="medium"
                />
                <div className="flex">
                    <CircularProgress
                        color={colors['fats']}
                        value={mealsCompletedIntakePercent?.fats || 0}
                        progressName={t("fats")}
                        icon={icons['fats']}
                        label={`${mealsCompletedIntake?.fats || 0} / ${mealsIntake?.fats || 0}`}
                        size="small"
                    />
                    <CircularProgress
                        color={colors['proteins']}
                        value={mealsCompletedIntakePercent?.proteins || 0}
                        progressName={t("proteins")}
                        icon={icons['proteins']}
                        label={`${mealsCompletedIntake?.proteins || 0} / ${mealsIntake?.proteins || 0}`}
                        size="small"
                    />
                    <CircularProgress
                        color={colors['carbohydrates']}
                        value={mealsCompletedIntakePercent?.carbohydrates || 0}
                        progressName={t("carbohydrates")}
                        icon={icons['carbohydrates']}
                        label={`${mealsCompletedIntake?.carbohydrates || 0} / ${mealsIntake?.carbohydrates || 0}`}
                        size="small"
                    />
                </div>
            </div>
            <div>
                <h1 className="text-lg text-center mb-4 flex justify-center gap-2">{t("todayMeals").replace(":today", formatDate(date, dateLocale))} <Calendar /></h1>
                <AddMealDialog date={date} updateMealsState={updateStates} />
                <div className="flex flex-col mb-4 gap-2 mt-4">
                    {isPending || !mounted
                        ? <>
                            {Array.from({ length: 2 }).map((_, index) => (
                                <MealCardSkeleton key={index} />
                            ))}
                        </>
                        : meals.map(meal => (
                            <MealCard key={meal.id} meal={meal} updateMealsState={updateStates} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default TodayMealsInfo;
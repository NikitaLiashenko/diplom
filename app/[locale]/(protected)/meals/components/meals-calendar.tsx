'use client';

import { getMealsBetween } from "@/actions/meals";
import { getEarliestWeightRecord, getWeightRecordsBetween } from "@/actions/weight";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import DefaultLoader from "@/components/ui/loading/default-loader";
import { SERVICE_DATE_FORMAT } from "@/lib/date-util";
import { useDateLocale } from "@/lib/hooks/date-format";
import { useCurrentUser } from "@/lib/hooks/use-current-user";
import { getDailyCaloriesStatus, groupMealsByDate, mealsByDateContainsKey } from "@/lib/meals-util";
import { cn } from "@/lib/utils";
import { Goal, Meal, Weight } from "@prisma/client";
import { endOfMonth, endOfWeek, format, startOfMonth, startOfWeek } from "date-fns";
import { notFound } from "next/navigation";
import { useEffect, useState, useTransition } from 'react';
import { toast } from "sonner";
import CalendarLegendTooltip from './calendar/calendar-ledend-tooltip';
import CalendarDayHoverCard from "./calendar/day-hover-card";
import TodayMealsInfo from "./today-meals-info";

const MealsCalendar = () => {
    const dateLocale = useDateLocale();
    const today = new Date();
    const user = useCurrentUser();

    const [selected, setSelected] = useState<Date | undefined>(today);
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [selectedMonth, setSelectedMonth] = useState<Date>(today);

    const [mounted, setMounted] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [meals, setMeals] = useState<Record<string, Meal[]>>({});
    const [weights, setWeights] = useState<Weight[]>([]);

    const getStartDateCalendar = () => {
        startTransition(() => {
            getEarliestWeightRecord()
                .then(weightRecord => {
                    setStartDate(weightRecord.date);
                })
        })
    };

    const handleMonthChange = (month: Date) => {
        setSelectedMonth(month);
        const fromDate = startOfWeek(startOfMonth(month));
        const toDate = endOfWeek(endOfMonth(month));

        startTransition(() => {
            getMealsBetween(fromDate, toDate)
                .then(mealsResponse => {
                    setMeals(groupMealsByDate(mealsResponse));
                })
                .catch(err => {
                    console.error(err);
                    toast.error(err);
                });
        });

        startTransition(() => {
            getWeightRecordsBetween({ startDate: fromDate, endDate: toDate })
                .then(weightsResponse => {
                    setWeights(weightsResponse);
                })
                .catch(err => {
                    console.error(err);
                    toast.error(err);
                });
        });

    };

    useEffect(() => {
        setMounted(true);
        getStartDateCalendar();
        handleMonthChange(selectedMonth);
    }, []);

    if (!user) {
        return notFound();
    }

    return (
        <Card className="w-full p-4">
            <CardContent className="flex flex-col-reverse md:flex-row items-center md:items-start gap-4 justify-between">
                <div className="text-center">
                    <div className="relative">
                        <Calendar
                            mode="single"
                            disabled={isPending || !mounted}
                            fromDate={startDate}
                            className={cn(isPending && "opacity-50")}
                            locale={dateLocale}
                            selected={selected}
                            onSelect={setSelected}
                            month={selectedMonth}
                            onMonthChange={handleMonthChange}
                            disableNavigation={isPending}
                            captionLayout="dropdown-buttons"
                            modifiers={{
                                notCompleted: (day) => {
                                    const key = format(day, SERVICE_DATE_FORMAT);
                                    if (mealsByDateContainsKey(meals, key)) {
                                        const response = getDailyCaloriesStatus(weights, meals[key], day, user.goal as Goal);
                                        return response === 'not completed';
                                    }
                                    return false;
                                },
                                completed: (day) => {
                                    const key = format(day, SERVICE_DATE_FORMAT);
                                    if (mealsByDateContainsKey(meals, key)) {
                                        const response = getDailyCaloriesStatus(weights, meals[key], day, user.goal as Goal);
                                        return response === 'completed';
                                    }
                                    return false;
                                },
                                noInfo: (day) => {
                                    const key = format(day, SERVICE_DATE_FORMAT);
                                    if (!mealsByDateContainsKey(meals, key)) {
                                        return true;
                                    }
                                    const response = getDailyCaloriesStatus(weights, meals[key], day, user.goal as Goal);
                                    return response === 'no info';
                                }
                            }}
                            modifiersClassNames={{
                                notCompleted: "ring-2 ring-offset-2 ring-destructive m-2",
                                completed: "ring-2 ring-offset-2 ring-emerald-300 m-2",
                                noInfo: "ring-2 ring-offset-2 ring-gray-200 m-2",
                            }}
                            classNames={{
                                head_row: 'flex justify-around'
                            }}
                            components={{
                                DayContent: ({ date }) => {
                                    const key = format(date, SERVICE_DATE_FORMAT);
                                    const mealsByDate = meals[key];

                                    return (
                                        <CalendarDayHoverCard date={date} mealsByDate={mealsByDate} />
                                    );
                                },
                            }}
                        />
                        {(isPending || !mounted) && <DefaultLoader className="absolute top-1/2 left-1/2 translate-x-[-50%]" />}
                    </div>
                    <CalendarLegendTooltip />
                </div>
                <TodayMealsInfo date={selected || today} updateCalendarInfo={() => handleMonthChange(selectedMonth)} />
            </CardContent>
        </Card>
    );
}

export default MealsCalendar;

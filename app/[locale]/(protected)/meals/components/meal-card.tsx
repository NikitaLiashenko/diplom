import { deleteMeal } from "@/actions/meals";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { colors } from '@/components/ui/colors';
import { icons } from "@/components/ui/icons";
import { Meal } from "@prisma/client";
import { format } from "date-fns";
import { Clock, X } from 'lucide-react';
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import MealStats from './meal-stats';

interface MealCardProps {
    meal: Meal;
    updateMealsState: () => Promise<void>;
}

const MealCard = ({ meal, updateMealsState }: MealCardProps) => {
    const t = useTranslations("Common");
    const [alertOpen, setAlertOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const onDelete = () => {
        startTransition(() => {
            deleteMeal(meal.id)
                .then(() => {
                    setAlertOpen(false);
                    updateMealsState();
                })
                .catch(err => console.error(err));
        })
    }

    return (
        <>
            <AlertModal
                isOpen={alertOpen}
                onClose={() => setAlertOpen(false)}
                onConfirm={onDelete}
                loading={isPending}
            />
            <Card>
                <CardHeader className="relative">
                    <Button
                        variant='link'
                        className="absolute top-1 right-1 hover:text-red-500 transition-colors"
                        onClick={() => setAlertOpen(true)}>
                        <X />
                    </Button>
                    <CardTitle>{meal.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1"><Clock size="14" /> {format(meal.date, "HH:mm")}</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-2 justify-around">
                    <MealStats icon={icons['calories']} value={meal.calories} color={colors['calories']} />
                    <MealStats icon={icons['fats']} value={meal.fats} color={colors['fats']} />
                    <MealStats icon={icons['proteins']} value={meal.proteins} color={colors['proteins']} />
                    <MealStats icon={icons['carbohydrates']} value={meal.carbohydrates} color={colors['carbohydrates']} />
                    <MealStats icon={icons['weight']} value={meal.weight + ' ' + t("gramShort")} color={colors['weight']} />
                </CardContent>
            </Card>
        </>
    );
}

export default MealCard;
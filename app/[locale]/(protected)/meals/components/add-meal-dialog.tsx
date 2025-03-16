'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useMealForm } from "../meals-form-context";
import MealForm from "./meal-form";
import MealFullInfoForm from "./meal-full-info-form";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

interface AddMealDialogProps {
    date: Date;
    updateMealsState: () => Promise<void>;
}

const AddMealDialog = ({ date, updateMealsState }: AddMealDialogProps) => {
    const t = useTranslations("AddMealDialog");
    const { step, isDialogOpen, setDialogOpen } = useMealForm();

    return (
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="default" className="w-full">
                    <Plus />
                    {t("addMealButtonLabel")}
                </Button>
            </DialogTrigger>
            {step === 1 &&
                <MealForm />
            }
            {step === 2 &&
                <MealFullInfoForm date={date} updateMealsState={updateMealsState} />
            }
        </Dialog>
    );
}

export default AddMealDialog;
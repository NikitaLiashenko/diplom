'use client';

import { createMeal, predictCalories } from "@/actions/meals";
import { CaloriesResponseSchema, MealSchemaBasic, MealSchemaBasicType, MealSchemaFullInfo, MealSchemaFullInfoType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

interface MealFormContextType {
    fullInfoForm: ReturnType<typeof useForm<MealSchemaFullInfoType>>;
    basicForm: ReturnType<typeof useForm<MealSchemaBasicType>>;
    onSubmit: (date: Date) => Promise<void>;
    onMealInfoPredict: () => void;
    isPending: boolean;
    step: number;
    previousStep: () => void;
    mealData: z.infer<typeof CaloriesResponseSchema> | undefined;
    setDialogOpen: (value: boolean) => void;
    isDialogOpen: boolean;
}

const MealFormContext = createContext<MealFormContextType | undefined>(undefined);

export const MealFormProvider = ({ children }: { children: React.ReactNode; }) => {
    const [step, setStep] = useState(1);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [mealData, setMealData] = useState<z.infer<typeof CaloriesResponseSchema>>();

    const basicForm = useForm<MealSchemaBasicType>({
        resolver: zodResolver(MealSchemaBasic),
        defaultValues: {
            name: "",
            weight: undefined,
        },
    });

    const fullInfoForm = useForm<MealSchemaFullInfoType>({
        resolver: zodResolver(MealSchemaFullInfo),
        defaultValues: {
            avgCalories: mealData?.avgCalories,
            carbohydrates: mealData?.carbohydrates,
            fats: mealData?.fats,
            proteins: mealData?.proteins,
        },
    });

    const onMealInfoPredict = async () => {
        const values = basicForm.getValues();
        startTransition(() => {
            predictCalories(values.name, values.weight)
                .then((data) => {
                    if (!data) {
                        throw new Error("Couldn't predict calories"); //TODO: Translate
                    }
                    if (data?.error) {
                        console.error(data.error);
                        toast.error(data.error);
                    }
                    setMealData(data);
                    fullInfoForm.reset({
                        ...fullInfoForm.getValues(),
                        ...data
                    });
                }).catch(error => {
                    toast.error(error);
                    console.error(error);
                }).finally(() => {
                    setStep(step + 1);
                });
        });
    };

    const onSubmit = async (date: Date) => {
        startTransition(async () => {
            try {
                await createMeal(basicForm.getValues(), fullInfoForm.getValues(), date);
                setDialogOpen(false);
                toast.success(`Meal ${basicForm.watch('name')} was successfully created`); //TODO: Translate
                basicForm.reset();
                fullInfoForm.reset();
                setStep(1);
            } catch (error) {
                console.error(error);
                toast.error("Ошибка при создании блюда"); //TODO: Translate
            }
        });
    };

    return (
        <MealFormContext.Provider value={{
            fullInfoForm, basicForm, onSubmit, onMealInfoPredict, isPending, step, mealData,
            previousStep: () => setStep(step - 1),
            isDialogOpen,
            setDialogOpen
        }}>
            {children}
        </MealFormContext.Provider>
    );
};

export const useMealForm = () => {
    const context = useContext(MealFormContext);
    if (!context) {
        throw new Error("useMealForm must be used within a MealFormProvider"); //TODO: Translate
    }
    return context;
};


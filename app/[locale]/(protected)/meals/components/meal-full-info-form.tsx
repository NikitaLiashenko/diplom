'use client';

import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ExpandableText from "@/components/ui/expandable-text";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading/loading-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import TimePicker from "@/components/ui/time-picker";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useMealForm } from "../meals-form-context";

interface MealFullInfoFormProps {
    date: Date;
    updateMealsState: () => Promise<void>;
}

const MealFullInfoForm = ({ date, updateMealsState }: MealFullInfoFormProps) => {
    const t = useTranslations("MealFullInfoForm");
    const { fullInfoForm: form, isPending, onSubmit, mealData, previousStep } = useMealForm();

    useEffect(() => {
        form.setValue('time', format(new Date(), 'HH:mm'))
    }, []);

    const submitAndUpdate = async () => {
        await onSubmit(date);
        updateMealsState();
    }

    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("dialogTitle")}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[72vh] w-full pr-2">
                    {mealData && <ExpandableText
                        text={mealData.comment}
                        className={cn("text-sm text-muted-foreground mb-6", mealData.error && 'text-destructive')}
                        defaultExpanded={!!mealData.error}
                    />}
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(submitAndUpdate)}
                            className="space-y-6"
                        >
                            <div className="space-y-4 px-[1px]">
                                <FormField
                                    control={form.control}
                                    name="avgCalories"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel icon={icons['calories']} iconProps={{ size: 15 }}>{t("caloriesLabel")}
                                                {
                                                    mealData && <span>
                                                        ({mealData.minCalories} - {mealData.maxCalories})
                                                    </span>
                                                }
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="300"
                                                    type="num"
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {t("caloriesDescription")}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2 items-start">
                                    <FormField
                                        control={form.control}
                                        name="carbohydrates"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel icon={icons['carbohydrates']} iconProps={{ size: 15 }}>
                                                    {t("carbohydratesLabel")}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="5"
                                                        type="num"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="fats"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel icon={icons['fats']} iconProps={{ size: 15 }}>
                                                    {t("fatsLabel")}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="5"
                                                        type="num"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="proteins"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel icon={icons['proteins']} iconProps={{ size: 15 }}>
                                                    {t("proteinsLabel")}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder="5"
                                                        type="num"
                                                        disabled={isPending}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="time"
                                    render={({ field, fieldState }) => (
                                        <FormItem>
                                            <FormLabel>{t("timeLabel")}</FormLabel>
                                            <FormControl>
                                                <TimePicker
                                                    {...field}
                                                    invalid={fieldState.invalid}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {t("timeDescription")}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex items-center gap-2">
                                    <Button
                                        disabled={isPending}
                                        variant="outline"
                                        type="button"
                                        className="w-full"
                                        onClick={previousStep}
                                    >
                                        <Undo2 />
                                        {t("backButtonLabel")}
                                    </Button>
                                    <LoadingButton
                                        isLoading={isPending}
                                        type="submit"
                                        className="w-full"
                                    >
                                        {t("saveButtonLabel")}
                                    </LoadingButton>
                                </div>
                            </div>
                        </form>
                    </Form>
                </ScrollArea>
            </DialogContent>
        </>
    );
}

export default MealFullInfoForm;
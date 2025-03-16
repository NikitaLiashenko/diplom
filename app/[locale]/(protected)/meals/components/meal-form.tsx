'use client';

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading/loading-button";
import { Utensils, Weight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMealForm } from "../meals-form-context";

const MealForm = () => {
    const t = useTranslations("MealForm");
    const commonTranslations = useTranslations("Common");
    const { basicForm: form, isPending, onMealInfoPredict } = useMealForm();

    return (
        <>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{t("dialogTitle")}</DialogTitle>
                    <DialogDescription>
                        {t("dialogDescription")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onMealInfoPredict)}
                        className="space-y-6"
                    >
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel icon={Utensils} iconProps={{ size: 15 }}>{t("mealNameLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={t("placeHolder")}
                                                type="text"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("mealNameDescription")}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="weight"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel icon={Weight} iconProps={{ size: 15 }}>{t("mealWeightLabel")}</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder={`200 ${commonTranslations('gramShort')}`}
                                                type="number"
                                                disabled={isPending}
                                                value={field.value || ''}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {t("mealWeightDescription")}
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <LoadingButton
                                isLoading={isPending}
                                type="submit"
                                className="w-full"
                            >
                                {t("continueButtonLabel")}
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </>
    );
}

export default MealForm;

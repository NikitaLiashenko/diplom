"use client";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading/loading-button";
import { FillProfileSchemaType } from "@/schemas";
import { Undo2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

interface PrivateFillProfileFormStepProps {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    form: UseFormReturn<FillProfileSchemaType, any, undefined>;
    onSubmit: () => void;
    onBack: () => void;
    isPending: boolean;
}

const PrivateFillProfileFormStep = ({ form, onSubmit, onBack, isPending }: PrivateFillProfileFormStepProps) => {
    const t = useTranslations("FillProfilePage");

    const handleSubmit = async () => {
        await form.trigger();
        if (form.formState.isValid) {
            onSubmit();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
                <div className="space-y-4">
                    <FormField control={form.control} name="weight" render={({ field }) => (
                        <FormItem>
                            <FormLabel required>{t("weightLabel")}</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ''} placeholder="70" type="number" disabled={isPending} />
                            </FormControl>
                            <FormDescription>
                                {t("weightDescription")}
                            </FormDescription>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="height" render={({ field }) => (
                        <FormItem>
                            <FormLabel required>{t("heightLabel")}</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ''} placeholder="175" type="number" disabled={isPending} />
                            </FormControl>
                            <FormDescription>
                                {t("heightDescription")}
                            </FormDescription>
                        </FormItem>
                    )} />
                    <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field, fieldState }) => (
                            <FormItem>
                                <FormLabel required>{t("birthDate")}</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        {...field}
                                        invalid={fieldState.invalid}
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t("descriptionDate")}
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-between gap-4">
                    <Button type="button" className="w-full" variant="outline" onClick={onBack} disabled={isPending}>
                        <Undo2 />
                        {t("backButton")}
                    </Button>
                    <LoadingButton type="submit" className="w-full" isLoading={isPending}>
                        {t("saveButtonLabel")}
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}

export default PrivateFillProfileFormStep;
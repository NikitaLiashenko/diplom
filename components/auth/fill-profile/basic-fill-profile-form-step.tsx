"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { goalIcons } from "@/components/ui/icons";
import { LoadingButton } from "@/components/ui/loading/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FillProfileSchemaType } from "@/schemas";
import { Goal } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

interface BasicFillProfileFormStepProps {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    form: UseFormReturn<FillProfileSchemaType, any, undefined>;
    onSubmit: () => void;
}

const BasicFillProfileFormStep = ({ form, onSubmit }: BasicFillProfileFormStepProps) => {
    const t = useTranslations("FillProfilePage");
    const enumTranslation = useTranslations("Enum");

    const onContinue = async () => {
        await form.trigger();
        if (form.formState.isValid) {
            onSubmit();
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onContinue)} className="space-y-6 w-full">
                <div className="space-y-4">
                    <FormField control={form.control} name="activityLevel" render={({ field }) => (
                        <FormItem>
                            <FormLabel required>{enumTranslation("activityLevel.label")}</FormLabel>
                            <Select {...field} value={field.value?.toString()} onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                <FormControl>
                                    <SelectTrigger className="w-full border p-2 rounded">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1.2">{enumTranslation("activityLevel.1-2")}</SelectItem>
                                    <SelectItem value="1.375">{enumTranslation("activityLevel.1-375")}</SelectItem>
                                    <SelectItem value="1.55">{enumTranslation("activityLevel.1-55")}</SelectItem>
                                    <SelectItem value="1.725">{enumTranslation("activityLevel.1-725")}</SelectItem>
                                    <SelectItem value="1.9">{enumTranslation("activityLevel.1-9")}</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                {enumTranslation("activityLevel.description")}
                            </FormDescription>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="goal" render={({ field }) => (
                        <FormItem>
                            <FormLabel required>{enumTranslation("goal.label")}</FormLabel>
                            <Select {...field} value={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger className="w-full border p-2 rounded">
                                        <SelectValue />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(Object.values(Goal) as Goal[]).map((goal) => {
                                        const Icon = goalIcons[goal];
                                        return (
                                            <SelectItem key={goal} value={goal}>
                                                {enumTranslation(`goal.${goal}`)}
                                                <Icon className="w-4 h-4 inline-block ml-2" />
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                {enumTranslation("goal.description")}
                            </FormDescription>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem>
                            <FormLabel required>{enumTranslation("gender.label")}</FormLabel>
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                            {enumTranslation("gender.male")}
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <RadioGroupItem value="female" />
                                        </FormControl>
                                        <FormLabel className="font-normal cursor-pointer">
                                            {enumTranslation("gender.female")}
                                        </FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>

                <div className="flex justify-between gap-4">
                    <LoadingButton type="submit" className="w-full">
                        {t("continueButton")}
                        <ArrowRight />
                    </LoadingButton>
                </div>
            </form>
        </Form>
    );
}

export default BasicFillProfileFormStep;
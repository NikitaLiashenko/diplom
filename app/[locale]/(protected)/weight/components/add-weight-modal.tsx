"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading/loading-button";
import { AddUserWeightSchema, AddUserWeightSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { addUserWeight } from '../../../../../actions/user';
import { toast } from "sonner";
import { updateUserSession } from "@/lib/update-session";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/use-current-user";

interface AddWeightModalProps {
    edit?: boolean;
}

const AddWeightModal = ({ edit }: AddWeightModalProps) => {
    const { data: session, update } = useSession();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const user = useCurrentUser();
    const t = useTranslations("WeightPage.CurrentWeight.AddWeightModal");

    const form = useForm<AddUserWeightSchemaType>({
        resolver: zodResolver(AddUserWeightSchema),
        defaultValues: {
            weight: edit ? (user?.weight || undefined) : undefined,
        }
    });
    const [isPending, startTransition] = useTransition();

    const onSubmit = (values: AddUserWeightSchemaType) => {
        startTransition(() => {
            addUserWeight(values)
                .then(async (data) => {
                    if (data.success) {
                        await updateUserSession(data.updatedUser, update, session);
                        toast.success(t("successOperation"));
                        router.refresh();
                        setOpen(false);
                    } else {
                        toast.error(data.error);
                    }
                })
                .catch(err => {
                    console.error(err.message);
                    toast.error(err.message);
                })
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center" variant="outline">
                    {!edit && <><Plus size={18} /> {t("triggerButtonAdd")}</>}
                    {edit && <><Edit size={18} /> {t("triggerButtonEdit")}</>}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t("title")}</DialogTitle>
                    <DialogDescription>
                        {t("description")}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField control={form.control} name="weight" render={({ field }) => (
                            <FormItem className="my-4">
                                <FormLabel required>{t("weightLabel")}</FormLabel>
                                <FormControl>
                                    <Input {...field} value={field.value || ''} placeholder="70.500" disabled={isPending} />
                                </FormControl>
                                <FormDescription>
                                    {t("weightDescription")}
                                </FormDescription>
                            </FormItem>
                        )} />
                        <LoadingButton type="submit" className="w-full" isLoading={isPending}>
                            {t("saveButtonLabel")}
                        </LoadingButton>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default AddWeightModal;
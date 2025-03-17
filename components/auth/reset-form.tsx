"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { reset } from "@/actions/reset";
import { CardWrapper } from "@/components/auth/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetSchema, ResetSchemaType } from "@/schemas";
import { useTranslations } from "next-intl";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { LoadingButton } from "../ui/loading/loading-button";
import { SendHorizonal } from "lucide-react";

export const ResetForm = () => {
  const t = useTranslations("ResetFormPage")
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetSchemaType>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    }
  })

  const onSubmit = (values: ResetSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      reset(values)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
          } else {
            setError(data.error);
          }
        })
        .catch((error: Error) => {
          setError(error.message);
        });
    });
  };

  return (
    <CardWrapper
      headerLabel={t("headerLabel")}
      headerDescription={t("headerDescription")}
      backButtonLabel={t("backButtonLabel")}
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel required>{t("emailLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="john.doe@example.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <LoadingButton
            isLoading={isPending}
            type="submit"
            className="w-full"
          >
            <SendHorizonal />
            {t("sendResetEmailButtonLabel")}
          </LoadingButton>
        </form>
      </Form>
    </CardWrapper>
  )
}
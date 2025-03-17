"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { newPassword } from "@/actions/new-password";
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
import { NewPasswordSchema, NewPasswordSchemaType } from "@/schemas";
import { useTranslations } from "next-intl";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { LoadingButton } from "../ui/loading/loading-button";

export const NewPasswordForm = () => {
  const t = useTranslations("NewPasswordPage");
  const searchParams = useSearchParams();;
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }
  })

  const onSubmit = (values: NewPasswordSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
          } else {
            setError(data.error);
          }
        }).catch((error: Error) => {
          setError(error.message);
        })
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("passwordLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
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
            {t("resetPasswordButtonLabel")}
          </LoadingButton>
        </form>
      </Form>
    </CardWrapper>
  )
}
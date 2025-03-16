"use client";

import { register } from "@/actions/register";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema, RegisterSchemaType } from "@/schemas/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../ui/form-error";
import { FormSuccess } from "../ui/form-success";
import { LoadingButton } from "../ui/loading/loading-button";

export const RegisterForm = () => {
  const t = useTranslations("RegisterPage");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: RegisterSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values)
        .then((data) => {
          setSuccess(data.success);
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
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel required>{t("nameLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel required>{t("emailLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="john@example.com" type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel required>{t("passwordLabel")}</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isPending} placeholder="********" type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <LoadingButton type="submit" className="w-full" isLoading={isPending}>
            {t("createAnAccountButtonLabel")}
          </LoadingButton>

          <FormError message={error} />
          <FormSuccess message={success} />
        </form>
      </Form>
    </CardWrapper>
  );
};

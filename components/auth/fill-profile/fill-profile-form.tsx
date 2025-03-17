"use client";

import { fillProfile } from "@/actions/update-profile";
import { updateUserSession } from "@/lib/update-session";
import { DEFAULT_LOGIN_REDIRECT, LOGIN_PAGE_REDIRECT } from "@/routes";
import { FillProfileSchema, FillProfileSchemaType } from "@/schemas/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../../ui/form-error";
import { BackButton } from "../back-button";
import { CardWrapper } from "../card-wrapper";
import { LogoutButton } from "../logout-button";
import BasicFillProfileFormStep from "./basic-fill-profile-form-step";
import PrivateFillProfileFormStep from "./private-fill-profile-form-step";

export const FillProfileForm = () => {
  const t = useTranslations("FillProfilePage");
  const router = useRouter();
  const { data: session, update } = useSession();
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);

  const formStep1 = useForm<FillProfileSchemaType>({
    resolver: zodResolver(FillProfileSchema.pick({
      goal: true,
      activityLevel: true,
      gender: true,
    })),
    defaultValues: {
      gender: 'male'
    },
  });

  const formStep2 = useForm<FillProfileSchemaType>({
    resolver: zodResolver(FillProfileSchema.pick({
      birthDate: true,
      weight: true,
      height: true,
    })),
    defaultValues: {},
  });

  const onContinue = () => {
    setStep(2);
  }

  const onSubmit = () => {
    setError("");

    startTransition(() => {
      fillProfile({ ...formStep1.getValues(), ...formStep2.getValues() })
        .then(async (data) => {
          if (data.success) {
            await updateUserSession(data.updatedUser, update, session);
            router.push(DEFAULT_LOGIN_REDIRECT);
          } else {
            setError(data.error);
          }
        }).catch((error: Error) => {
          console.error(error);
          setError(error.message);
        })
    });
  };

  return (
    <CardWrapper
      headerLabel={t("headerLabel")}
      headerDescription={t("headerDescription")}
      gender={formStep1.watch('gender')}
    >
      <div className="h-full flex flex-col justify-center">
        {
          step === 1 && <BasicFillProfileFormStep form={formStep1} onSubmit={onContinue} />
        }
        {
          step === 2 && <PrivateFillProfileFormStep form={formStep2} onSubmit={onSubmit} onBack={() => setStep(1)} isPending={isPending} />
        }
        <LogoutButton>
          <BackButton
            label={t("backToLoginButton")}
            href={LOGIN_PAGE_REDIRECT}
          />
        </LogoutButton>
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

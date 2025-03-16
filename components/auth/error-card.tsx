import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useTranslations } from "next-intl";

export const ErrorCard = () => {
  const t = useTranslations("ErrorCardPage")
  return (
    <CardWrapper
      headerLabel={t("headerLabel")}
      headerDescription={t("headerDescription")}
      backButtonHref="/auth/login"
      backButtonLabel={t("backButtonLabel")}
    >
      <div className="w-full flex justify-center items-center">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
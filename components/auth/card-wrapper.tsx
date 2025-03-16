"use client";

import { BackButton } from "@/components/auth/back-button";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Gender } from "@prisma/client";
import BodyPreview from "../ui/body-preview";
import LanguageSelector from "../ui/language-selector";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  headerDescription: string;
  gender?: Gender;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  headerDescription,
  gender,
  backButtonLabel = "",
  backButtonHref = "",
  showSocial = false
}: CardWrapperProps) => {
  return (
    <Card className="w-[95vw] sm:w-[70vw] shadow-md mb-4 mt-4">
      <CardHeader>
        <Header label={headerLabel} description={headerDescription} />
      </CardHeader>
      <CardContent className="flex justify-between flex-grow-0 h-[450px]">
        <div className="w-full sm:w-[30vw] flex flex-col gap-4 h-full justify-center">
          {children}
          {showSocial && (
            <Social />
          )}
          <BackButton
            label={backButtonLabel}
            href={backButtonHref}
          />
        </div>
        <BodyPreview gender={gender} />
      </CardContent>
      <CardFooter className="flex justify-center">
        <LanguageSelector />
      </CardFooter>
    </Card>
  )
}
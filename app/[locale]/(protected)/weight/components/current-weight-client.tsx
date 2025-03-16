'use client';

import { FormWarning } from "@/components/ui/form-warning";
import { CLIENT_DATE_FORMAT } from "@/lib/date-util";
import { Goal, Weight } from "@prisma/client";
import { format, isSameDay } from "date-fns";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import AddWeightModal from "./add-weight-modal";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";
import { goalIcons } from "@/components/ui/icons";

interface CurrentWeightProps {
    startWeight: Weight;
    latestWeight: Weight;
    user: User;
}

const CurrentWeightCLient = ({ startWeight, latestWeight, user }: CurrentWeightProps) => {
    const t = useTranslations("WeightPage.CurrentWeight");
    const common = useTranslations("Common");
    const enumTranslations = useTranslations("Enum");

    const isLastWeightToday = isSameDay(new Date(), latestWeight.date);
    const lastWeightDate = format(latestWeight.date, CLIENT_DATE_FORMAT);
    const GoalIcon = goalIcons[user.goal as Goal];
    return (
        <div className="pt-4 space-y-4">
            <div className="flex flex-col justify-center items-center gap-2">
                <span className="text-lg font-semibold">{t("currentWeight")}</span>
                <span className="bg-slate-200 py-4 px-8 text-5xl font-bold rounded-md">{user.weight} {common("kg")}</span>
                {!isLastWeightToday && <FormWarning message={<div className="flex items-center gap-2">{t("lastWeighin")} {lastWeightDate} <AddWeightModal /></div>} />}
                {isLastWeightToday && <Alert className="w-fit">
                    <AlertDescription className="flex flex-col sm:flex-row items-center gap-2">
                        <CheckCircle2 size={18} />
                        {t("lastWeighin")} {lastWeightDate}
                        <AddWeightModal edit />
                    </AlertDescription>
                </Alert>}
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex flex-col justify-center items-center">
                    <span className="text-lg font-semibold">{t("startWeight")}</span>
                    <span className="bg-slate-200 py-2 px-8 text-3xl font-bold rounded-md">{startWeight.weight} {common("kg")}</span>
                </div>
                <Alert className="w-fit">
                    <AlertDescription className="flex items-center gap-2">
                        <GoalIcon />
                        {enumTranslations(`goal.${user.goal}`)}
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}

export default CurrentWeightCLient;
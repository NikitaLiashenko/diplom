import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Meal } from "@prisma/client";
import { useTranslations } from "next-intl";

interface CalendarDayHoverCardProps {
    date: Date;
    mealsByDate: Meal[];
}

const CalendarDayHoverCard = ({ date, mealsByDate }: CalendarDayHoverCardProps) => {
    const t = useTranslations("MealsCalendar.Day");
    const length = mealsByDate?.length;

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="w-full h-full rounded-md flex items-center justify-center tabular-nums relative z-10 p-4">
                    <span className="text-sm">{date.getDate()}</span>
                    {length &&
                        <Badge
                            className="absolute text-[10px] px-[4px] py-0 h-4 rounded-full top-[-0.5rem] right-[-0.5rem] z-0">
                            {length}
                        </Badge>
                    }
                </div>
            </HoverCardTrigger>
            <HoverCardContent side="top" className="w-fit">
                {length
                    ? <div>{t("mealsCount").replace(":mealsCount", length.toString())}</div>
                    : <div>{t("noInfo")}</div>
                }
            </HoverCardContent>
        </HoverCard>
    );
}

export default CalendarDayHoverCard;
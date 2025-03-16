import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info, Circle } from "lucide-react";
import { useTranslations } from 'next-intl';

const CalendarLegendTooltip = () => {
    const t = useTranslations("MealsCalendar.Legend");

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline"><Info /> {t("calendarLegend")}</Button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-2 text-sm text-nowrap w-fit text-slate-600" side="top">
                <div className="flex items-center gap-2">
                    <Circle size={14} className="fill-gray-200 text-gray-400" />
                    <p> - {t("noInformation")}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Circle size={14} className="fill-red-300 text-destructive" />
                    <p> - {t("moreCalories")}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Circle size={14} className="fill-emerald-300 text-emerald-500" />
                    <p> - {t("enoughCalories")}</p>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default CalendarLegendTooltip;
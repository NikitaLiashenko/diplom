"use client";

import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { CLIENT_DATE_FORMAT } from "@/lib/date-util";
import { useDateLocale } from "@/lib/hooks/date-format";
import { cn } from "@/lib/utils";
import { Goal } from "@prisma/client";
import { format, isSameDay } from "date-fns";
import { ArrowDownRight, ArrowUpRight, CalendarIcon, Weight } from "lucide-react";
import { User } from "next-auth";
import { useTranslations } from "next-intl";
import * as RechartsPrimitive from 'recharts';
import { CartesianGrid, Label, Line, LineChart, ReferenceLine, XAxis, YAxis } from "recharts";

interface ChartData {
    weight: number;
    date: Date;
}

interface WeightChartProps {
    chartData: ChartData[];
    user: User;
}

const WeightChart = ({ chartData, user }: WeightChartProps) => {
    const t = useTranslations("WeightPage.WeightChart");
    const common = useTranslations("Common");
    const chartConfig = {
        weight: {
            label: "Weight",
            icon: Weight
        }
    } satisfies ChartConfig

    const dateLocale = useDateLocale();
    const startWeight = chartData[0]?.weight;
    const maxWeight = Math.max(...chartData.map(data => data.weight));
    const minWeight = Math.min(...chartData.map(data => data.weight));

    const CustomTooltip = ({ active, payload, label, }: React.ComponentProps<typeof RechartsPrimitive.Tooltip>) => {
        if (!active || !payload || payload.length === 0) return null;
        let arrowUpColor;
        let arrowDownColor;
        if (user.goal === Goal.gain) {
            arrowUpColor = "text-emerald-500";
            arrowDownColor = "text-destructive";
        } else if (user.goal === Goal.lose) {
            arrowDownColor = "text-emerald-500";
            arrowUpColor = "text-destructive";
        }
        const currentIndex = chartData.findIndex((item) => isSameDay(item.date, label));
        const prevPoint = currentIndex > 0 ? chartData[currentIndex - 1] : null;


        return (
            <div className="bg-primary text-primary-foreground p-2 rounded-md shadow-md border border-slate-600 flex flex-col gap-2">
                <p className="text-sm flex items-center gap-2"><CalendarIcon size={18} /> {format(label, CLIENT_DATE_FORMAT, { locale: dateLocale })}</p>
                <div className="flex items-center gap-1">
                    <p className="font-bold">{payload[0].value} {common("kg")}</p>
                    <>
                        {prevPoint && (
                            <>
                                {Number(payload[0].value) > prevPoint?.weight && <ArrowUpRight size={15} className={cn(arrowUpColor)} />}
                                {Number(payload[0].value) < prevPoint?.weight && <ArrowDownRight size={15} className={cn(arrowDownColor)} />}
                            </>
                        )}
                    </>
                </div>
            </div>
        );
    };

    return (
        <>
            <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[400px] w-full">
                <LineChart accessibilityLayer data={chartData} className="bg-slate-200 rounded-md p-2">
                    <CartesianGrid stroke="hsl(var(--primary))" strokeOpacity={0.2} />
                    <ChartTooltip content={<CustomTooltip />} />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(date) => format(date, CLIENT_DATE_FORMAT, { locale: dateLocale })}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        domain={[minWeight - 20, maxWeight + 20]}
                    />
                    <Line
                        type="monotone"
                        dataKey="weight"
                        fill="hsl(var(--primary))"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={false}
                        connectNulls
                    />
                    <ReferenceLine y={startWeight || undefined} strokeDasharray={"5 5"} strokeOpacity={0.8} stroke="hsl(var(--primary))">
                        <Label position="insideBottomRight" fill="hsl(var(--primary))">
                            {t("startWeight")}
                        </Label>
                    </ReferenceLine>
                </LineChart>
            </ChartContainer>
        </>
    );
}

export default WeightChart;
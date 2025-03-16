import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

interface CircularProgressProps {
    value: number;
    color: string;
    progressName: string;
    icon: React.ElementType;
    label?: string;
    size?: 'large' | 'medium' | 'small';
}

const CircularProgress = ({ value, color, progressName, label, icon: Icon, size = 'large' }: CircularProgressProps) => {
    const [display, setDisplay] = useState<'percent' | 'label'>('percent');
    const [animatedValue, setAnimatedValue] = useState(Math.round(value));
    const progressData = [{ name: "Progress", value: animatedValue, fill: color }];
    const backgroundData = [{ name: "Background", value: 100, fill: "#ddd" }];

    const toggleDisplayMode = () => {
        if (display == 'label') {
            setDisplay('percent');
        } else {
            setDisplay('label');
        }
    }

    useEffect(() => {
        setAnimatedValue(Math.round(value));
    }, [value]);

    return (
        <div className="flex flex-col items-center justify-center" >
            <div className={cn(
                "relative w-40 h-40 flex items-center justify-center cursor-pointer",
                size == 'medium' && 'w-32 h-32',
                size == 'small' && 'w-24 h-24'
            )} onClick={toggleDisplayMode}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="80%"
                        outerRadius="100%"
                        barSize={12}
                        data={backgroundData} // Background
                        startAngle={90}
                        endAngle={-270}
                    >
                        <RadialBar dataKey="value" fill="#ddd" isAnimationActive={false} />
                    </RadialBarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="100%" height="100%" className="absolute top-0 left-0">
                    <RadialBarChart
                        cx="50%"
                        cy="50%"
                        innerRadius="80%"
                        outerRadius="100%"
                        barSize={12}
                        data={progressData}
                        startAngle={90}
                        endAngle={90 + (360 * animatedValue) / 100}
                    >
                        <RadialBar dataKey="value" fill={color} animationDuration={1000} />
                    </RadialBarChart>
                </ResponsiveContainer>

                <div className={cn("absolute flex flex-col gap-1 items-center select-none")}>
                    <span style={{ color }}><Icon /></span>
                    {display == 'percent' &&
                        <div className={cn(
                            "text-xl flex items-center gap-1 h-4",
                            size == 'medium' && 'text-lg',
                            size == 'small' && 'text-sm'
                        )}>
                            {animatedValue}%
                        </div>
                    }
                    {display == 'label' && label && <div className={cn("text-slate-800 h-4",
                        size === 'medium' && 'text-xs',
                        size == 'small' && 'text-[10px]'
                    )}>
                        {label}
                    </div>}
                </div>
            </div>
            <span className={cn("text-sm select-none")}>{progressName}</span>
        </div>
    );
}

export default CircularProgress;
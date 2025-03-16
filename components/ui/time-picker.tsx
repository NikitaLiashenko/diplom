import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { TimePicker as DefaultTimePicker } from "react-time-picker";
import './time-picker.css';
import { CircleAlert, Clock } from "lucide-react";

interface TimePickerProps {
    value: string;
    onChange: (value: string | null) => void;
    className?: string;
    invalid: boolean;
}

const TimePicker = ({ className, value, onChange, invalid }: TimePickerProps) => {
    const [focused, setFocused] = useState(false);

    return (
        <div
            className={cn(
                "relative flex gap-2 w-full items-center rounded-md border border-input bg-background text-sm text-foreground shadow-sm transition-colors cursor-text px-3 py-2",
                focused ? "border-ring ring-ring" : "focus-within:border-ring focus-within:ring-1 focus-within:ring-ring",
                "disabled:cursor-not-allowed disabled:opacity-50",
                invalid && 'border-destructive',
                className
            )}
        >
            <Clock size={18} />
            <DefaultTimePicker
                value={value}
                onChange={onChange}
                format="HH:mm"
                className="w-full bg-transparent"
                disableClock
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                clearIcon={null}
            />
            {invalid && <CircleAlert size={18} className="absolute right-2 top-2 text-destructive" />}
        </div>
    );
};

export default TimePicker;
'use client';

import { useDateLocale } from '@/lib/hooks/date-format';
import { cn } from "@/lib/utils";
import { CalendarIcon, CircleAlert } from "lucide-react";
import { useState } from "react";
import { DatePicker as DefaultDatePicker, } from 'react-date-picker';

type ValuePiece = Date | null;

export interface DatePickerProps {
    value: Date;
    onChange: (value: ValuePiece | [ValuePiece, ValuePiece]) => void;
    invalid: boolean;
    className?: string;
}


const DatePicker = ({ className, value, onChange, invalid }: DatePickerProps) => {
    const dateLocale = useDateLocale();
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
            <CalendarIcon className="h-4 w-4" />
            <DefaultDatePicker
                value={value}
                onChange={onChange}
                locale={dateLocale.code}
                format="dd.MM.yyyy"
                className="w-full bg-transparent"
                disableCalendar
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                clearIcon={null}
            />
            {invalid && <CircleAlert size={18} className="absolute right-2 top-2 text-destructive" />}
        </div>
    );
}

export default DatePicker;

{/* <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <div className="relative">
            <Button
                type="button"
                variant={"outline"}
                className={cn(
                    "w-full pl-3 text-left font-normal justify-start",
                    className,
                    invalid && 'border-destructive',
                    !value && "text-muted-foreground"
                )}
            >
                <CalendarIcon className="h-4 w-4" />
                {value ? (
                    format(value, "PPP", { locale: dateLocale })
                ) : (
                    <span>{placeholder}</span>
                )}
            </Button>
            {invalid && <CircleAlert className="text-destructive absolute right-2 top-1/2 -translate-y-1/2" size={18} />}
        </div>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
        <Calendar
            mode="single"
            fromYear={getYear(new Date("1900-01-01"))}
            toYear={getYear(new Date())}
            captionLayout="dropdown"
            selected={value}
            onSelect={(date) => {
                onChange(date);
                setOpen(false);
            }}
            disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
        />
    </PopoverContent>
</Popover> */}
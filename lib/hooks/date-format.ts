'use client';

import { enUS, uk } from 'date-fns/locale'
import { useLocale } from "next-intl";

export const useDateLocale = () => {
    const locale = useLocale();

    switch (locale) {
        case 'en': return enUS;
        default: return uk;
    }
}

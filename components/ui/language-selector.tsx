"use client";

import { SelectItem } from '@/components/ui/select';
import { usePathname, useRouter } from "@/i18n/routing";
import { Languages } from "lucide-react";
import { useLocale, useTranslations } from 'next-intl';
import { useState } from "react";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./select";

const LanguageSelector = () => {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations("Languages");
    const locale = useLocale();
    const [language, setLanguage] = useState(locale);

    return (
        <Select value={language} onValueChange={(lang) => {
            setLanguage(lang);
            router.push(pathname, { locale: lang });
        }}>
            <SelectTrigger className="w-fit border p-2 rounded flex items-center gap-2">
                <Languages size={18} />
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="en">
                    {t("en")}
                </SelectItem>
                <SelectItem value="uk">
                    {t("uk")}
                </SelectItem>
            </SelectContent>
        </Select>
    );
}

export default LanguageSelector;
import { Locale, differenceInYears, format } from 'date-fns';

export const CLIENT_DATE_FORMAT = 'dd MMM yyyy';
export const SERVICE_DATE_FORMAT = 'yyyy-MM-dd';

export const formatDate = (date: Date, locale: Locale) => {
    return format(date, CLIENT_DATE_FORMAT, { locale });
}

export const getAgeFromBirthDate = (birthDate: Date) => {
    return differenceInYears(new Date(), birthDate);
}

import { useLocale } from 'next-intl';
import { ELang } from '@/models/Settings';

const UseLocaleFormats = () => {
    const activeLocale = useLocale();

    const getMonthWithDate = (): 'MMMM Do' | 'DD MMMM' => {
        if (activeLocale === ELang.EN) return 'MMMM Do';
        if (activeLocale === ELang.UK || activeLocale === ELang.RU)
            return 'DD MMMM';
        return 'DD MMMM';
    };

    const getFullShortDate = (): 'MM/DD/YYYY' | 'DD.MM.YYYY' => {
        if (activeLocale === ELang.EN) return 'MM/DD/YYYY';
        if (activeLocale === ELang.UK || activeLocale === ELang.RU)
            return 'DD.MM.YYYY';
        return 'DD.MM.YYYY';
    };

    const getFullDate = (): 'MMMM DD, YYYY' | 'DD MMMM YYYY' => {
        if (activeLocale === ELang.EN) return 'MMMM DD, YYYY';
        if (activeLocale === ELang.UK || activeLocale === ELang.RU)
            return 'DD MMMM YYYY';
        return 'DD MMMM YYYY';
    };

    const getTime = (): 'h:mm a' | 'HH:mm' => {
        if (activeLocale === ELang.EN) return 'h:mm a';
        if (activeLocale === ELang.UK || activeLocale === ELang.RU)
            return 'HH:mm';
        return 'HH:mm';
    };

    return {
        getMonthWithDate,
        getFullShortDate,
        getFullDate,
        getTime,
    };
};

export default UseLocaleFormats;

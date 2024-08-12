import { useLocale } from 'next-intl';
import { ELang } from '@/models/Settings';

const useLocaleFormats = () => {
    const activeLocale = useLocale();

    const getMonthWithDate = (): 'MMMM Do' | 'DD MMMM' => {
        if (activeLocale.includes(ELang.EN)) return 'MMMM Do';
        if (activeLocale.includes(ELang.UK)) return 'DD MMMM';
        return 'DD MMMM';
    };

    const getFullShortDate = (): 'MM/DD/YYYY' | 'DD.MM.YYYY' => {
        if (activeLocale.includes(ELang.EN)) return 'MM/DD/YYYY';
        if (activeLocale.includes(ELang.UK)) return 'DD.MM.YYYY';
        return 'DD.MM.YYYY';
    };

    const getFullDate = (): 'MMMM DD, YYYY' | 'DD MMMM YYYY' => {
        if (activeLocale.includes(ELang.EN)) return 'MMMM DD, YYYY';
        if (activeLocale.includes(ELang.UK)) return 'DD MMMM YYYY';
        return 'DD MMMM YYYY';
    };

    return {
        getMonthWithDate,
        getFullShortDate,
        getFullDate,
    };
};

export default useLocaleFormats;

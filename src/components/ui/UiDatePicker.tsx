import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import { enUS } from 'date-fns/locale/en-US';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { ELang } from '@/models/Settings';

registerLocale(ELang.UK, uk);
registerLocale(ELang.EN, enUS);
registerLocale(ELang.RU, ru);

const dateFormats: Record<ELang, string> = {
    [ELang.UK]: 'dd.MM.yyyy',
    [ELang.EN]: 'MM/dd/yyyy',
    [ELang.RU]: 'dd.MM.yyyy',
};

interface IProps {
    bookEnd: Date | null;
    bookEndError: string;
    clickedOnSubmit: boolean;
    handleChangeDate: (date: Date | null) => void;
}

const UiDatePicker: FC<IProps> = ({
    bookEnd,
    bookEndError,
    clickedOnSubmit,
    handleChangeDate,
}) => {
    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');

    return (
        <div className="wish-date-picker flex flex-col items-center">
            <div className="flex flex-col gap-0.5">
                <span className="pl-2 text-xs text-cyan-500 dark:text-cyan-300">
                    {mainPageT('enter_date')}*
                </span>

                <DatePicker
                    placeholderText={mainPageT('including')}
                    locale={activeLocale}
                    dateFormat={dateFormats[activeLocale as ELang]}
                    selected={bookEnd}
                    onChange={handleChangeDate}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="scroll"
                    isClearable
                />
            </div>

            {clickedOnSubmit && bookEndError.length > 0 && (
                <p className="mt-1 text-xs text-red-500">{bookEndError}</p>
            )}
        </div>
    );
};

export default UiDatePicker;

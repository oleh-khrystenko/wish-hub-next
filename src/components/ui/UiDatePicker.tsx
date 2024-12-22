import { FC } from 'react';
import { useLocale } from 'next-intl';
import DatePicker, { registerLocale } from 'react-datepicker';
import { uk } from 'date-fns/locale/uk';
import { enUS } from 'date-fns/locale/en-US';
import { ru } from 'date-fns/locale/ru';
import 'react-datepicker/dist/react-datepicker.css';
import { ELang } from '@/models/settings';

registerLocale(ELang.UK, uk);
registerLocale(ELang.EN, enUS);
registerLocale(ELang.RU, ru);

const dateFormats: Record<ELang, string> = {
    [ELang.UK]: 'dd.MM.yyyy',
    [ELang.EN]: 'MM/dd/yyyy',
    [ELang.RU]: 'dd.MM.yyyy',
};

interface IProps {
    label?: string;
    placeholder?: string;
    selectedDate: Date | null;
    selectedDateError: string;
    clickedOnSubmit: boolean;
    changeDate: (date: Date | null) => void;
}

const UiDatePicker: FC<IProps> = ({
    label,
    placeholder,
    selectedDate,
    selectedDateError,
    clickedOnSubmit,
    changeDate,
}) => {
    const activeLocale = useLocale();

    return (
        <div className="wish-date-picker flex min-w-64 flex-col items-center">
            <div className="flex w-full flex-col gap-0.5">
                {label && label.length > 0 && (
                    <span className="pl-2 text-xs text-cyan-500 dark:text-cyan-300">
                        {label}
                    </span>
                )}

                <DatePicker
                    placeholderText={placeholder}
                    locale={activeLocale}
                    dateFormat={dateFormats[activeLocale as ELang]}
                    selected={selectedDate}
                    onChange={changeDate}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="scroll"
                    isClearable
                />
            </div>

            {clickedOnSubmit && selectedDateError.length > 0 && (
                <p className="mt-1 text-xs text-red-500">{selectedDateError}</p>
            )}
        </div>
    );
};

export default UiDatePicker;

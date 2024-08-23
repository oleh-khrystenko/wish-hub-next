import { FC, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uk } from 'date-fns/locale/uk';
import { enUS } from 'date-fns/locale/en-US';
import { ru } from 'date-fns/locale/ru';
import dayjs, { Dayjs } from 'dayjs';
import { IWish } from '@/models/Wish';
import UiButton from '@/components/ui/UiButton';
import { useLocale, useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import QuoteMessage from '@/components/layouts/wish-editor/QuoteMessage';
import { toast } from 'react-toastify';
import { useWishesStore } from '@/stores/wishes';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiTooltip from '@/components/ui/UiTooltip';
import InfoIcon from '@/components/icons/InfoIcon';
import { ELang } from '@/models/Settings';
import { useRouter } from 'next/navigation';

registerLocale(ELang.UK, uk);
registerLocale(ELang.EN, enUS);
registerLocale(ELang.RU, ru);

const dateFormats: Record<ELang, string> = {
    [ELang.UK]: 'dd.MM.yyyy',
    [ELang.EN]: 'MM/dd/yyyy',
    [ELang.RU]: 'dd.MM.yyyy',
};

interface IProps {
    wish: IWish;
    hide?: () => void;
}

const BookWish: FC<IProps> = ({ wish, hide }) => {
    const [show, setShow] = useState<boolean>(false);
    const [bookEnd, setBookEnd] = useState<Date | null>(null);
    const [clickedOnBookWish, setClickedOnBookWish] = useState<boolean>(false);
    const [bookEndError, setBookEndError] = useState<any | null>(null);

    const activeLocale = useLocale();

    const router = useRouter();

    const myUser = useMyUserStore((state) => state.myUser);

    const bookWish = useWishesStore((state) => state.bookWish);

    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const handleBookWish = () => {
        if (myUser) {
            setShow(true);
        } else {
            router.push('/auth');
        }
    };

    const handleHide = () => {
        setBookEnd(null);
        setBookEndError(null);
        setClickedOnBookWish(false);
        setShow(false);
    };

    const handleChangeDate = (value: Date | null) => {
        setBookEndError(null);
        setBookEnd(value);
    };

    const handleSubmit = async () => {
        setClickedOnBookWish(true);

        if (!myUser || !bookEnd || (bookEndError && bookEndError.length > 0))
            return;

        const response = await bookWish(
            {
                userId: myUser.id,
                wishId: wish.id,
                end: dayjs(bookEnd).add(1, 'day').format(),
            },
            alertsT('wishes-api.book-wish.error')
        );
        if (!response) return;

        const quote = response[activeLocale as ELang];
        toast(
            <QuoteMessage
                title={alertsT('wishes-api.book-wish.success')}
                text={quote?.text}
                author={quote?.author}
            />,
            { type: 'success' }
        );

        hide && hide();
    };

    return (
        <>
            <UiButton variant="text" onClick={handleBookWish}>
                {mainPageT('will-fulfill')}
            </UiButton>

            <ConfirmModal
                show={show}
                hide={handleHide}
                confirm={handleSubmit}
                confirmModalT={mainPageT('confirm-intention')}
                closeModalT={mainPageT('leave_with_changes.close')}
            >
                <div className="flex max-w-md flex-col items-center gap-4">
                    <p className="w-full">
                        {mainPageT('i-intend', {
                            name: unencryptedData(wish.name, wish.show),
                        })}
                    </p>

                    <div className="wish-date-picker">
                        <div className="mb-0.5 flex items-center gap-1 pl-2">
                            <span className="text-xs text-cyan-500 dark:text-cyan-300">
                                {mainPageT('enter_date')}
                            </span>

                            <span
                                className="cursor-pointer"
                                data-tooltip-id="book-wish-date"
                                data-tooltip-content={mainPageT(
                                    myUser?.id === wish.userId
                                        ? 'enter_date_ten'
                                        : 'enter_date_one'
                                )}
                            >
                                <InfoIcon />
                            </span>
                            <UiTooltip id="book-wish-date" />
                        </div>

                        <DatePicker
                            placeholderText={mainPageT('including')}
                            locale={activeLocale}
                            dateFormat={dateFormats[activeLocale as ELang]}
                            selected={bookEnd}
                            onChange={handleChangeDate}
                            minDate={new Date()}
                            maxDate={dayjs()
                                .add(
                                    myUser?.id === wish.userId ? 10 : 1,
                                    'year'
                                )
                                .toDate()}
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="scroll"
                            isClearable
                        />
                    </div>

                    <p>
                        {mainPageT('after_you_confirm')}
                        <span
                            className="-mb-0.5 ml-1 inline-block cursor-pointer"
                            data-tooltip-id="book-wish"
                            data-tooltip-content={mainPageT('by_declaring')}
                        >
                            <InfoIcon />
                        </span>
                    </p>
                    <UiTooltip id="book-wish" />
                </div>
            </ConfirmModal>
        </>
    );
};

export default BookWish;

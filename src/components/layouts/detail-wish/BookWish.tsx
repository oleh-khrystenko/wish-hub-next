import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uk } from 'date-fns/locale/uk';
import { enUS } from 'date-fns/locale/en-US';
import { ru } from 'date-fns/locale/ru';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { IWish } from '@/models/Wish';
import { ELang } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { isAfter, isBefore } from '@/helpers/utils/date-validators';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import QuoteMessage from '@/components/layouts/wish-editor/QuoteMessage';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiButton from '@/components/ui/UiButton';
import UiTooltip from '@/components/ui/UiTooltip';
import InfoIcon from '@/components/icons/InfoIcon';

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
    const [bookEndError, setBookEndError] = useState<string>('');
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);

    const router = useRouter();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);

    const bookWish = useWishesStore((state) => state.bookWish);

    const handleBookWish = () => {
        if (myUser) {
            setShow(true);
        } else {
            router.push('/auth');
        }
    };

    const handleHide = () => {
        setBookEnd(null);
        setBookEndError('');
        setClickedOnSubmit(false);
        setShow(false);
    };

    const handleChangeDate = (value: Date | null) => {
        setBookEndError('');
        setBookEnd(value);
    };

    const handleSubmit = async () => {
        setClickedOnSubmit(true);

        if (!myUser || !bookEnd || bookEndError.length > 0) return;

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

        handleHide();
        hide && hide();
    };

    useEffect(() => {
        if (bookEnd === null) {
            setBookEndError(mainPageT('book-end-errors.required'));
        } else if (isBefore(bookEnd, -1)) {
            setBookEndError(mainPageT('book-end-errors.past'));
        } else if (isAfter(bookEnd, myUser?.id === wish.userId ? 10 : 1)) {
            setBookEndError(
                mainPageT(
                    `book-end-errors.max.${myUser?.id === wish.userId ? 'my' : 'another'}`
                )
            );
        } else {
            setBookEndError('');
        }
    }, [clickedOnSubmit, bookEnd, bookEndError]);

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
                            <p className="mt-1 text-xs text-red-500">
                                {bookEndError}
                            </p>
                        )}
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

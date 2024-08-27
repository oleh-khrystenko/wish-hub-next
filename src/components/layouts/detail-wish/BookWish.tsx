import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
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
import UiDatePicker from '@/components/ui/UiDatePicker';
import UiButton from '@/components/ui/UiButton';
import UiTooltip from '@/components/ui/UiTooltip';
import InfoIcon from '@/components/icons/InfoIcon';
import UiLoading from '@/components/ui/UiLoading';

interface IProps {
    wish: IWish;
    hide?: () => void;
}

const BookWish: FC<IProps> = ({ wish, hide }) => {
    const [show, setShow] = useState<boolean>(false);
    const [bookEnd, setBookEnd] = useState<Date | null>(null);
    const [bookEndError, setBookEndError] = useState<string>('');
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

        setIsLoading(true);

        const response = await bookWish(
            {
                userId: myUser.id,
                wishId: wish.id,
                end: dayjs(bookEnd).add(1, 'day').format(),
            },
            alertsT('wishes-api.book-wish.error')
        );

        setIsLoading(false);

        if (response) {
            const quote = response[activeLocale as ELang];
            toast(
                <QuoteMessage
                    title={alertsT('wishes-api.book-wish.success')}
                    text={quote?.text}
                    author={quote?.author}
                />,
                { type: 'success' }
            );
        }

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
            <div className="-mr-4 ml-auto">
                <UiButton variant="text-btn" onBtnClick={handleBookWish}>
                    {mainPageT('will-fulfill')}
                </UiButton>
            </div>

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

                    <UiDatePicker
                        bookEnd={bookEnd}
                        bookEndError={bookEndError}
                        clickedOnSubmit={clickedOnSubmit}
                        handleChangeDate={handleChangeDate}
                    />

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

                {isLoading && (
                    <UiLoading
                        isLocal
                        bg="bg-zinc-300 dark:bg-zinc-800 rounded-2xl"
                    />
                )}
            </ConfirmModal>
        </>
    );
};

export default BookWish;

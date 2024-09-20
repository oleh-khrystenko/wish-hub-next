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
import QuoteMessage from '@/components/layouts/QuoteMessage';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiDatePicker from '@/components/ui/UiDatePicker';
import UiButton from '@/components/ui/UiButton';
import UiTooltip from '@/components/ui/UiTooltip';
import InfoIcon from '@/components/icons/InfoIcon';

interface IProps {
    wish: IWish;
}

const BookWish: FC<IProps> = ({ wish }) => {
    const [show, setShow] = useState<boolean>(false);
    const [bookEnd, setBookEnd] = useState<Date | null>(null);
    const [bookEndError, setBookEndError] = useState<string>('');
    const [clickedOnSubmit, setClickedOnSubmit] = useState<boolean>(false);

    const router = useRouter();

    const activeLocale = useLocale();
    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

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
            allPagesT('wishes-api.book-wish.error')
        );

        if (response) {
            const quote = response[activeLocale as ELang];
            toast(
                <QuoteMessage
                    title={allPagesT('wishes-api.book-wish.success')}
                    text={quote?.text}
                    author={quote?.author}
                />,
                { type: 'success' }
            );
        }

        handleHide();
    };

    useEffect(() => {
        if (bookEnd === null) {
            setBookEndError(wishPageT('book_end_errors.required'));
        } else if (isBefore(bookEnd, -1, 'day')) {
            setBookEndError(wishPageT('book_end_errors.past'));
        } else if (
            isAfter(bookEnd, myUser?.id === wish.userId ? 10 : 1, 'year')
        ) {
            setBookEndError(
                wishPageT(
                    `book_end_errors.max.${myUser?.id === wish.userId ? 'my' : 'another'}`
                )
            );
        } else {
            setBookEndError('');
        }
    }, [clickedOnSubmit, bookEnd, bookEndError]);

    return (
        <>
            <div className="ml-auto">
                <UiButton variant="text-btn" onBtnClick={handleBookWish}>
                    {wishPageT('will_fulfill')}
                </UiButton>
            </div>

            <ConfirmModal
                show={show}
                hide={handleHide}
                confirm={handleSubmit}
                confirmModalT={wishPageT('confirm_intention')}
                closeModalT={wishPageT('cancel')}
            >
                <div className="flex max-w-md flex-col items-center gap-4">
                    <p className="w-full">
                        {wishPageT('i_intend', {
                            name: unencryptedData(wish.name, wish.show),
                        })}
                    </p>

                    <UiDatePicker
                        label={`${wishPageT('enter_date')}*`}
                        placeholder={wishPageT('including')}
                        selectedDate={bookEnd}
                        selectedDateError={bookEndError}
                        clickedOnSubmit={clickedOnSubmit}
                        changeDate={handleChangeDate}
                    />

                    <p>
                        {wishPageT('after_you_confirm')}
                        <span
                            className="-mb-0.5 ml-1 inline-block cursor-pointer"
                            data-tooltip-id="book-wish"
                            data-tooltip-content={wishPageT('by_declaring')}
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

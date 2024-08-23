import { FC, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
                    <p>
                        {mainPageT('i-intend', {
                            name: unencryptedData(wish.name, wish.show),
                        })}
                    </p>

                    <div className="wish-date-picker">
                        <DatePicker
                            placeholderText={mainPageT('including')}
                            selected={bookEnd}
                            onChange={handleChangeDate}
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

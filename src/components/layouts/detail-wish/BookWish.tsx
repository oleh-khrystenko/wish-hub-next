import { FC, useState } from 'react';
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
    const [show, setShow] = useState<boolean>(true);
    const [clickedOnBookWish, setClickedOnBookWish] = useState<boolean>(false);
    const [bookEnd, setBookEnd] = useState<Dayjs | null>(null);
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

    const handleSubmit = async () => {
        setClickedOnBookWish(true);

        if (!myUser || !bookEnd || (bookEndError && bookEndError.length > 0))
            return;

        try {
            const response = await bookWish({
                userId: myUser.id,
                wishId: wish.id,
                end: bookEnd.add(1, 'day').format(),
            });
            console.log('response: ', response);
            // const quote = response[activeLocale as ELang];
            // toast(
            //     <QuoteMessage
            //         title={alertsT('wishes-api.book-wish.success')}
            //         text={quote?.text}
            //         author={quote?.author}
            //     />,
            //     { type: 'success' }
            // );
        } catch (e: any) {
            console.error(e);
        }

        close && close();
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
                <p className="text-lg">
                    {mainPageT('i-intend', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                </p>

                <span>date-picker</span>

                <p className="text book-wish-text">
                    {mainPageT('after_you_confirm')}
                    <span
                        className="tooltip detail-wish-book-tooltip"
                        data-tooltip-id="book-wish"
                        data-tooltip-content={mainPageT('by_declaring')}
                    >
                        <InfoIcon />
                    </span>
                </p>
                <UiTooltip id="book-wish" />
            </ConfirmModal>
        </>
    );
};

export default BookWish;

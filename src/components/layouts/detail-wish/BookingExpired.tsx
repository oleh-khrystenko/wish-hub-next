import { FC, useState } from 'react';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IDoneWish } from '@/stores/wishes/types';
import { useTranslations } from 'next-intl';
import { useWishesStore } from '@/stores/wishes';
import UiButton from '@/components/ui/UiButton';
import UiModal from '@/components/ui/UiModal';
import { unencryptedData } from '@/helpers/utils/encryption-data';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    whoseWish: IDoneWish['whoseWish'];
    hide: () => void;
}

const BookingExpired: FC<IProps> = ({ wish, userId, whoseWish, hide }) => {
    const [show, setShow] = useState<boolean>(true);

    const mainPageT = useTranslations('main-page');

    const undoneWish = useWishesStore((state) => state.undoneWish);
    const doneWish = useWishesStore((state) => state.doneWish);

    const handleUndone = async () => {
        if (!userId) return;

        await undoneWish({ userId, wishId: wish.id });
        hide();
    };

    const handleDone = async () => {
        if (!userId) return;

        await doneWish({ userId, wishId: wish.id, whoseWish });
        hide();
    };

    return (
        <>
            <UiButton variant="text" onClick={() => setShow(true)}>
                {mainPageT('determine-status')}
            </UiButton>

            <UiModal show={show} hide={() => setShow(false)}>
                <h3 className="title attention">
                    {mainPageT('confirm-modal.title')}
                </h3>

                <p className="text-lg">
                    {mainPageT('period-expired', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                    <br />
                    <br />
                    {mainPageT('is_your_wish')}
                </p>

                <div className="modal-actions detail-wish-expired-actions">
                    <UiButton onClick={handleUndone}>
                        {mainPageT('no')}
                    </UiButton>

                    <UiButton onClick={handleDone}>{mainPageT('yes')}</UiButton>
                </div>
            </UiModal>
        </>
    );
};

export default BookingExpired;

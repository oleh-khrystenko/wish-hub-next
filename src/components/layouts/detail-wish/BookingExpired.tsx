import { FC, useState } from 'react';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IDoneWish } from '@/stores/wishes/types';
import { useTranslations } from 'next-intl';
import { useWishesStore } from '@/stores/wishes';
import UiButton from '@/components/ui/UiButton';
import UiModal from '@/components/ui/modal/UiModal';
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
    const alertsT = useTranslations('alerts');

    const undoneWish = useWishesStore((state) => state.undoneWish);
    const doneWish = useWishesStore((state) => state.doneWish);

    const handleUndone = async () => {
        if (!userId) return;

        await undoneWish(
            { userId, wishId: wish.id },
            alertsT('wishes-api.undone-wish.success'),
            alertsT('wishes-api.undone-wish.error')
        );

        hide();
    };

    const handleDone = async () => {
        if (!userId) return;

        await doneWish(
            { userId, wishId: wish.id, whoseWish },
            alertsT('wishes-api.done-wish.success'),
            alertsT('wishes-api.done-wish.error')
        );

        hide();
    };

    return (
        <>
            <UiButton variant="text" onBtnClick={() => setShow(true)}>
                {mainPageT('determine-status')}
            </UiButton>

            <UiModal show={show} hide={() => setShow(false)}>
                <span className="block text-center text-2xl font-bold text-rose-500">
                    {mainPageT('confirm-modal.title')}
                </span>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('period-expired', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                    <br />
                    <br />
                    {mainPageT('is_your_wish')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton variant="text-attention" onBtnClick={handleDone}>
                        {mainPageT('yes')}
                    </UiButton>

                    <UiButton onBtnClick={handleUndone}>
                        {mainPageT('no')}
                    </UiButton>
                </div>
            </UiModal>
        </>
    );
};

export default BookingExpired;

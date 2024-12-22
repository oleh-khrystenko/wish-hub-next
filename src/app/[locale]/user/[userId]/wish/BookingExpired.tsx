import { FC, useState } from 'react';
import { IWish } from '@/models/wish';
import { IUser } from '@/models/user';
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
}

const BookingExpired: FC<IProps> = ({ wish, userId, whoseWish }) => {
    const [show, setShow] = useState<boolean>(true);

    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const undoneWish = useWishesStore((state) => state.undoneWish);
    const doneWish = useWishesStore((state) => state.doneWish);

    const handleUndone = async () => {
        if (!userId) return;

        await undoneWish(
            { userId, wishId: wish.id },
            allPagesT('wishes-api.undone-wish.success'),
            allPagesT('wishes-api.undone-wish.error')
        );
    };

    const handleDone = async () => {
        if (!userId) return;

        await doneWish(
            { userId, wishId: wish.id, whoseWish },
            allPagesT('wishes-api.done-wish.success'),
            allPagesT('wishes-api.done-wish.error')
        );
    };

    return (
        <>
            <UiButton variant="text" onBtnClick={() => setShow(true)}>
                {wishPageT('determine_status')}
            </UiButton>

            <UiModal show={show} hide={() => setShow(false)}>
                <span className="block text-center text-2xl font-bold text-rose-500">
                    {wishPageT('attention')}
                </span>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {wishPageT('period_expired', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                    <br />
                    <br />
                    {wishPageT('is_your_wish')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton variant="text-attention" onBtnClick={handleDone}>
                        {wishPageT('yes')}
                    </UiButton>

                    <UiButton onBtnClick={handleUndone}>
                        {wishPageT('no')}
                    </UiButton>
                </div>
            </UiModal>
        </>
    );
};

export default BookingExpired;

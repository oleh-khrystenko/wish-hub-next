import { FC, useState } from 'react';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IDoneWish } from '@/stores/wishes/types';
import { useTranslations } from 'next-intl';
import { useWishesStore } from '@/stores/wishes';
import UiButton from '@/components/ui/UiButton';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import { unencryptedData } from '@/helpers/utils/encryption-data';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    whoseWish: IDoneWish['whoseWish'];
}

const DoneWish: FC<IProps> = ({ wish, userId, whoseWish }) => {
    const [show, setShow] = useState<boolean>(false);

    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const doneWish = useWishesStore((state) => state.doneWish);

    const handleSubmit = async () => {
        if (!userId) return;

        await doneWish(
            { userId, wishId: wish.id, whoseWish },
            allPagesT('wishes-api.done-wish.success'),
            allPagesT('wishes-api.done-wish.error')
        );
    };

    return (
        <>
            <div className="ml-auto">
                <UiButton variant="text-btn" onBtnClick={() => setShow(true)}>
                    {wishPageT('wish_fulfilled')}
                </UiButton>
            </div>

            <ConfirmModal
                show={show}
                hide={() => setShow(false)}
                confirm={handleSubmit}
                confirmModalT={wishPageT('wish_fulfilled')}
                closeModalT={wishPageT('cancel')}
            >
                <p className="text-lg">
                    {wishPageT('sure_fulfilled', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                </p>
            </ConfirmModal>
        </>
    );
};

export default DoneWish;

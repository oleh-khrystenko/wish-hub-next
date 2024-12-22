import { FC, useState } from 'react';
import { IWish } from '@/models/wish';
import { IUser } from '@/models/user';
import UiButton from '@/components/ui/UiButton';
import { useTranslations } from 'next-intl';
import { useWishesStore } from '@/stores/wishes';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import { unencryptedData } from '@/helpers/utils/encryption-data';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
}

const CancelBookWish: FC<IProps> = ({ wish, userId }) => {
    const [show, setShow] = useState<boolean>(false);

    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const cancelBookWish = useWishesStore((state) => state.cancelBookWish);

    const handleSubmit = async () => {
        if (!userId) return;

        await cancelBookWish(
            { userId, wishId: wish.id },
            allPagesT('wishes-api.cancel-book-wish.success'),
            allPagesT('wishes-api.cancel-book-wish.error')
        );
    };

    return (
        <>
            <div className="ml-auto">
                <UiButton
                    variant="text-attention"
                    onBtnClick={() => setShow(true)}
                >
                    {wishPageT('cancel_execution')}
                </UiButton>
            </div>

            <ConfirmModal
                show={show}
                confirm={handleSubmit}
                hide={() => setShow(false)}
                confirmModalT={wishPageT('cancel_my_intention')}
                closeModalT={wishPageT('cancel')}
            >
                <p className="text-lg">
                    {wishPageT('cancel_intention', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                </p>
            </ConfirmModal>
        </>
    );
};

export default CancelBookWish;

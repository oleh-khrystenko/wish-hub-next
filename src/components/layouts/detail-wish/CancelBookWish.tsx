import { FC, useState } from 'react';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import UiButton from '@/components/ui/UiButton';
import { useTranslations } from 'next-intl';
import { useWishesStore } from '@/stores/wishes';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import { unencryptedData } from '@/helpers/utils/encryption-data';

interface IProps {
    wish: IWish;
    userId?: IUser['id'];
    hide: () => void;
}

const CancelBookWish: FC<IProps> = ({ wish, userId, hide }) => {
    const [show, setShow] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');

    const cancelBookWish = useWishesStore((state) => state.cancelBookWish);

    const handleSubmit = async () => {
        if (!userId) return;
        await cancelBookWish({ userId, wishId: wish.id });
        hide();
    };

    return (
        <>
            <div className="-mr-4 ml-auto">
                <UiButton
                    variant="text-attention"
                    onClick={() => setShow(true)}
                >
                    {mainPageT('cancel-execution')}
                </UiButton>
            </div>

            <ConfirmModal
                show={show}
                confirm={handleSubmit}
                hide={() => setShow(false)}
                confirmModalT={mainPageT('cancel-my-intention')}
                closeModalT={mainPageT('leave_with_changes.close')}
            >
                <p className="text-lg">
                    {mainPageT('cancel-intention', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                </p>
            </ConfirmModal>
        </>
    );
};

export default CancelBookWish;

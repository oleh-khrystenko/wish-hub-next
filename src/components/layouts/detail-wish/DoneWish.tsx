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
    hide: () => void;
}

const DoneWish: FC<IProps> = ({ wish, userId, whoseWish, hide }) => {
    const [show, setShow] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');

    const doneWish = useWishesStore((state) => state.doneWish);

    const handleSubmit = async () => {
        if (!userId) return;

        await doneWish({ userId, wishId: wish.id, whoseWish });
        hide();
    };

    return (
        <>
            <UiButton variant="text" onClick={() => setShow(true)}>
                {mainPageT('wish-fulfilled')}
            </UiButton>

            <ConfirmModal
                show={show}
                hide={() => setShow(false)}
                confirm={handleSubmit}
                titleModalT={mainPageT('confirm-modal.title')}
                confirmModalT={mainPageT('wish-fulfilled')}
                closeModalT={mainPageT('leave_with_changes.close')}
            >
                <p className="text-lg">
                    {mainPageT('sure-fulfilled', {
                        name: unencryptedData(wish.name, wish.show),
                    })}
                </p>
            </ConfirmModal>
        </>
    );
};

export default DoneWish;

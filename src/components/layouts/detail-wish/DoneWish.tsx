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
    const alertsT = useTranslations('alerts');

    const doneWish = useWishesStore((state) => state.doneWish);

    const handleSubmit = async () => {
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
            <div className="-mr-4 ml-auto">
                <UiButton variant="text-btn" onBtnClick={() => setShow(true)}>
                    {mainPageT('wish-fulfilled')}
                </UiButton>
            </div>

            <ConfirmModal
                show={show}
                hide={() => setShow(false)}
                confirm={handleSubmit}
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

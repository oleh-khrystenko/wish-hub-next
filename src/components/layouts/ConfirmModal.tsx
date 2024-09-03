import { FC, ReactNode, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import UiModal from '@/components/ui/UiModal';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    show: boolean;
    confirm: () => void;
    hide: () => void;
    children: ReactNode;
    titleModalT?: string;
    confirmModalT?: string;
    closeModalT?: string;
}

const ConfirmModal: FC<IProps> = ({
    show,
    confirm,
    hide,
    children,
    titleModalT,
    confirmModalT,
    closeModalT,
}) => {
    const mainPageT = useTranslations('main-page');

    // useEffect(() => {
    //     document.body.classList.add('overflow-hidden');
    //
    //     return () => {
    //         document.body.classList.remove('overflow-hidden');
    //     };
    // }, []);

    return (
        <UiModal show={show} rounded="rounded-2xl">
            <p className="mb-4 block text-center text-2xl font-bold text-rose-500">
                {titleModalT || mainPageT('confirm-modal.title')}
            </p>

            <span className="text-zinc-700 dark:text-zinc-300">{children}</span>

            <div className="mt-6 flex flex-col items-end justify-end gap-4 mobile-xs:flex-row mobile-xs:items-center">
                <UiButton variant="text-attention" onBtnClick={confirm}>
                    {confirmModalT || mainPageT('confirm-modal.confirm')}
                </UiButton>
                <UiButton onBtnClick={hide}>
                    {closeModalT || mainPageT('confirm-modal.close')}
                </UiButton>
            </div>
        </UiModal>
    );
};

export default ConfirmModal;

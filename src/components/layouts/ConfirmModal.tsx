import { FC, ReactNode } from 'react';
import UiModal from '@/components/ui/UiModal';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    show: boolean;
    confirm: () => void;
    hide: () => void;
    children: ReactNode;
    titleModalT: string;
    confirmModalT: string;
    closeModalT: string;
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
    return (
        <UiModal show={show}>
            <span className="mb-4 block text-center text-2xl font-bold text-rose-500">
                {titleModalT}
            </span>

            {children}

            <div className="mt-6 flex items-center justify-end gap-4">
                <UiButton variant="text-attention" onClick={confirm}>
                    {confirmModalT}
                </UiButton>
                <UiButton onClick={hide}>{closeModalT}</UiButton>
            </div>
        </UiModal>
    );
};

export default ConfirmModal;

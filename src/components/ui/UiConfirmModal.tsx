import { FC, ReactNode } from 'react';
import UiModal from '@/components/ui/UiModal';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    show: boolean;
    confirm: () => void;
    hid: () => void;
    children: ReactNode;
    titleModalT: string;
    confirmModalT: string;
    closeModalT: string;
}

const UiConfirmModal: FC<IProps> = ({
    show,
    confirm,
    hid,
    children,
    titleModalT,
    confirmModalT,
    closeModalT,
}) => {
    return (
        <UiModal show={show}>
            <h3 className="mb-4 text-center text-2xl font-bold text-rose-500">
                {titleModalT}
            </h3>

            {children}

            <div className="mt-6 flex items-center justify-end gap-4">
                <UiButton variant="text-attention" onClick={confirm}>
                    {confirmModalT}
                </UiButton>
                <UiButton onClick={hid}>{closeModalT}</UiButton>
            </div>
        </UiModal>
    );
};

export default UiConfirmModal;

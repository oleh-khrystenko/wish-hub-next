import { FC, ReactNode, useEffect } from 'react';
import Content from '@/components/ui/modal/Content';

interface IProps {
    show: boolean;
    px?: string;
    rounded?: string;
    hide?: () => void;
    children: ReactNode;
}

const UiModal: FC<IProps> = ({
    show,
    px = 'px-4 tablet-md:px-5 tablet-lg:px-8',
    rounded = '',
    hide,
    children,
}) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                hide && hide();
            }
        };

        if (show) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [show, hide]);

    return (
        show && (
            <Content px={px} rounded={rounded} hide={hide}>
                {children}
            </Content>
        )
    );
};

export default UiModal;

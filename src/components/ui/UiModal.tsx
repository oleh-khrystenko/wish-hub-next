import { FC, ReactNode, useEffect } from 'react';
import UiButton from '@/components/ui/UiButton';
import CrossIcon from '@/components/icons/CrossIcon';

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
            <div className="fixed inset-0 z-40 flex h-svh w-full origin-center items-center justify-center transition-all duration-100 ease-in-out">
                <div
                    className="absolute inset-0 -z-10 h-svh w-full bg-zinc-400 opacity-60 dark:bg-zinc-950"
                    onClick={() => hide && hide()}
                ></div>

                <div
                    className={`${px} ${rounded} relative h-fit w-fit bg-zinc-300 py-4 dark:bg-zinc-800 tablet-md:h-fit tablet-md:max-w-2xl tablet-md:rounded-2xl tablet-md:py-5 tablet-lg:max-w-4xl tablet-lg:py-6 tablet-xl:max-w-5xl`}
                >
                    {hide && (
                        <div className="absolute right-2 top-1.5 z-10 tablet-md:-right-3 tablet-md:-top-3">
                            <UiButton variant="solid-gray" onClick={hide}>
                                <CrossIcon />
                            </UiButton>
                        </div>
                    )}

                    {children}
                </div>
            </div>
        )
    );
};

export default UiModal;

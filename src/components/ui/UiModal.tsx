import { FC, ReactNode, useEffect } from 'react';
import UiButton from '@/components/ui/UiButton';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    show: boolean;
    hide?: () => void;
    children: ReactNode;
}

const UiModal: FC<IProps> = ({ show, hide, children }) => {
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
        <div
            className={`${show ? 'scale-100' : 'scale-0'} fixed inset-0 z-40 flex h-svh w-full origin-center items-center justify-center transition-all duration-100 ease-in-out`}
        >
            <div
                className="absolute inset-0 -z-10 h-svh w-full bg-zinc-400 opacity-60 dark:bg-zinc-950"
                onClick={() => hide && hide()}
            ></div>

            <div className="relative max-w-5xl rounded-2xl bg-zinc-300 px-8 py-6 text-base font-bold text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300">
                {hide && (
                    <div className="absolute right-2 top-1.5">
                        <UiButton variant="solid-gray" onClick={hide}>
                            <CrossIcon />
                        </UiButton>
                    </div>
                )}

                {children}
            </div>
        </div>
    );
};

export default UiModal;

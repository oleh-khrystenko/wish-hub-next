import { FC, useState, useEffect } from 'react';
import Image from 'next/image';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    src: string;
    alt: string;
    hide: () => void;
}

const ZoomedImageModal: FC<IProps> = ({ src, alt, hide }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, []);

    return (
        <div className="fixed inset-0 z-40 flex h-svh w-full items-center justify-center bg-zinc-300 px-4 py-4 dark:bg-zinc-800 tablet-md:px-5 tablet-md:py-5 tablet-lg:px-8 tablet-lg:py-6">
            <div className="absolute right-2 top-1.5 z-10">
                <UiButton variant="solid-gray" onBtnClick={hide}>
                    <CrossIcon />
                </UiButton>
            </div>

            <div className="relative flex h-full w-full items-center justify-center">
                <Image
                    src={src}
                    alt={alt}
                    title={alt}
                    priority={true}
                    fill
                    sizes={'100%'}
                    className="rounded-md object-contain"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                />
            </div>

            {isLoading && (
                <UiLoading isLocal bg="bg-zinc-300 dark:bg-zinc-800" />
            )}
        </div>
    );
};

export default ZoomedImageModal;

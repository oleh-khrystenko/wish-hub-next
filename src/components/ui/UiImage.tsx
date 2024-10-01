'use client';

import { FC, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import UiLoading from '@/components/ui/UiLoading';

interface IProps {
    src: string;
    alt: string;
    priority?: boolean;
    classes?: string;
    brokenTextSize?: string;
}

const UiImage: FC<IProps> = ({
    src,
    alt,
    priority,
    classes,
    brokenTextSize = 'text-lg',
}) => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [isBroken, setIsBroken] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const allPagesT = useTranslations('all-pages');

    const handleError = () => {
        setImageSrc('/images/broken-glass.webp');
        setIsBroken(true);
        setIsLoading(false);
    };

    return (
        <div className="absolute inset-0">
            <Image
                src={imageSrc}
                alt={isBroken ? allPagesT('broken_image') : alt}
                title={isBroken ? allPagesT('broken_image') : alt}
                priority={priority}
                fill
                sizes={'100%'}
                className={`${isBroken ? 'opacity-50 blur-[1px] grayscale-[50%]' : ''} ${classes} object-contain`}
                onLoad={() => setIsLoading(false)}
                onError={handleError}
            />

            {isBroken && (
                <p
                    className={`${brokenTextSize} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-rose-500 opacity-80`}
                >
                    {allPagesT('broken_image')}
                </p>
            )}

            {isLoading && <UiLoading isLocal />}
        </div>
    );
};

export default UiImage;

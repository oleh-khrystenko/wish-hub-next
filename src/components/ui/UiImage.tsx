import { FC, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface IProps {
    src: string;
    alt: string;
    title: string;
    priority?: boolean;
}

const UiImage: FC<IProps> = ({ src, alt, title, priority }) => {
    const [imageSrc, setImageSrc] = useState<string>(src);
    const [isBroken, setIsBroken] = useState<boolean>(false);

    const allPagesT = useTranslations('all-pages');

    const handleError = () => {
        setImageSrc('/images/broken-glass.webp');
        setIsBroken(true);
    };

    return (
        <div className="absolute inset-0">
            <Image
                src={imageSrc}
                alt={alt}
                title={title}
                priority={priority}
                fill
                sizes={'100%'}
                className={`${isBroken ? 'opacity-50 blur-[1px] grayscale-[50%]' : ''} object-contain`}
                onError={handleError}
            />

            {isBroken && (
                <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-lg font-bold text-rose-500 opacity-80">
                    {allPagesT('failed_image')}
                </p>
            )}
        </div>
    );
};

export default UiImage;

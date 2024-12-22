import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { IUser } from '@/models/user';
import UiLoading from '@/components/ui/UiLoading';
import PersonIcon from '@/components/icons/PersonIcon';

interface IProps {
    avatar: IUser['avatar'];
    alt: string;
    priority?: boolean;
    size?: number;
    sizeTailwind?: string;
    sizeIcon?: string;
    brokenTextSize?: string;
    handleClick?: () => void;
}

const UiAvatar: FC<IProps> = ({
    avatar,
    alt,
    priority,
    size = 44,
    sizeTailwind = 'w-11 min-w-11 h-11 min-h-11',
    sizeIcon = 'w-7 h-7',
    handleClick,
    brokenTextSize = 'text-lg',
}) => {
    const [imageSrc, setImageSrc] = useState<string>(
        avatar || '/icons/person-icon.svg'
    );
    const [isBroken, setIsBroken] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const allPagesT = useTranslations('all-pages');

    const handleError = () => {
        setImageSrc('/images/broken-glass.webp');
        setIsBroken(true);
        setIsLoading(false);
    };

    useEffect(() => {
        if (!avatar) return;

        setImageSrc(avatar);
    }, [avatar]);

    return (
        <div
            className={`${sizeTailwind} ${handleClick && 'cursor-pointer'} relative flex items-center justify-center overflow-hidden rounded-full bg-zinc-400 dark:bg-zinc-600`}
            onClick={handleClick}
        >
            {avatar ? (
                <>
                    <Image
                        src={imageSrc || '/icons/person-icon.svg'}
                        alt={alt}
                        title={alt}
                        priority={priority}
                        height={size}
                        width={size}
                        className={`${sizeTailwind} object-cover`}
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

                    {isLoading && (
                        <UiLoading
                            isLocal
                            size="h-10 min-h-10 w-10 min-w-10"
                            bg="bg-transparent"
                        />
                    )}
                </>
            ) : (
                <div title={alt}>
                    <PersonIcon
                        classes={`${sizeIcon} fill-zinc-800 dark:fill-zinc-300`}
                    />
                </div>
            )}
        </div>
    );
};

export default UiAvatar;

import { FC } from 'react';
import Image from 'next/image';
import { IUser } from '@/models/User';
import UiLoading from '@/components/ui/UiLoading';
import PersonIcon from '@/components/icons/PersonIcon';

interface IProps {
    avatar: IUser['avatar'];
    alt: string;
    size: number;
    sizeTailwind: string;
    isLoading?: boolean;
    bgLoading?: string;
    handleClick?: () => void;
}

const UiAvatar: FC<IProps> = ({
    avatar,
    alt,
    size = 44,
    sizeTailwind = 'w-11 min-w-11 h-11 min-h-11',
    isLoading,
    bgLoading = 'bg-zinc-200 dark:bg-zinc-900',
    handleClick,
}) => {
    return (
        <div
            className={`${sizeTailwind} relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-zinc-400 dark:bg-zinc-600`}
            onClick={handleClick}
        >
            {avatar ? (
                <Image
                    src={avatar}
                    alt={alt}
                    title={alt}
                    priority={false}
                    height={size}
                    width={size}
                    className={`${sizeTailwind} object-cover`}
                />
            ) : (
                <PersonIcon classes="w-7 h-7 fill-zinc-800 dark:fill-zinc-300" />
            )}

            {isLoading && (
                <UiLoading isLocal size={sizeTailwind} bg={bgLoading} />
            )}
        </div>
    );
};

export default UiAvatar;

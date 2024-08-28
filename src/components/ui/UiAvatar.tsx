import { FC } from 'react';
import Image from 'next/image';
import { IUser } from '@/models/User';
import UiLoading from '@/components/ui/UiLoading';
import PersonIcon from '@/components/icons/PersonIcon';

type TSizeOfTailwind =
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 14
    | 16
    | 20
    | 24
    | 28
    | 32
    | 36
    | 40;

interface IProps {
    avatar: IUser['avatar'];
    alt: string;
    size: TSizeOfTailwind;
    isLoading?: boolean;
    bgLoading?: string;
    handleClick?: () => void;
}

const UiAvatar: FC<IProps> = ({
    avatar,
    alt,
    size,
    isLoading,
    bgLoading = 'bg-zinc-200 dark:bg-zinc-900',
    handleClick,
}) => {
    return (
        <div
            className={`w-${size} min-w-${size} h-${size} relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-zinc-400 dark:bg-zinc-600`}
            onClick={handleClick}
        >
            {avatar ? (
                <Image
                    src={avatar}
                    alt={alt}
                    title={alt}
                    priority={false}
                    height={size * 4}
                    width={size * 4}
                    className={`w-${size} min-w-${size} h-${size} object-cover`}
                />
            ) : (
                <PersonIcon classes="w-7 h-7 fill-zinc-800 dark:fill-zinc-300" />
            )}

            {isLoading && (
                <UiLoading
                    isLocal
                    size={`h-${size} min-h-${size} w-${size} min-w-${size}`}
                    bg={bgLoading}
                />
            )}
        </div>
    );
};

export default UiAvatar;

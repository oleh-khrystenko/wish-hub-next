import { FC } from 'react';
import Image from 'next/image';
import { IUser } from '@/models/User';
import UiLoading from '@/components/ui/UiLoading';
import PersonIcon from '@/components/icons/PersonIcon';

interface IProps {
    avatar: IUser['avatar'];
    alt: string;
    size: number;
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
    const sizeLoading = `h-${size / 4} min-h-${size / 4} w-${size / 4} min-w-${size / 4}`;

    return (
        <div
            style={{
                width: `${size}px`,
                minWidth: `${size}px`,
                height: `${size}px`,
            }}
            className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-zinc-400 dark:bg-zinc-600"
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
                    style={{
                        width: `${size}px`,
                        minWidth: `${size}px`,
                        height: `${size}px`,
                    }}
                    className="object-cover"
                />
            ) : (
                <PersonIcon classes="w-7 h-7 fill-zinc-800 dark:fill-zinc-300" />
            )}

            {isLoading && (
                <UiLoading isLocal size={sizeLoading} bg={bgLoading} />
            )}
        </div>
    );
};

export default UiAvatar;

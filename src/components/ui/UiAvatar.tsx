import { FC } from 'react';
import Image from 'next/image';
import { IUser } from '@/models/User';
import PersonIcon from '@/components/icons/PersonIcon';

interface IProps {
    avatar: IUser['avatar'];
    alt: string;
    priority?: boolean;
    size?: number;
    sizeTailwind?: string;
    sizeIcon?: string;
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
                    priority={priority}
                    height={size}
                    width={size}
                    className={`${sizeTailwind} object-cover`}
                />
            ) : (
                <PersonIcon
                    classes={`${sizeIcon} fill-zinc-800 dark:fill-zinc-300`}
                />
            )}
        </div>
    );
};

export default UiAvatar;

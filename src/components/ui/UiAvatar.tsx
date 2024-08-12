import { FC } from 'react';
import Image from 'next/image';
import AvatarIcon from '@/components/icons/AvatarIcon';
import { IUser } from '@/models/User';

interface IProps {
    avatar: IUser['avatar'];
    alt: string;
    size: number;
    handleClick: () => void;
}

const UiAvatar: FC<IProps> = ({ avatar, alt, size, handleClick }) => {
    const classes = `h-${size / 4} w-${size / 4} min-w-${size / 4}`;

    return (
        <button
            type="button"
            className={`${classes} flex items-center justify-center overflow-hidden rounded-full bg-zinc-500 dark:bg-zinc-600`}
            onClick={handleClick}
        >
            {avatar ? (
                <Image
                    src={avatar}
                    alt={alt}
                    height={size}
                    width={size}
                    className={`${classes} object-cover`}
                />
            ) : (
                <AvatarIcon />
            )}
        </button>
    );
};

export default UiAvatar;

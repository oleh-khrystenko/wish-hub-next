import { FC } from 'react';
import Image from 'next/image';
import { IUser } from '@/models/User';
import PersonIcon from '@/components/icons/PersonIcon';

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
                    title={alt}
                    height={size}
                    width={size}
                    className={`${classes} object-cover`}
                />
            ) : (
                <PersonIcon classes="w-7 h-7 fill-zinc-800 dark:fill-zinc-300" />
            )}
        </button>
    );
};

export default UiAvatar;

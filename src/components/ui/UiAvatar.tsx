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
    return (
        <button
            type="button"
            style={{
                width: `${size}px`,
                minWidth: `${size}px`,
                height: `${size}px`,
            }}
            className="flex items-center justify-center overflow-hidden rounded-full bg-zinc-500 dark:bg-zinc-600"
            onClick={handleClick}
        >
            {avatar ? (
                <Image
                    src={avatar}
                    alt={alt}
                    title={alt}
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
        </button>
    );
};

export default UiAvatar;

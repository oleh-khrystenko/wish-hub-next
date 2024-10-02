import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';

interface IProps {
    wish: IWish;
    myUserId?: IUser['id'];
    classes?: string;
}

const WishMark: FC<IProps> = ({
    wish,
    myUserId,
    classes = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[38deg] mobile-xs:-rotate-[26deg] mobile-sm:-rotate-12',
}) => {
    const mainPageT = useTranslations('main-page');

    return (
        <>
            <svg width="0" height="0">
                <filter id="worn-out">
                    <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.8"
                        numOctaves="2"
                        result="noise"
                    />
                    <feDisplacementMap
                        in="SourceGraphic"
                        in2="noise"
                        scale="3.5"
                    />
                </filter>
            </svg>

            {wish.booking?.end && (
                <span
                    className={`${classes} worn-out rounded-md border-2 border-solid border-rose-500 px-1 text-center text-xs font-bold uppercase text-rose-500 backdrop-blur mobile-md:px-2 mobile-md:py-0.5 mobile-xl:text-sm tablet-sm:px-2 tablet-sm:py-1 tablet-sm:text-base tablet-md:text-lg`}
                >
                    {myUserId === wish.booking?.userId ? (
                        <>{mainPageT('reserved_by_your')}</>
                    ) : (
                        <>{mainPageT('reserved')}</>
                    )}
                </span>
            )}

            {wish.executed && (
                <span
                    className={`${classes} worn-out rounded-md border-2 border-solid border-cyan-500 px-1 text-center text-xs font-bold uppercase text-cyan-300 backdrop-blur dark:border-cyan-300 mobile-md:px-2 mobile-md:py-0.5 mobile-xl:text-sm tablet-sm:px-2 tablet-sm:py-1 tablet-sm:text-base tablet-md:text-lg`}
                >
                    {mainPageT('fulfilled.single')}
                </span>
            )}
        </>
    );
};

export default WishMark;

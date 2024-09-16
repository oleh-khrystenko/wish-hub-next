'use client';

import { FC, MouseEvent, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ECurrency, IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import { isBookingExpired } from '@/helpers/utils/date-validators';
import LikeAction from '@/components/layouts/LikeAction';
import LogoIcon from '@/components/icons/LogoIcon';
import EditIcon from '@/components/icons/EditIcon';

interface IProps {
    wish: IWish;
    id: number;
    editWish?: () => void;
}

const WishItem: FC<IProps> = ({ wish, id, editWish }) => {
    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const mainPageT = useTranslations('main-page');

    const name = useMemo(
        () => unencryptedData(wish.name, wish.show),
        [wish.name, wish.show]
    );

    const price = useMemo(() => {
        if (!wish.price) return '';
        return unencryptedData(wish.price, wish.show);
    }, [wish.price, wish.show]);

    const currency = useMemo(
        () => unencryptedData(wish.currency, wish.show),
        [wish.currency, wish.show]
    );

    const handleEditWish = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        editWish && editWish();
    };

    return (
        <li
            className={`${isBookingExpired(wish, myUser?.id) ? 'border-rose-400' : 'border-zinc-300 dark:border-zinc-700'} relative flex w-full cursor-pointer rounded-md border-2 border-dashed`}
        >
            <Link
                href={`/wish/${wish.id}`}
                className={`${wish.executed ? '-rotate-3 border-cyan-500 dark:border-cyan-300' : 'border-transparent'} flex h-full w-full flex-col items-center gap-4 rounded-md border-2 border-dashed bg-cover bg-center bg-no-repeat px-4 pb-3 pt-4`}
                onClick={() => setShowGlobalLoading(true)}
            >
                <div className="relative w-full pt-[100%]">
                    {wish.images?.length > 0 ? (
                        <Image
                            src={unencryptedData(
                                wish.images[0].path,
                                wish.show
                            )}
                            alt={`${mainPageT('picture')}-${wish.images[0].position}`}
                            title={`${name} ${mainPageT('picture')}-${wish.images[0].position + 1}`}
                            priority={true}
                            fill
                            sizes={'100%'}
                            className="object-contain"
                        />
                    ) : (
                        <LogoIcon
                            classes="absolute inset-0 h-full w-full grayscale opacity-50 dark:opacity-20"
                            id={id.toString()}
                        />
                    )}

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
                        <span className="worn-out absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[38deg] whitespace-nowrap rounded-md border-2 border-solid border-rose-500 px-1 text-xs font-bold uppercase text-rose-500 backdrop-blur mobile-xs:-rotate-[26deg] mobile-sm:-rotate-12 mobile-md:px-2 mobile-md:py-0.5 mobile-xl:text-sm tablet-sm:px-2 tablet-sm:py-1 tablet-sm:text-base tablet-md:text-xl desktop-md:text-2xl">
                            {myUser?.id === wish.booking?.userId ? (
                                <>{mainPageT('reserved_by_your')}</>
                            ) : (
                                <>{mainPageT('reserved')}</>
                            )}
                        </span>
                    )}

                    {wish.executed && (
                        <span className="worn-out absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[38deg] whitespace-nowrap rounded-md border-2 border-solid border-cyan-500 px-1 text-xs font-bold uppercase text-cyan-300 backdrop-blur dark:border-cyan-300 mobile-xs:-rotate-[26deg] mobile-sm:-rotate-12 mobile-md:px-2 mobile-md:py-0.5 mobile-xl:text-sm tablet-sm:px-2 tablet-sm:py-1 tablet-sm:text-base tablet-md:text-xl desktop-md:text-2xl">
                            {mainPageT('fulfilled.single')}
                        </span>
                    )}
                </div>

                <div className="flex w-full flex-col items-center justify-evenly gap-3">
                    <div className="w-full truncate text-center text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-lg">
                        {name}
                    </div>

                    {wish.price && (
                        <div className="text-center text-sm text-zinc-700 dark:text-zinc-400 tablet-md:text-base">
                            {addingWhiteSpaces(price)}{' '}
                            {currency || ECurrency.UAH}
                        </div>
                    )}
                </div>

                <div className="mt-auto flex items-center gap-2 tablet-md:gap-3">
                    <LikeAction wish={wish} type="likes" />

                    <LikeAction wish={wish} type="dislikes" />
                </div>
            </Link>

            {editWish &&
                myUser?.id === wish.userId &&
                !wish.booking?.userId &&
                !wish.executed && (
                    <button
                        className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-300 transition-all duration-300 ease-in-out hover:bg-zinc-400 dark:bg-zinc-700 hover:dark:bg-zinc-600"
                        type="button"
                        onClick={handleEditWish}
                    >
                        <EditIcon />
                    </button>
                )}
        </li>
    );
};

export default WishItem;

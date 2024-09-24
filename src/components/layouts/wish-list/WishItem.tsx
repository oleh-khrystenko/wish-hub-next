'use client';

import { FC, MouseEvent, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ECurrency, IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import { isBookingExpired } from '@/helpers/utils/date-validators';
import WishMark from '@/components/layouts/WishMark';
import LikeAction from '@/components/layouts/LikeAction';
import LogoIcon from '@/components/icons/LogoIcon';
import EditIcon from '@/components/icons/EditIcon';

interface IProps {
    wish: IWish;
    idx: number;
    currentPage: string;
    editWish?: () => void;
}

const WishItem: FC<IProps> = ({ wish, idx, currentPage, editWish }) => {
    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

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
                href={`/${activeLocale}/user/${wish.userId}/collection/wish?wishId=${wish.id}&fromPage=${currentPage}`}
                className={`${wish.executed ? 'bg-wish-bg -rotate-3 border-cyan-500 dark:border-cyan-300' : 'border-transparent'} flex h-full w-full flex-col items-center gap-4 rounded-md border-2 border-dashed bg-cover bg-center bg-no-repeat px-4 pb-3 pt-4`}
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
                            id={idx.toString()}
                        />
                    )}

                    <WishMark wish={wish} myUserId={myUser?.id} />
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

'use client';

import { FC } from 'react';
import { ECurrency, IWish } from '@/models/Wish';
import LogoIcon from '@/components/icons/LogoIcon';
import Image from 'next/image';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { useMyUserStore } from '@/stores/my-user';
import { useTranslations } from 'next-intl';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import LikeAction from '@/components/ui/LikeAction';

interface IProps {
    wish: IWish;
    showWish: () => void;
    editWish?: () => void;
}

const WishItem: FC<IProps> = ({ wish, showWish, editWish }) => {
    const myUser = useMyUserStore((state) => state.myUser);

    const mainPageT = useTranslations('main-page');

    return (
        <li
            className={`${myUser && myUser.id === wish.booking?.userId ? 'border-cyan-100' : 'border-zinc-300 dark:border-zinc-800'} relative flex w-full cursor-pointer rounded-md border-2 border-dashed`}
            onClick={showWish}
        >
            <div
                className={`${wish.executed ? '-rotate-3 border-cyan-300' : 'border-transparent'} flex h-full w-full flex-col items-center gap-4 rounded border-2 border-dashed bg-cover bg-center bg-no-repeat px-4 pb-3 pt-4`}
            >
                <div className="relative w-full pt-[100%]">
                    {wish.images?.length > 0 ? (
                        <Image
                            src={unencryptedData(
                                wish.images[0].path,
                                wish.show
                            )}
                            alt={`${mainPageT('wish')} ${wish.images[0].position}`}
                            title={`${mainPageT('wish')} ${wish.images[0].position}`}
                            priority={true}
                            fill
                            sizes={'100%'}
                            className="object-contain"
                        />
                    ) : (
                        <LogoIcon />
                    )}
                </div>

                <div className="flex w-full flex-col items-center justify-evenly gap-3">
                    <div className="w-full truncate text-center text-lg font-bold text-zinc-800 dark:text-zinc-300">
                        {unencryptedData(wish.name, wish.show)}
                    </div>

                    {wish.price && (
                        <div className="text-center text-base text-zinc-700 dark:text-zinc-400">
                            {addingWhiteSpaces(
                                unencryptedData(wish.price, wish.show)
                            )}{' '}
                            {unencryptedData(wish.currency, wish.show) ||
                                ECurrency.UAH}
                        </div>
                    )}
                </div>

                <div className="mt-auto flex items-center gap-3">
                    <LikeAction wish={wish} type="likes" />

                    <LikeAction wish={wish} type="dislikes" />
                </div>
            </div>
        </li>
    );
};

export default WishItem;

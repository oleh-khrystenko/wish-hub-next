'use client';

import { FC, MouseEvent, useMemo } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ECurrency, IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import LogoIcon from '@/components/icons/LogoIcon';

interface IProps {
    wish: IWish;
    idx: number;
}

const WishItem: FC<IProps> = ({ wish, idx }) => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

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

    return (
        <li
            className={`relative flex w-full cursor-pointer flex-col items-center gap-4 rounded-md border-2 border-dashed border-zinc-300 px-4 pb-3 pt-4 dark:border-zinc-700`}
        >
            <div className="relative w-full pt-[100%]">
                {wish.images?.length > 0 ? (
                    <Image
                        src={unencryptedData(wish.images[0].path, wish.show)}
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
            </div>

            <div className="flex w-full flex-col items-center justify-evenly gap-3">
                <div className="w-full truncate text-center text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-lg">
                    {name}
                </div>

                {wish.price && (
                    <div className="text-center text-sm text-zinc-700 dark:text-zinc-400 tablet-md:text-base">
                        {addingWhiteSpaces(price)} {currency || ECurrency.UAH}
                    </div>
                )}
            </div>
        </li>
    );
};

export default WishItem;

'use client';

import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { ECurrency, IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { unencryptedData } from '@/helpers/utils/encryption-data';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import WishMark from '@/components/layouts/WishMark';
import UiImage from '@/components/ui/UiImage';
import LogoIcon from '@/components/icons/LogoIcon';

interface IProps {
    wish: IWish;
    idx: number;
}

const WishItem: FC<IProps> = ({ wish, idx }) => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const setSelectedWish = useWishesStore((state) => state.setSelectedWish);

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

    const handleSelectWish = () => {
        setSelectedWish(wish.id);
    };

    return (
        <li
            className={`${wish.selected ? 'border-green-500 dark:border-green-400' : 'border-zinc-300 dark:border-zinc-700'} relative flex w-full cursor-pointer flex-col items-center gap-4 rounded-md border-2 border-dashed px-5 pb-4 pt-6`}
            onClick={handleSelectWish}
        >
            <div className="relative w-full pt-[100%]">
                {wish.images?.length > 0 ? (
                    <UiImage
                        src={unencryptedData(wish.images[0].path, wish.show)}
                        alt={`${mainPageT('picture')}-${wish.images[0].position}`}
                        priority={true}
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
                <div
                    className="w-full truncate text-center text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-lg"
                    title={name}
                >
                    {name}
                </div>

                {wish.price && (
                    <div className="text-center text-sm text-zinc-700 dark:text-zinc-400 tablet-md:text-base">
                        {addingWhiteSpaces(price)} {currency || ECurrency.UAH}
                    </div>
                )}
            </div>

            <div
                className={`${wish.selected ? 'border-green-500 before:w-6 before:shadow-checked-outline-light before:delay-100 after:h-3.5 dark:border-green-400 dark:before:shadow-checked-outline-dark tablet-md:before:shadow-checked-outline-light-tablet tablet-md:dark:before:shadow-checked-outline-dark-tablet' : 'border-zinc-500 after:delay-100 dark:border-zinc-400'} absolute left-2 top-2 z-10 inline-block h-6 w-6 rounded border-2 bg-transparent transition-all duration-300 ease-in-out before:absolute before:left-2.5 before:top-3 before:inline-block before:h-1 before:w-0 before:origin-top-left before:-rotate-45 before:rounded-full before:bg-green-500 before:transition-all before:duration-150 before:ease-in-out after:absolute after:left-0.5 after:top-1.5 after:inline-block after:h-0 after:w-1 after:origin-top-left after:-rotate-45 after:rounded-full after:bg-green-500 after:transition-all after:duration-150 after:ease-in-out dark:before:bg-green-400 dark:after:bg-green-400`}
            ></div>
        </li>
    );
};

export default WishItem;

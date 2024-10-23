'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TWishSort } from '@/models/Wish';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import SortIcon from '@/components/icons/SortIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import UseChangeWishes from '@/helpers/hooks/UseChangeWishes';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishListActions: FC<IProps> = ({ wishListRefCurrent }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const allPagesT = useTranslations('all-pages');

    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const { handleChangeWishes } = UseChangeWishes();

    let wishesSortText = allPagesT('sort.title');
    sort === 'sortByLikes:desc' &&
        (wishesSortText = allPagesT('sort.by-popularity'));
    sort === 'priceInBaseCurrency:desc' &&
        (wishesSortText = allPagesT('sort.by-price-down'));
    sort === 'priceInBaseCurrency:asc' &&
        (wishesSortText = allPagesT('sort.by-price-up'));
    sort === 'createdAt:desc' &&
        (wishesSortText = allPagesT('sort.by-created-up'));
    sort === 'createdAt:asc' &&
        (wishesSortText = allPagesT('sort.by-created-down'));

    const handleSortBy = async (value: TWishSort) => {
        setWishesSort(value);

        await handleChangeWishes(status, search, value, wishListRefCurrent);

        setShowSlidePanel(false);
        setShowPopup(false);
    };

    return (
        <div className="-mr-4 flex items-center justify-between gap-1 mobile-sm:gap-3">
            <div className="mr-auto flex items-center gap-2">
                <LogoIcon classes="h-5 w-5" id="logo-slide-panel" />

                <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400 mobile-xl:text-base">
                    {allPagesT('wishes')}:
                </span>
            </div>

            <div className="relative ml-auto">
                <UiButton
                    variant="text-btn"
                    onBtnClick={() => setShowPopup(true)}
                >
                    <span className="whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400 mobile-xl:text-base">
                        {wishesSortText}
                    </span>

                    <SortIcon />
                </UiButton>

                <UiPopup
                    classes="pt-10 pr-4"
                    show={showPopup}
                    hide={() => setShowPopup(false)}
                >
                    <div className="flex flex-col p-2">
                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() => handleSortBy('sortByLikes:desc')}
                        >
                            {allPagesT('sort.by-popularity')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() =>
                                handleSortBy('priceInBaseCurrency:desc')
                            }
                        >
                            {allPagesT('sort.by-price-down')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() =>
                                handleSortBy('priceInBaseCurrency:asc')
                            }
                        >
                            {allPagesT('sort.by-price-up')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() => handleSortBy('createdAt:desc')}
                        >
                            {allPagesT('sort.by-created-up')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() => handleSortBy('createdAt:asc')}
                        >
                            {allPagesT('sort.by-created-down')}
                        </button>
                    </div>
                </UiPopup>
            </div>
        </div>
    );
};

export default WishListActions;

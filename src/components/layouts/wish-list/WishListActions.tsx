'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { TWishSort } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import UseInitialCollection from '@/helpers/hooks/UseInitialCollection';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import SortIcon from '@/components/icons/SortIcon';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishListActions: FC<IProps> = ({ wishListRefCurrent }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const { getInitialCollection } = UseInitialCollection();

    let wishesSortText = mainPageT('sort.title');
    sort === 'sortByLikes:desc' &&
        (wishesSortText = mainPageT('sort.by-popularity'));
    sort === 'priceInBaseCurrency:desc' &&
        (wishesSortText = mainPageT('sort.by-price-down'));
    sort === 'priceInBaseCurrency:asc' &&
        (wishesSortText = mainPageT('sort.by-price-up'));
    sort === 'createdAt:desc' &&
        (wishesSortText = mainPageT('sort.by-created-up'));
    sort === 'createdAt:asc' &&
        (wishesSortText = mainPageT('sort.by-created-down'));

    const handleSortBy = async (value: TWishSort) => {
        setWishesSort(value);

        if (selectedUserId) {
            const wishes = await getWishList(
                {
                    myId: myUser?.id,
                    userId: selectedUserId,
                    status,
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort: value,
                },
                allPagesT('wishes-api.get-wish-list.error')
            );

            if (!wishes) return;
            getInitialCollection(wishes);
        } else {
            await getAllWishes(
                {
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    status,
                    search,
                    sort: value,
                },
                allPagesT('wishes-api.get-all-wishes.error')
            );
        }

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        setShowPopup(false);
    };

    return (
        <div className="-mr-4 mt-6 flex items-center justify-between gap-3">
            {myUser?.id === selectedUserId && (
                <UiButton
                    variant="text"
                    href={`user/${myUser?.id}/collection/editor`}
                    onLinkClick={() => setShowSlidePanel(false)}
                >
                    <CrossIcon classes="w-4 h-4 tablet-md:w-5 tablet-md:h-5 stroke-cyan-400 dark:stroke-cyan-300 -rotate-45" />

                    <span className="py-3 text-zinc-500 dark:text-zinc-400">
                        {mainPageT('create_collection')}
                    </span>
                </UiButton>
            )}

            <div className="relative ml-auto">
                <UiButton
                    variant="text-btn"
                    onBtnClick={() => setShowPopup(true)}
                >
                    <span className="whitespace-nowrap text-zinc-500 dark:text-zinc-400">
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
                            {mainPageT('sort.by-popularity')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() =>
                                handleSortBy('priceInBaseCurrency:desc')
                            }
                        >
                            {mainPageT('sort.by-price-down')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() =>
                                handleSortBy('priceInBaseCurrency:asc')
                            }
                        >
                            {mainPageT('sort.by-price-up')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() => handleSortBy('createdAt:desc')}
                        >
                            {mainPageT('sort.by-created-up')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-base"
                            type="button"
                            onClick={() => handleSortBy('createdAt:asc')}
                        >
                            {mainPageT('sort.by-created-down')}
                        </button>
                    </div>
                </UiPopup>
            </div>
        </div>
    );
};

export default WishListActions;

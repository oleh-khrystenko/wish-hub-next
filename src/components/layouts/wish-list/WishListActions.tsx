'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { EWishSort } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import SortIcon from '@/components/icons/SortIcon';

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

    let wishesSortText;
    sort === EWishSort.POPULAR &&
        (wishesSortText = mainPageT('sort.by-popularity'));
    sort === EWishSort.PRICE_DESC &&
        (wishesSortText = mainPageT('sort.by-price-down'));
    sort === EWishSort.PRICE_ASC &&
        (wishesSortText = mainPageT('sort.by-price-up'));
    sort === EWishSort.CREATED_DESC &&
        (wishesSortText = mainPageT('sort.by-created-up'));
    sort === EWishSort.CREATED_ASC &&
        (wishesSortText = mainPageT('sort.by-created-down'));

    const handleSortBy = async (value: EWishSort) => {
        setWishesSort(value);

        if (selectedUserId) {
            await getWishList(
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
        <div className="mt-6 flex w-full items-center justify-between gap-3">
            <div className="text-zinc-800 dark:text-zinc-300">FOLDERS</div>

            <div className="relative ml-auto">
                <UiButton variant="text" onBtnClick={() => setShowPopup(true)}>
                    <span className="whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400 tablet-md:text-sm">
                        {wishesSortText}
                    </span>
                    <SortIcon />
                </UiButton>

                <UiPopup
                    classes="pt-10"
                    show={showPopup}
                    hide={() => setShowPopup(false)}
                >
                    <div className="flex flex-col p-2">
                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-xs font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-sm"
                            type="button"
                            onClick={() => handleSortBy(EWishSort.POPULAR)}
                        >
                            {mainPageT('sort.by-popularity')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-xs font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-sm"
                            type="button"
                            onClick={() => handleSortBy(EWishSort.PRICE_DESC)}
                        >
                            {mainPageT('sort.by-price-down')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-xs font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-sm"
                            type="button"
                            onClick={() => handleSortBy(EWishSort.PRICE_ASC)}
                        >
                            {mainPageT('sort.by-price-up')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-xs font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-sm"
                            type="button"
                            onClick={() => handleSortBy(EWishSort.CREATED_DESC)}
                        >
                            {mainPageT('sort.by-created-up')}
                        </button>

                        <button
                            className="whitespace-nowrap rounded-md px-3 py-2.5 text-left text-xs font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800 tablet-md:text-sm"
                            type="button"
                            onClick={() => handleSortBy(EWishSort.CREATED_ASC)}
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

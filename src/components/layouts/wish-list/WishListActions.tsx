'use client';

import { FC, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { EWishSort } from '@/models/Wish';
import { EPrivacy } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import ShareButton from '@/components/layouts/ShareButton';
import UiTooltip from '@/components/ui/UiTooltip';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import InfoIcon from '@/components/icons/InfoIcon';
import SortIcon from '@/components/icons/SortIcon';

interface IProps {
    wishListWrapRefCurrent: HTMLDivElement | null;
}

const WishListActions: FC<IProps> = ({ wishListWrapRefCurrent }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const wishes = useWishesStore((state) => state.list);
    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);

    const wishListIncludesShowAllWish = useMemo(
        () => wishes.some((wish) => wish.show === EPrivacy.ALL),
        [wishes]
    );

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
                alertsT('wishes-api.get-wish-list.error')
            );
        } else {
            await getAllWishes(
                {
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort: value,
                },
                alertsT('wishes-api.get-all-wishes.error')
            );
        }

        if (!wishListWrapRefCurrent) return;

        wishListWrapRefCurrent.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        setShowPopup(false);
    };

    return (
        <div className="mt-6 flex w-full flex-col gap-3 pl-2.5 tablet-md:flex-row tablet-md:items-center">
            {myUser?.id === selectedUserId && (
                <div className="flex items-center gap-1">
                    <div
                        className={
                            wishListIncludesShowAllWish
                                ? ''
                                : 'pointer-events-none opacity-20'
                        }
                    >
                        <ShareButton
                            link={`/${activeLocale}/wish-list/${selectedUserId}`}
                        >
                            <span className="mr-1.5 whitespace-nowrap text-sm text-zinc-700 dark:text-zinc-400">
                                {mainPageT('share-wishes')}
                            </span>
                        </ShareButton>
                    </div>

                    <span
                        className="cursor-pointer"
                        data-tooltip-id="share-wishes"
                        data-tooltip-content={
                            wishListIncludesShowAllWish
                                ? mainPageT('can-see.share-tooltip')
                                : mainPageT('can-see.inactive-share-tooltip')
                        }
                    >
                        <InfoIcon />
                    </span>
                    <UiTooltip id="share-wishes" />
                </div>
            )}

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

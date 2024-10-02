'use client';

import { FC } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { EWishStatus } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import UseInitialCollection from '@/helpers/hooks/UseInitialCollection';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import UiSearch from '@/components/ui/UiSearch';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishListFilter: FC<IProps> = ({ wishListRefCurrent }) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesStatus = useWishesStore((state) => state.setWishesStatus);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);
    const getCollectionWishes = useWishesStore(
        (state) => state.getCollectionWishes
    );

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const collectionId = searchParams.get('collectionId');

    const selectOptions: IOption[] = [
        {
            label: (
                <span className="whitespace-nowrap pr-6 text-xs font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-sm">
                    {mainPageT('all')}
                </span>
            ),
            value: EWishStatus.ALL,
        },
        {
            label: (
                <span className="whitespace-nowrap pr-6 text-xs font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-sm">
                    {mainPageT('unfulfilled')}
                </span>
            ),
            value: EWishStatus.UNFULFILLED,
        },
        {
            label: (
                <span className="whitespace-nowrap pr-6 text-xs font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-sm">
                    {mainPageT('fulfilled.plural')}
                </span>
            ),
            value: EWishStatus.FULFILLED,
        },
    ];

    const { getInitialCollection } = UseInitialCollection();

    const handleChangeWishStatus = async (value: IOption['value']) => {
        setWishesStatus(value as EWishStatus);

        if (selectedUserId) {
            if (
                collectionId &&
                pathname !==
                    `/${activeLocale}/user/${selectedUserId}/collection/editor`
            ) {
                await getCollectionWishes(
                    {
                        collectionId,
                        myId: myUser?.id,
                        userId: selectedUserId,
                        status: value as EWishStatus,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        search,
                        sort,
                    },
                    allPagesT('wishes-api.get-collection-wishes.error')
                );
            } else {
                const wishes = await getWishList(
                    {
                        myId: myUser?.id,
                        userId: selectedUserId,
                        status: value as EWishStatus,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        search,
                        sort,
                    },
                    allPagesT('wishes-api.get-wish-list.error')
                );

                if (!wishes) return;
                getInitialCollection(wishes);
            }
        } else {
            await getAllWishes(
                {
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    status: value as EWishStatus,
                    search,
                    sort,
                },
                allPagesT('wishes-api.get-wish-list.error')
            );
        }

        setShowSlidePanel(false);

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    const handleChangeSearchBar = async (value: string) => {
        setWishesSearch(value);

        if (selectedUserId) {
            if (
                collectionId &&
                pathname !==
                    `/${activeLocale}/user/${selectedUserId}/collection/editor`
            ) {
                await getCollectionWishes(
                    {
                        collectionId,
                        myId: myUser?.id,
                        userId: selectedUserId,
                        status,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        search: value,
                        sort,
                    },
                    allPagesT('wishes-api.get-collection-wishes.error')
                );
            } else {
                const wishes = await getWishList(
                    {
                        myId: myUser?.id,
                        userId: selectedUserId,
                        page: 1,
                        limit: WISHES_PAGINATION_LIMIT,
                        status,
                        search: value,
                        sort,
                    },
                    allPagesT('wishes-api.get-wish-list.error')
                );

                if (!wishes) return;
                getInitialCollection(wishes);
            }
        } else {
            await getAllWishes(
                {
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    status,
                    search: value,
                    sort,
                },
                allPagesT('wishes-api.get-all-wishes.error')
            );
        }

        setShowSlidePanel(false);

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    return (
        <div className="flex flex-col gap-8">
            <UiSelect
                label={mainPageT('wishes_status')}
                hoverItemBg="hover:bg-zinc-300 hover:dark:bg-zinc-800"
                options={selectOptions}
                value={status}
                onChange={handleChangeWishStatus}
            />

            <UiSearch
                id="wishes-search"
                label={mainPageT('wishes-search')}
                value={search}
                changeSearchBar={handleChangeSearchBar}
            />
        </div>
    );
};

export default WishListFilter;

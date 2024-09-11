'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { EWishStatus } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import UiSearch from '@/components/ui/UiSearch';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishListFilter: FC<IProps> = ({ wishListRefCurrent }) => {
    const mainPageT = useTranslations('main-page');
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesStatus = useWishesStore((state) => state.setWishesStatus);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);

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

    const handleChangeWishStatus = async (value: IOption['value']) => {
        setWishesStatus(value as EWishStatus);

        if (selectedUserId) {
            await getWishList(
                {
                    myId: myUser?.id,
                    userId: selectedUserId,
                    status: value as EWishStatus,
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort,
                },
                alertsT('wishes-api.get-wish-list.error')
            );
        } else {
            await getAllWishes(
                {
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    status: value as EWishStatus,
                    search,
                    sort,
                },
                alertsT('wishes-api.get-wish-list.error')
            );
        }

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    const handleChangeSearchBar = async (value: string) => {
        setWishesSearch(value);

        if (selectedUserId) {
            await getWishList(
                {
                    myId: myUser?.id,
                    userId: selectedUserId,
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    status,
                    search: value,
                    sort,
                },
                alertsT('wishes-api.get-wish-list.error')
            );
        } else {
            await getAllWishes(
                {
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    status,
                    search: value,
                    sort,
                },
                alertsT('wishes-api.get-all-wishes.error')
            );
        }

        if (!wishListRefCurrent) return;

        wishListRefCurrent.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    return (
        <div className="flex w-full items-end gap-3">
            <div className="w-1/2 tablet-md:w-2/5">
                <UiSelect
                    hoverItemBg="hover:bg-zinc-300 hover:dark:bg-zinc-800"
                    options={selectOptions}
                    value={status}
                    onChange={handleChangeWishStatus}
                />
            </div>

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

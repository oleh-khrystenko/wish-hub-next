'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { EWishPrivacy, EWishStatus } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import UseChangeWishes from '@/helpers/hooks/UseChangeWishes';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishListFilters: FC<IProps> = ({ wishListRefCurrent }) => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const status = useWishesStore((state) => state.status);
    const privacy = useWishesStore((state) => state.privacy);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesStatus = useWishesStore((state) => state.setWishesStatus);
    const setWishesPrivacy = useWishesStore((state) => state.setWishesPrivacy);

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const selectStatusOptions: IOption[] = [
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
                    {mainPageT('booked')}
                </span>
            ),
            value: EWishStatus.BOOKED,
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

    const selectPrivacyOptions: IOption[] = [
        {
            label: (
                <span className="whitespace-nowrap pr-6 text-xs font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-sm">
                    {mainPageT('all')}
                </span>
            ),
            value: EWishPrivacy.ALL,
        },
        {
            label: (
                <span className="whitespace-nowrap pr-6 text-xs font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-sm">
                    {mainPageT('public')}
                </span>
            ),
            value: EWishPrivacy.PUBLIC,
        },
        {
            label: (
                <span className="whitespace-nowrap pr-6 text-xs font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-sm">
                    {mainPageT('for_friends')}
                </span>
            ),
            value: EWishPrivacy.FRIENDS,
        },
        {
            label: (
                <span className="whitespace-nowrap pr-6 text-xs font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-sm">
                    {mainPageT('private')}
                </span>
            ),
            value: EWishPrivacy.PRIVACY,
        },
    ];

    const { handleChangeWishes } = UseChangeWishes();

    const handleChangeWishStatus = async (value: IOption['value']) => {
        setWishesStatus(value as EWishStatus);

        await handleChangeWishes(
            value as EWishStatus,
            privacy,
            search,
            sort,
            wishListRefCurrent
        );

        setShowSlidePanel(false);
    };

    const handleChangeWishPrivacy = async (value: IOption['value']) => {
        setWishesPrivacy(value as EWishPrivacy);

        await handleChangeWishes(
            status,
            value as EWishPrivacy,
            search,
            sort,
            wishListRefCurrent
        );

        setShowSlidePanel(false);
    };

    return (
        <>
            <UiSelect
                label={mainPageT('wishes_status')}
                hoverItemBg="hover:bg-zinc-300 hover:dark:bg-zinc-800"
                options={selectStatusOptions}
                value={status}
                onChange={handleChangeWishStatus}
            />

            {myUser && (
                <UiSelect
                    label={mainPageT('wishes_privacy')}
                    hoverItemBg="hover:bg-zinc-300 hover:dark:bg-zinc-800"
                    options={selectPrivacyOptions}
                    value={privacy}
                    onChange={handleChangeWishPrivacy}
                />
            )}
        </>
    );
};

export default WishListFilters;

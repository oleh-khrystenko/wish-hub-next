'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { EWishStatus } from '@/models/Wish';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import UseChangeWishes from '@/helpers/hooks/UseChangeWishes';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const WishListFilters: FC<IProps> = ({ wishListRefCurrent }) => {
    const mainPageT = useTranslations('main-page');

    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesStatus = useWishesStore((state) => state.setWishesStatus);

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

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

    const { handleChangeWishes } = UseChangeWishes();

    const handleChangeWishStatus = async (value: IOption['value']) => {
        setWishesStatus(value as EWishStatus);

        await handleChangeWishes(
            value as EWishStatus,
            search,
            sort,
            wishListRefCurrent
        );

        setShowSlidePanel(false);
    };

    return (
        <div className="flex flex-col gap-5 mobile-xs:gap-8">
            <UiSelect
                label={mainPageT('wishes_status')}
                hoverItemBg="hover:bg-zinc-300 hover:dark:bg-zinc-800"
                options={selectOptions}
                value={status}
                onChange={handleChangeWishStatus}
            />
        </div>
    );
};

export default WishListFilters;

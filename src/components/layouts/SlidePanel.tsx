'use client';

import { FC, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useUsersStore } from '@/stores/users';
import { useCollectionStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import Collections from '@/components/layouts/Collections';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const SlidePanel: FC<IProps> = ({ wishListRefCurrent }) => {
    const allPagesT = useTranslations('all-pages');

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const collections = useCollectionStore((state) => state.collections);
    const getCollections = useCollectionStore((state) => state.getCollections);

    const showSlidePanel = useSettingsStore((state) => state.showSlidePanel);
    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    useEffect(() => {
        if (!selectedUserId) return;

        getCollections(
            { userId: selectedUserId },
            allPagesT('my-user-api.get-collections.error')
        ).finally();
    }, [selectedUserId]);

    return (
        <div
            className={`${showSlidePanel ? 'scale-y-100 tablet-lg:scale-x-100' : 'scale-y-0 tablet-lg:scale-x-0 tablet-lg:scale-y-100'} fixed inset-0 z-30 flex origin-bottom flex-col justify-end transition-all duration-300 ease-in-out tablet-lg:origin-right tablet-lg:pb-1 tablet-lg:pr-1 tablet-lg:pt-20`}
        >
            <div
                className={`${showSlidePanel ? 'opacity-50' : 'opacity-0'} absolute inset-0 -z-10 h-svh w-full bg-zinc-400 transition-all delay-300 duration-300 ease-in-out dark:bg-zinc-950`}
                onClick={() => setShowSlidePanel(false)}
            ></div>

            <div className="flex flex-col gap-6 rounded-t-2xl border-t border-zinc-200 bg-zinc-300 px-4 pb-10 pt-6 drop-shadow-2xl dark:border-zinc-900 dark:bg-zinc-800 tablet-lg:ml-auto tablet-lg:h-full tablet-lg:w-1/2 tablet-lg:rounded-lg tablet-lg:border-t-0 tablet-xl:w-2/5 desktop-sm:w-1/3 desktop-xl:w-1/4">
                <div className="relative">
                    <p className="text-center text-lg text-zinc-600 dark:text-zinc-300">
                        {allPagesT('display_settings')}
                    </p>

                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 p-2"
                        type="button"
                        onClick={() => setShowSlidePanel(false)}
                    >
                        <CrossIcon classes="w-6 h-6 stroke-zinc-600 dark:stroke-zinc-400" />
                    </button>
                </div>

                <div className="rounded-xl bg-zinc-200 px-4 pb-6 pt-3 dark:bg-zinc-900 tablet-lg:h-full">
                    {collections.length > 0 && <Collections />}

                    <WishListActions wishListRefCurrent={wishListRefCurrent} />

                    <WishListFilter wishListRefCurrent={wishListRefCurrent} />
                </div>
            </div>
        </div>
    );
};

export default SlidePanel;

'use client';

import { FC, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ECollectionSort } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import { COLLECTION_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import Collections from '@/components/layouts/Collections';
import WishListActions from '@/components/layouts/slide-panel/WishListActions';
import WishListFilters from '@/components/layouts/slide-panel/WishListFilters';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
}

const SlidePanel: FC<IProps> = ({ wishListRefCurrent }) => {
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const collections = useCollectionsStore((state) => state.list);
    const getCollections = useCollectionsStore((state) => state.getCollections);

    const showSlidePanel = useSettingsStore((state) => state.showSlidePanel);
    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    useEffect(() => {
        if (!selectedUserId) return;

        getCollections(
            {
                myId: myUser?.id,
                userId: selectedUserId,
                page: 1,
                limit: COLLECTION_PAGINATION_LIMIT,
                search: '',
                sort: ECollectionSort.CREATED_DESC,
            },
            allPagesT('my-user-api.get-collections.error')
        ).finally();

        return () => {
            setShowSlidePanel(false);
        };
    }, [selectedUserId]);

    return (
        <div
            className={`${showSlidePanel ? 'scale-y-100 tablet-lg:scale-x-100' : 'scale-y-0 tablet-lg:scale-x-0 tablet-lg:scale-y-100'} fixed inset-0 z-40 flex origin-bottom flex-col justify-end transition-all duration-300 ease-in-out mobile-xs:z-30 tablet-lg:origin-right tablet-lg:pb-1 tablet-lg:pr-1 tablet-lg:pt-20`}
        >
            <div
                className={`${showSlidePanel ? 'opacity-50' : 'opacity-0'} absolute inset-0 -z-10 h-svh w-full bg-zinc-400 transition-all delay-300 duration-300 ease-in-out dark:bg-zinc-950`}
                onClick={() => setShowSlidePanel(false)}
            ></div>

            <div className="flex flex-col gap-4 border-t border-zinc-200 bg-zinc-300 px-2 pb-6 pt-4 drop-shadow-2xl dark:border-zinc-900 dark:bg-zinc-800 mobile-xs:rounded-t-2xl mobile-lg:gap-6 mobile-lg:px-4 mobile-lg:pb-10 mobile-lg:pt-6 tablet-lg:ml-auto tablet-lg:h-full tablet-lg:w-1/2 tablet-lg:rounded-lg tablet-lg:border-t-0 tablet-xl:w-2/5 desktop-sm:w-1/3 desktop-xl:w-1/4">
                <div className="relative">
                    <p className="px-2 text-zinc-600 dark:text-zinc-300 mobile-lg:text-center mobile-lg:text-lg">
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

                <div className="rounded-xl bg-zinc-200 px-2 pb-4 pt-3 dark:bg-zinc-900 mobile-lg:px-4 mobile-lg:pb-6 tablet-lg:h-full">
                    {collections.length > 0 && <Collections />}

                    <WishListActions wishListRefCurrent={wishListRefCurrent} />

                    <WishListFilters wishListRefCurrent={wishListRefCurrent} />
                </div>
            </div>
        </div>
    );
};

export default SlidePanel;

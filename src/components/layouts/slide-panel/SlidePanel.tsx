'use client';

import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ECollectionSort, ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import { COLLECTION_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import Collections from '@/components/layouts/slide-panel/Collections';
import WishListActions from '@/components/layouts/slide-panel/WishListActions';
import WishListFilters from '@/components/layouts/slide-panel/WishListFilters';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import CrossIcon from '@/components/icons/CrossIcon';

interface IProps {
    wishListRefCurrent: HTMLDivElement | null;
    isMainPage?: boolean;
}

const SlidePanel: FC<IProps> = ({ wishListRefCurrent, isMainPage }) => {
    const [collection, setCollection] = useState<ICollection | null>(null);
    const [showConfirmDeleteCollection, setShowConfirmDeleteCollection] =
        useState<boolean>(false);

    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const collections = useCollectionsStore((state) => state.list);
    const getCollections = useCollectionsStore((state) => state.getCollections);
    const deleteCollection = useCollectionsStore(
        (state) => state.deleteCollection
    );

    const showSlidePanel = useSettingsStore((state) => state.showSlidePanel);
    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const handleDeleteCollection = (currentCollection: ICollection) => {
        setCollection(currentCollection);
        setShowConfirmDeleteCollection(true);
    };

    const confirmDeleteCollection = async () => {
        if (!myUser?.id || !collection) return;

        await deleteCollection(
            {
                userId: myUser.id,
                collectionId: collection.id,
            },
            allPagesT('collections.delete-collection.error', {
                name: collection.name,
            })
        );

        setShowConfirmDeleteCollection(false);
    };

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
            allPagesT('collections.get-collections.error')
        ).finally();

        return () => {
            setShowSlidePanel(false);
        };
    }, [selectedUserId]);

    return (
        <>
            <div
                className={`${showSlidePanel ? 'scale-y-100 tablet-lg:scale-x-100' : 'scale-y-0 tablet-lg:scale-x-0 tablet-lg:scale-y-100'} ${isMainPage ? 'fixed' : 'absolute -mr-1'} inset-0 z-40 flex origin-bottom flex-col justify-end transition-all duration-300 ease-in-out mobile-xs:z-30 tablet-lg:origin-right tablet-lg:pb-1 tablet-lg:pr-1 tablet-lg:pt-20`}
            >
                <div
                    className={`${showSlidePanel ? 'opacity-50' : 'opacity-0'} absolute inset-0 -z-10 h-svh w-full bg-zinc-400 transition-all delay-300 duration-300 ease-in-out dark:bg-zinc-950`}
                    onClick={() => setShowSlidePanel(false)}
                ></div>

                <div className="flex flex-col gap-4 border-t border-zinc-200 bg-zinc-300 px-2 pb-6 pt-4 drop-shadow-2xl dark:border-zinc-900 dark:bg-zinc-800 mobile-xs:rounded-t-2xl mobile-lg:gap-6 mobile-lg:px-4 mobile-lg:pb-10 mobile-lg:pt-6 tablet-lg:ml-auto tablet-lg:h-full tablet-lg:w-1/2 tablet-lg:rounded-lg tablet-lg:border-t-0 tablet-xl:w-2/5 desktop-sm:w-1/3 desktop-xl:w-1/4">
                    <div className="relative">
                        <p className="px-2 text-zinc-600 dark:text-zinc-300 mobile-lg:text-lg">
                            {allPagesT('filters')}
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
                        {collections.length > 0 && (
                            <Collections
                                handleDeleteCollection={handleDeleteCollection}
                            />
                        )}

                        <WishListActions
                            wishListRefCurrent={wishListRefCurrent}
                        />

                        <WishListFilters
                            wishListRefCurrent={wishListRefCurrent}
                        />
                    </div>
                </div>
            </div>

            <ConfirmModal
                show={showConfirmDeleteCollection}
                confirm={confirmDeleteCollection}
                hide={() => setShowConfirmDeleteCollection(false)}
                confirmModalT={allPagesT('delete')}
                closeModalT={allPagesT('leave_with_changes.close')}
            >
                <span className="text-zinc-700 dark:text-zinc-300">
                    {allPagesT('sure_collection', { name: collection?.name })}
                </span>
            </ConfirmModal>
        </>
    );
};

export default SlidePanel;

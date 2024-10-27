'use client';

import { FC, useEffect, useRef, useState } from 'react';
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { useTranslations } from 'next-intl';
import { EWishPrivacy, EWishStatus } from '@/models/Wish';
import { ECollectionSort, ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
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
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [deletingCollection, setDeletingCollection] =
        useState<ICollection | null>(null);
    const [showConfirmDeleteCollection, setShowConfirmDeleteCollection] =
        useState<boolean>(false);

    const slidePanelRef = useRef<HTMLDivElement>(null);
    const filtersRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();
    const { userId } = useParams<{ userId: string }>();
    const searchParams = useSearchParams();

    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const wishesStatus = useWishesStore((state) => state.status);
    const wishesPrivacy = useWishesStore((state) => state.privacy);
    const wishesSearch = useWishesStore((state) => state.search);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const collections = useCollectionsStore((state) => state.list);
    const collectionsSearch = useCollectionsStore((state) => state.search);
    const getCollections = useCollectionsStore((state) => state.getCollections);
    const deleteCollection = useCollectionsStore(
        (state) => state.deleteCollection
    );
    const setResetCollections = useCollectionsStore(
        (state) => state.setResetCollections
    );

    const showSlidePanel = useSettingsStore((state) => state.showSlidePanel);
    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const currentUserId = selectedUserId || userId;

    const showWishes =
        wishes.length > 5 ||
        wishesStatus !== EWishStatus.ALL ||
        wishesPrivacy !== EWishPrivacy.ALL ||
        wishesSearch.length > 0;

    const showCollections =
        collections.length > 0 || collectionsSearch.length > 0;

    const handleDeleteCollection = (currentCollection: ICollection) => {
        setDeletingCollection(currentCollection);
        setShowConfirmDeleteCollection(true);
    };

    const confirmDeleteCollection = async () => {
        if (!myUser?.id || !deletingCollection) return;

        await deleteCollection(
            {
                userId: myUser.id,
                collectionId: deletingCollection.id,
            },
            allPagesT('collections.delete-collection.error', {
                name: deletingCollection.name,
            })
        );

        const collectionId = searchParams.get('collectionId');
        if (collectionId === deletingCollection.id) {
            const updatedPath = pathname.split('?')[0];
            router.replace(updatedPath);
        }

        setShowConfirmDeleteCollection(false);
        setShowSlidePanel(false);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!currentUserId || currentUserId.includes('guest')) return;

        getCollections(
            {
                myId: myUser?.id,
                userId: currentUserId,
                page: 1,
                limit: COLLECTION_PAGINATION_LIMIT,
                search: '',
                sort: ECollectionSort.CREATED_DESC,
            },
            allPagesT('collections.get-collections.error')
        ).finally();

        return () => {
            setResetCollections();
            setShowSlidePanel(false);
        };
    }, [firstLoad, currentUserId]);

    useEffect(() => {
        if (showSlidePanel) {
            window.scrollTo({
                behavior: 'smooth',
                top: 0,
            });
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [showSlidePanel]);

    return (
        <>
            <div
                className={`${showSlidePanel ? 'scale-y-100 tablet-lg:scale-x-100' : 'scale-y-0 tablet-lg:scale-x-0 tablet-lg:scale-y-100'} ${isMainPage ? 'fixed' : 'fixed -mr-1 tablet-lg:absolute'} inset-0 z-40 flex origin-bottom flex-col justify-end transition-all duration-300 ease-in-out mobile-xs:z-30 tablet-lg:origin-right tablet-lg:justify-start tablet-lg:pb-1 tablet-lg:pr-1 tablet-lg:pt-20`}
            >
                <div
                    className="absolute inset-0 -z-10 h-svh w-full"
                    onClick={() => setShowSlidePanel(false)}
                ></div>

                <div
                    className={`${isMainPage ? 'desktop-xl:w-1/4' : ''} flex max-h-[calc(100svh_-_84px)] flex-col gap-4 rounded-t-2xl border-t border-zinc-200 bg-zinc-300 px-2 pb-6 pt-4 drop-shadow-2xl dark:border-zinc-900 dark:bg-zinc-800 mobile-lg:gap-6 mobile-lg:px-4 mobile-lg:pb-10 mobile-lg:pt-6 tablet-lg:ml-auto tablet-lg:h-full tablet-lg:w-1/2 tablet-lg:rounded-lg tablet-lg:border-t-0 tablet-xl:w-2/5 desktop-sm:w-1/3`}
                    ref={slidePanelRef}
                >
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

                    <div className="rounded-xl bg-zinc-200 px-2 pb-2 pt-3 dark:bg-zinc-900 mobile-lg:px-4 mobile-lg:pb-6 tablet-lg:h-full">
                        {showWishes && (
                            <>
                                <WishListActions
                                    wishListRefCurrent={wishListRefCurrent}
                                />

                                <div
                                    className="flex flex-col gap-2"
                                    ref={filtersRef}
                                >
                                    <WishListFilters
                                        wishListRefCurrent={wishListRefCurrent}
                                    />
                                </div>
                            </>
                        )}

                        {showWishes && showCollections && (
                            <div className="mb-3 mt-4 h-px w-full bg-zinc-400 dark:bg-zinc-700"></div>
                        )}

                        {showCollections && (
                            <Collections
                                deleteCollection={handleDeleteCollection}
                                slidePanelRef={slidePanelRef}
                                filtersRef={filtersRef}
                            />
                        )}
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
                    {allPagesT('sure_collection', {
                        name: deletingCollection?.name,
                    })}
                </span>
            </ConfirmModal>
        </>
    );
};

export default SlidePanel;

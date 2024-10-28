import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { EWishPrivacy, EWishStatus } from '@/models/Wish';
import { ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import Title from '@/app/[locale]/main/Title';
import SlidePanel from '@/components/layouts/slide-panel/SlidePanel';
import WishItem from '@/components/layouts/wish-list/WishItem';
import ShareCollection from '@/components/layouts/wish-list/ShareCollection';
import WishesSearch from '@/components/layouts/WishesSearch';
import CreateWishAndCollection from '@/components/layouts/CreateWishAndCollection';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
import LogoIcon from '@/components/icons/LogoIcon';
import SliderIcon from '@/components/icons/SliderIcon';
import EditIcon from '@/components/icons/EditIcon';
import BasketIcon from '@/components/icons/BasketIcon';

const WishList: FC = () => {
    const [deletingCollection, setDeletingCollection] = useState<
        ICollection | undefined
    >(undefined);
    const [showConfirmDeleteCollection, setShowConfirmDeleteCollection] =
        useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const wishes = useWishesStore((state) => state.list);
    const page = useWishesStore((state) => state.page);
    const wishesStatus = useWishesStore((state) => state.status);
    const wishesPrivacy = useWishesStore((state) => state.privacy);
    const wishesSearch = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const resetWishList = useWishesStore((state) => state.resetWishList);
    const addWishList = useWishesStore((state) => state.addWishList);
    const addAllWishes = useWishesStore((state) => state.addAllWishes);
    const addCollectionWishes = useWishesStore(
        (state) => state.addCollectionWishes
    );

    const collections = useCollectionsStore((state) => state.list);
    const collectionsSearch = useCollectionsStore((state) => state.search);
    const deleteCollection = useCollectionsStore(
        (state) => state.deleteCollection
    );

    const setShowSidebar = useSettingsStore((state) => state.setShowSidebar);
    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const {
        getInitialWishList,
        getInitialAllWishes,
        getInitialCollectionWishes,
    } = UseInitialWishes();
    const { getFullName } = UseFullName();

    const collectionId = searchParams.get('collectionId');

    const showWishes =
        wishes.length > 5 ||
        wishesStatus !== EWishStatus.ALL ||
        wishesPrivacy !== EWishPrivacy.ALL ||
        wishesSearch.length > 0;

    const showCollections =
        collections.length > 0 || collectionsSearch.length > 0;

    const showFilters = showWishes || showCollections;

    const selectedUserFullName = useMemo(() => {
        const selectedUser = users.find((user) => user.id === selectedUserId);
        return getFullName(selectedUser);
    }, [users, selectedUserId]);

    const wishesExample = [
        {
            name: mainPageT('wish-example.first'),
        },
        {
            name: mainPageT('wish-example.second'),
        },
        {
            name: mainPageT('wish-example.third'),
        },
        {
            name: mainPageT('wish-example.fourth'),
        },
    ];

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
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        const fetchWishes = async () => {
            if (!inView || stopRequests) return;

            setIsLoadingAdd(true);

            if (selectedUserId) {
                if (collectionId) {
                    await addCollectionWishes(
                        {
                            collectionId,
                            myId: myUser?.id,
                            userId: selectedUserId,
                            status: wishesStatus,
                            privacy: wishesPrivacy,
                            page,
                            limit: WISHES_PAGINATION_LIMIT,
                            search: wishesSearch,
                            sort,
                        },
                        allPagesT('wishes-api.get-collection-wishes.error')
                    );
                } else {
                    await addWishList(
                        {
                            myId: myUser?.id,
                            userId: selectedUserId,
                            status: wishesStatus,
                            privacy: wishesPrivacy,
                            page,
                            limit: WISHES_PAGINATION_LIMIT,
                            search: wishesSearch,
                            sort,
                        },
                        allPagesT('wishes-api.get-wish-list.error')
                    );
                }
            } else {
                await addAllWishes(
                    {
                        page,
                        limit: WISHES_PAGINATION_LIMIT,
                        status: wishesStatus,
                        search: wishesSearch,
                        sort,
                    },
                    allPagesT('wishes-api.get-all-wishes.error')
                );
            }

            setIsLoadingAdd(false);
        };

        fetchWishes().finally();
    }, [inView]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        const fetchWishes = async () => {
            setShowSidebar(false);

            const localSelectedUserId = localStorage.getItem('selectedUserId');
            if (localSelectedUserId) {
                if (collectionId) {
                    await getInitialCollectionWishes(
                        collectionId,
                        myUser?.id,
                        localSelectedUserId,
                        myUser?.id === localSelectedUserId
                            ? 'createdAt:desc'
                            : 'sortByLikes:desc'
                    );
                } else {
                    await getInitialWishList(
                        myUser?.id,
                        localSelectedUserId,
                        myUser?.id === localSelectedUserId
                            ? 'createdAt:desc'
                            : 'sortByLikes:desc'
                    );
                }
            } else {
                if (myUser) {
                    if (collectionId) {
                        await getInitialCollectionWishes(
                            collectionId,
                            myUser.id,
                            myUser.id,
                            'createdAt:desc'
                        );
                    } else {
                        await getInitialWishList(
                            myUser.id,
                            myUser.id,
                            'createdAt:desc'
                        );
                    }
                } else {
                    await getInitialAllWishes();
                }
            }
        };

        fetchWishes().finally();
    }, [firstLoad, collectionId]);

    useEffect(() => {
        setDeletingCollection(
            collections.find((collection) => collection.id === collectionId)
        );
    }, [collections, collectionId]);

    useEffect(() => {
        return () => {
            resetWishList();
        };
    }, []);

    return (
        <>
            <Title selectedUserFullName={selectedUserFullName} />

            {collectionId &&
                deletingCollection &&
                myUser?.id === deletingCollection.userId && (
                    <div className="mt-2 flex items-center justify-between">
                        <UiButton
                            href={`user/${myUser?.id}/collection/editor?collectionId=${collectionId}`}
                            variant="clear-styles"
                            classesWrap="rounded-md p-2.5 tablet-md:p-2 flex items-center text-sm text-zinc-500 dark:text-zinc-400 tablet-md:text-base font-bold transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600"
                        >
                            <div className="mr-2">
                                <EditIcon classes="w-4 h-4 fill-zinc-800 dark:fill-zinc-300" />
                            </div>

                            {allPagesT('edit')}
                            <span className="ml-1.5 hidden mobile-sm:block">
                                {allPagesT('action_collection')}
                            </span>
                        </UiButton>

                        <UiButton
                            variant="clear-styles"
                            classesWrap="rounded-md p-2.5 tablet-md:p-2 -mr-2.5 tablet-md:-ml-2 flex items-center text-sm text-rose-500 tablet-md:text-base font-bold transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600"
                            onBtnClick={() =>
                                setShowConfirmDeleteCollection(true)
                            }
                        >
                            {allPagesT('delete')}
                            <span className="ml-1.5 hidden mobile-sm:block">
                                {allPagesT('action_collection')}
                            </span>

                            <div className="ml-2">
                                <BasketIcon />
                            </div>
                        </UiButton>

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
                    </div>
                )}

            <div className="flex flex-col items-center justify-between pl-2.5 mobile-sm:flex-row mobile-sm:gap-2">
                {showFilters && (
                    <div className="mr-auto">
                        <UiButton
                            variant="text"
                            onBtnClick={() => setShowSlidePanel(true)}
                        >
                            <SliderIcon classes="w-6 h-6 stroke-cyan-400 dark:stroke-cyan-300" />

                            <span className="py-3 text-sm text-zinc-500 dark:text-zinc-400 tablet-md:text-base">
                                {allPagesT('filters')}
                            </span>
                        </UiButton>
                    </div>
                )}

                {myUser?.id === selectedUserId && wishes.length > 0 && (
                    <ShareCollection myUserId={myUser.id} />
                )}
            </div>

            {showWishes && (
                <div className="mt-5 pl-2.5">
                    <WishesSearch wishListRefCurrent={wishListRef.current} />
                </div>
            )}

            {myUser?.id === selectedUserId || wishes.length > 0 ? (
                <div
                    className="wish-list-scrollbar mt-4 grow overflow-y-auto overflow-x-hidden p-2.5"
                    ref={wishListRef}
                >
                    <ul className="grid grid-cols-2 gap-1.5 tablet-lg:grid-cols-3 tablet-xl:grid-cols-4 tablet-xl:gap-4 desktop-sm:grid-cols-5 desktop-xl:grid-cols-6 desktop-2xl:grid-cols-8">
                        {(myUser?.id === selectedUserId ||
                            (!myUser && !selectedUserId)) && (
                            <CreateWishAndCollection currentPage="main" />
                        )}

                        {wishes.length > 0 &&
                            wishes.map((wish, idx) => (
                                <WishItem
                                    key={wish.id + idx}
                                    wish={wish}
                                    idx={idx}
                                    currentPage="main"
                                />
                            ))}

                        {wishesExample.map((wish, idx) => {
                            if (wishes.length > idx) return null;

                            let opacity = 'opacity-0';
                            if (myUser?.id === selectedUserId) {
                                idx === 0 && (opacity = 'opacity-50');
                                idx === 1 && (opacity = 'opacity-40');
                                idx === 2 && (opacity = 'opacity-30');
                                idx === 3 && (opacity = 'opacity-20');
                            }

                            return (
                                <li
                                    key={idx}
                                    className={`${opacity} flex w-full flex-col items-center justify-center gap-6 rounded-md border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700`}
                                    onClick={() =>
                                        myUser?.id === selectedUserId &&
                                        router.push(
                                            `/${activeLocale}/user/${myUser?.id}/wish/editor`
                                        )
                                    }
                                >
                                    <div className="relative w-full pt-[100%]">
                                        <LogoIcon
                                            classes="absolute inset-0 h-full w-full"
                                            id={`wish-example-${idx}`}
                                        />
                                    </div>

                                    <div className="w-full text-center text-lg font-bold text-zinc-800 dark:text-zinc-300">
                                        {wish.name}
                                    </div>
                                </li>
                            );
                        })}

                        <li
                            className="h-px w-full"
                            style={{
                                display: stopRequests ? 'none' : 'block',
                            }}
                            ref={ref}
                        ></li>
                    </ul>

                    {isLoadingAdd && (
                        <div className="relative mt-5 h-20 w-full">
                            <UiLoading isLocal bg="bg-transparent" />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <p className="flex w-full flex-col items-center text-center text-xl text-zinc-700 dark:text-zinc-300">
                        {mainPageT('at_user')}
                        <span className="max-w-full truncate px-0.5 text-center text-xl italic text-zinc-700 dark:text-zinc-300">
                            {selectedUserFullName}
                        </span>
                        {mainPageT('does_not_have')}
                    </p>
                </div>
            )}

            <SlidePanel wishListRefCurrent={wishListRef.current} isMainPage />
        </>
    );
};

export default WishList;

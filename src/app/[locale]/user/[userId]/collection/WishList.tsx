import { FC, useEffect, useRef, useState } from 'react';
import {
    useParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { EWishPrivacy, EWishStatus, IGuestWish } from '@/models/Wish';
import { ICollection } from '@/models/Collection';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import GuestWishItem from '@/app/[locale]/user/[userId]/collection/GuestWishItem';
import ShareCollection from '@/components/layouts/wish-list/ShareCollection';
import WishItem from '@/components/layouts/wish-list/WishItem';
import SlidePanel from '@/components/layouts/slide-panel/SlidePanel';
import WishesSearch from '@/components/layouts/WishesSearch';
import CreateWishAndCollection from '@/components/layouts/CreateWishAndCollection';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
import UiModal from '@/components/ui/modal/UiModal';
import LogoIcon from '@/components/icons/LogoIcon';
import SliderIcon from '@/components/icons/SliderIcon';
import ShareIcon from '@/components/icons/ShareIcon';
import EditIcon from '@/components/icons/EditIcon';
import BasketIcon from '@/components/icons/BasketIcon';

interface IProps {
    userId: string;
}

const WishList: FC<IProps> = ({ userId }) => {
    const [guestWishes, setGuestWishes] = useState<IGuestWish[]>([]);
    const [deletingCollection, setDeletingCollection] = useState<
        ICollection | undefined
    >(undefined);
    const [showConfirmDeleteCollection, setShowConfirmDeleteCollection] =
        useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
    const [showAttention, setShowAttention] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
    const pathname = usePathname();
    const { userId: routeUserId } = useParams<{ userId: string }>();
    const searchParams = useSearchParams();

    const activeLocale = useLocale();
    const profilePageT = useTranslations('profile-page');
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const wishesStatus = useWishesStore((state) => state.status);
    const wishesPrivacy = useWishesStore((state) => state.privacy);
    const page = useWishesStore((state) => state.page);
    const wishesSearch = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const addWishList = useWishesStore((state) => state.addWishList);
    const addCollectionWishes = useWishesStore(
        (state) => state.addCollectionWishes
    );

    const collections = useCollectionsStore((state) => state.list);
    const collectionsSearch = useCollectionsStore((state) => state.search);
    const deleteCollection = useCollectionsStore(
        (state) => state.deleteCollection
    );

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const utmParams = UseUTMParams();
    const { getInitialWishList, getInitialCollectionWishes } =
        UseInitialWishes();

    const collectionId = searchParams.get('collectionId');

    const showWishes =
        wishes.length > 5 ||
        wishesStatus !== EWishStatus.ALL ||
        wishesPrivacy !== EWishPrivacy.ALL ||
        wishesSearch.length > 0;

    const showCollections =
        collections.length > 0 || collectionsSearch.length > 0;

    const showFilters =
        (showWishes || showCollections) && !routeUserId.includes('guest');

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

        if (!inView || stopRequests || routeUserId.includes('guest')) return;

        const fetchWishList = async () => {
            setIsLoadingAdd(true);

            if (collectionId) {
                await addCollectionWishes(
                    {
                        collectionId,
                        myId: myUser?.id,
                        userId,
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
                        userId,
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

            setIsLoadingAdd(false);
        };
        fetchWishList().finally();
    }, [inView]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        const fetchCollection = async () => {
            if (routeUserId.includes('guest')) {
                const localGuestWishes: string =
                    localStorage.getItem('guestWishes') || '';

                setGuestWishes(
                    localGuestWishes.length > 0
                        ? (JSON.parse(localGuestWishes) as IGuestWish[])
                        : []
                );
            } else {
                if (collectionId) {
                    await getInitialCollectionWishes(
                        collectionId,
                        myUser?.id,
                        userId,
                        'createdAt:desc'
                    );
                } else {
                    await getInitialWishList(myUser?.id, userId);
                }
            }
        };

        fetchCollection().finally();
    }, [firstLoad, userId, collectionId, routeUserId]);

    useEffect(() => {
        setDeletingCollection(
            collections.find((collection) => collection.id === collectionId)
        );
    }, [collections, collectionId]);

    return (
        <>
            {collectionId &&
                deletingCollection &&
                myUser?.id === deletingCollection.userId && (
                    <div className="mt-2 flex items-center justify-between">
                        <UiButton
                            href={`user/${myUser?.id}/collection/editor?collectionId=${collectionId}`}
                            variant="clear-styles"
                            classesWrap="rounded-md p-2.5 tablet-md:p-2 -ml-2.5 tablet-md:-ml-2 flex items-center text-sm text-zinc-500 dark:text-zinc-400 tablet-md:text-base font-bold transition-all duration-300 ease-in-out hover:bg-zinc-200 hover:dark:bg-zinc-600"
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

            <div className="flex flex-col mobile-sm:flex-row mobile-sm:items-center mobile-sm:justify-between mobile-sm:gap-2">
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

                {myUser?.id === userId && (
                    <ShareCollection myUserId={myUser.id} />
                )}

                {routeUserId.includes('guest') && (
                    <UiButton
                        classesWrap="flex item-center gap-2 text-zinc-700 dark:text-zinc-300 ml-auto whitespace-nowrap"
                        variant="clear-styles"
                        onBtnClick={() => setShowAttention(true)}
                    >
                        {mainPageT('share_wishes')}
                        <ShareIcon />
                    </UiButton>
                )}
            </div>

            {showWishes && (
                <div className="mt-5">
                    <WishesSearch wishListRefCurrent={wishListRef.current} />
                </div>
            )}

            {myUser?.id === routeUserId ||
            wishes.length > 0 ||
            guestWishes.length > 0 ? (
                <div className="mt-4" ref={wishListRef}>
                    <ul className="grid grid-cols-2 gap-1.5 tablet-md:grid-cols-3 tablet-lg:grid-cols-4 tablet-xl:grid-cols-5 tablet-xl:gap-4 desktop-sm:grid-cols-6">
                        {(myUser?.id === routeUserId ||
                            routeUserId.includes('guest')) && (
                            <CreateWishAndCollection currentPage="collection" />
                        )}

                        {wishes.length > 0 &&
                            wishes.map((wish, idx) => (
                                <WishItem
                                    key={wish.id + idx}
                                    wish={wish}
                                    idx={idx}
                                    currentPage="collection"
                                />
                            ))}

                        {guestWishes.length > 0 &&
                            guestWishes.map((wish, idx) => (
                                <GuestWishItem
                                    key={wish.id + idx}
                                    wish={wish}
                                    idx={idx}
                                    currentPage="collection"
                                />
                            ))}

                        {wishesExample.map((wish, idx) => {
                            const currentWishesLength =
                                wishes.length || guestWishes.length;
                            if (currentWishesLength > idx) return null;

                            let opacity = 'opacity-0';
                            if (
                                myUser?.id === routeUserId ||
                                routeUserId.includes('guest')
                            ) {
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
                                        myUser?.id === routeUserId &&
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
                <div className="flex grow items-center justify-center">
                    <p className="text-center text-zinc-600 dark:text-zinc-300 tablet-md:text-lg">
                        {profilePageT('wishes-empty')}
                    </p>
                </div>
            )}

            <SlidePanel wishListRefCurrent={wishListRef.current} />

            <UiModal
                rounded="rounded-2xl"
                show={showAttention}
                hide={() => setShowAttention(false)}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-amber-400">
                    ⚠️{' '}
                    <span className="text-center">
                        {mainPageT('only_registered_users')}
                    </span>{' '}
                    ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('trying_share_collection')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton
                        variant="outline"
                        onBtnClick={() => setShowAttention(false)}
                    >
                        {mainPageT('i_see')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>
        </>
    );
};

export default WishList;

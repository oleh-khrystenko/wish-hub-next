import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { IUser } from '@/models/User';
import { EWishPrivacy, EWishStatus } from '@/models/Wish';
import { ICollection } from '@/models/Collection';
import { IPageParams } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { useCollectionsStore } from '@/stores/collection';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import {
    COLLECTION_SLUG_TO_ID_MAP,
    USER_SLUG_TO_ID_MAP,
    WISHES_PAGINATION_LIMIT,
} from '@/helpers/utils/constants';
import WishItem from '@/app/[locale]/[userSlug]/components/WishItem';
import SlidePanel from '@/components/layouts/slide-panel/SlidePanel';
import WishesSearch from '@/components/layouts/WishesSearch';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
import SliderIcon from '@/components/icons/SliderIcon';

const WishList: FC = () => {
    const [userId, setUserId] = useState<IUser['id'] | null>(null);
    const [collectionId, setCollectionId] = useState<ICollection['id'] | null>(
        null
    );
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const { userSlug, collectionSlug } = useParams<IPageParams['params']>();

    const profilePageT = useTranslations('profile-page');
    const allPagesT = useTranslations('all-pages');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const setSelectedUserId = useUsersStore((state) => state.setSelectedUserId);

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

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const { getInitialWishList, getInitialCollectionWishes } =
        UseInitialWishes();

    const showWishes =
        wishes.length > 5 ||
        wishesStatus !== EWishStatus.ALL ||
        wishesPrivacy !== EWishPrivacy.ALL ||
        wishesSearch.length > 0;

    const showCollections =
        collections.length > 0 || collectionsSearch.length > 0;

    const showFilters = showWishes || showCollections;

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests || !userId) return;

        const fetchWishes = async () => {
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

        fetchWishes().finally();
    }, [inView]);

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!userId) return;

        const fetchWishes = async () => {
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

            setSelectedUserId(null);
            localStorage.removeItem('selectedUserId');
        };

        fetchWishes().finally();
    }, [firstLoad, userId]);

    useEffect(() => {
        if (userSlug) {
            setUserId(USER_SLUG_TO_ID_MAP[userSlug]);
        }

        if (collectionSlug) {
            setCollectionId(COLLECTION_SLUG_TO_ID_MAP[collectionSlug]);
        }
    }, [userSlug, collectionSlug]);

    return (
        <>
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
            </div>

            {showWishes && (
                <div className="mt-5">
                    <WishesSearch wishListRefCurrent={wishListRef.current} />
                </div>
            )}

            {wishes.length > 0 && userSlug ? (
                <div className="mt-4" ref={wishListRef}>
                    <ul className="grid grid-cols-2 gap-1.5 tablet-md:grid-cols-3 tablet-lg:grid-cols-4 tablet-xl:grid-cols-5 tablet-xl:gap-4 desktop-sm:grid-cols-6">
                        {wishes.length > 0 &&
                            wishes.map((wish, idx) => (
                                <WishItem
                                    key={wish.id + idx}
                                    wish={wish}
                                    idx={idx}
                                    userSlug={userSlug}
                                />
                            ))}

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
        </>
    );
};

export default WishList;

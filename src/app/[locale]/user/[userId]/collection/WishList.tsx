import { FC, useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import ShareCollection from '@/components/layouts/wish-list/ShareCollection';
import WishItem from '@/components/layouts/wish-list/WishItem';
import SlidePanel from '@/components/layouts/slide-panel/SlidePanel';
import CreateWishAndCollection from '@/components/layouts/CreateWishAndCollection';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
import LogoIcon from '@/components/icons/LogoIcon';
import SliderIcon from '@/components/icons/SliderIcon';

interface IProps {
    userId: string;
}

const WishList: FC<IProps> = ({ userId }) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const router = useRouter();
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
    const status = useWishesStore((state) => state.status);
    const page = useWishesStore((state) => state.page);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const addWishList = useWishesStore((state) => state.addWishList);
    const addCollectionWishes = useWishesStore(
        (state) => state.addCollectionWishes
    );

    const setShowSlidePanel = useSettingsStore(
        (state) => state.setShowSlidePanel
    );

    const { getInitialWishList, getInitialCollectionWishes } =
        UseInitialWishes();

    const collectionId = searchParams.get('collectionId');

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

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests) return;

        const fetchWishList = async () => {
            setIsLoadingAdd(true);

            if (collectionId) {
                await addCollectionWishes(
                    {
                        collectionId,
                        myId: myUser?.id,
                        userId,
                        status,
                        page,
                        limit: WISHES_PAGINATION_LIMIT,
                        search,
                        sort,
                    },
                    allPagesT('wishes-api.get-collection-wishes.error')
                );
            } else {
                await addWishList(
                    {
                        myId: myUser?.id,
                        userId,
                        status,
                        page,
                        limit: WISHES_PAGINATION_LIMIT,
                        search,
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
        const fetchCollection = async () => {
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
        };

        fetchCollection().finally();
    }, [userId, collectionId]);

    return (
        <>
            <div className="flex flex-col mobile-sm:flex-row mobile-sm:items-center mobile-sm:justify-between mobile-sm:gap-2">
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

                {myUser?.id === userId && (
                    <ShareCollection myUserId={myUser.id} />
                )}
            </div>

            {myUser?.id === routeUserId || wishes.length > 0 ? (
                <div className="mt-4" ref={wishListRef}>
                    <ul className="grid grid-cols-2 gap-1.5 tablet-md:grid-cols-3 tablet-lg:grid-cols-4 tablet-xl:grid-cols-5 tablet-xl:gap-4 desktop-sm:grid-cols-6">
                        {myUser?.id === routeUserId && (
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

                        {wishesExample.map((wish, idx) => {
                            if (wishes.length > idx) return null;

                            let opacity = 'opacity-0';
                            if (myUser?.id === routeUserId) {
                                idx === 0 && (opacity = 'opacity-50');
                                idx === 1 && (opacity = 'opacity-40');
                                idx === 2 && (opacity = 'opacity-30');
                                idx === 3 && (opacity = 'opacity-20');
                            }

                            return (
                                <li
                                    key={idx}
                                    className={`${opacity} flex min-h-96 w-full flex-col items-center justify-center gap-6 rounded-md border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700`}
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
        </>
    );
};

export default WishList;

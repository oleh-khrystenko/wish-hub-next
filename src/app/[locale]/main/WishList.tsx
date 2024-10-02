import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { EWishStatus, IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import CreateWish from '@/components/layouts/wish-editor/CreateWish';
import EditWish from '@/components/layouts/wish-editor/EditWish';
import SlidePanel from '@/components/layouts/SlidePanel';
import WishItem from '@/components/layouts/wish-list/WishItem';
import ShareCollection from '@/components/layouts/wish-list/ShareCollection';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
import CrossIcon from '@/components/icons/CrossIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import SliderIcon from '@/components/icons/SliderIcon';

const WishList: FC = () => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [showCreateWish, setShowCreateWish] = useState<boolean>(false);
    const [showEditWish, setShowEditWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const searchParams = useSearchParams();

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
    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const resetWishCandidate = useWishesStore(
        (state) => state.resetWishCandidate
    );
    const addWishList = useWishesStore((state) => state.addWishList);
    const addAllWishes = useWishesStore((state) => state.addAllWishes);
    const addCollectionWishes = useWishesStore(
        (state) => state.addCollectionWishes
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

    let doesNotHave;
    status === EWishStatus.ALL &&
        (doesNotHave = mainPageT('does_not_have_all'));
    status === EWishStatus.FULFILLED &&
        (doesNotHave = mainPageT('does_not_have_fulfilled'));
    status === EWishStatus.UNFULFILLED &&
        (doesNotHave = mainPageT('does_not_have_unfulfilled'));

    let emptyText;
    myUser?.id !== selectedUserId &&
        (emptyText = (
            <>
                <span>{mainPageT('at-user')}</span>
                <span className="max-w-full truncate px-0.5 text-center text-xl italic text-zinc-700 dark:text-zinc-300">
                    {selectedUserFullName}
                </span>
                <span>{doesNotHave}</span>
            </>
        ));
    !selectedUserId &&
        (emptyText = <span>{mainPageT('no_wishes_found')}</span>);

    const handleShowCreateWish = () => {
        setShowCreateWish(true);
    };
    const handleHideCreateWish = () => {
        setShowCreateWish(false);
        resetWishCandidate();
    };

    const handleShowEditWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowEditWish(true);
    };
    const handleHideEditWish = () => {
        setIdOfSelectedWish(null);
        setShowEditWish(false);
    };

    useEffect(() => {
        const fetchWishes = async () => {
            if (firstLoad) {
                setFirstLoad(false);
                return;
            }

            if (!inView || stopRequests) return;

            setIsLoadingAdd(true);

            if (selectedUserId) {
                if (collectionId) {
                    await addCollectionWishes(
                        {
                            collectionId,
                            myId: myUser?.id,
                            userId: selectedUserId,
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
                            userId: selectedUserId,
                            status,
                            page,
                            limit: WISHES_PAGINATION_LIMIT,
                            search,
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
                        status,
                        search,
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
    }, [collectionId]);

    return (
        <>
            <div className="my-2 pl-2.5">
                {selectedUserId ? (
                    <>
                        {myUser?.id === selectedUserId ? (
                            <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-300 tablet-lg:text-3xl">
                                {mainPageT('my_wishes')}
                            </h1>
                        ) : (
                            <h1 className="flex max-w-full flex-wrap items-center">
                                <span className="mr-1 min-h-7 whitespace-nowrap text-2xl font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-3xl">
                                    {mainPageT('wishes_of_user')}
                                </span>
                                <span className="min-h-7 max-w-full truncate pr-0.5 text-2xl font-bold italic text-zinc-800 dark:text-zinc-300 tablet-md:text-3xl">
                                    {selectedUserFullName}
                                </span>
                            </h1>
                        )}
                    </>
                ) : (
                    <h1 className="text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                        {mainPageT('wishes_of_users')}
                    </h1>
                )}
            </div>

            {wishes.length > 0 && (
                <div className="flex flex-col items-center justify-between pl-2.5 tablet-lg:flex-row tablet-lg:gap-4">
                    <div className="mr-auto">
                        <UiButton
                            variant="text"
                            onBtnClick={() => setShowSlidePanel(true)}
                        >
                            <SliderIcon classes="w-6 h-6 stroke-cyan-400 dark:stroke-cyan-300" />

                            <span className="py-3 text-sm text-zinc-500 dark:text-zinc-400 tablet-md:text-base">
                                {allPagesT('display_settings')}
                            </span>
                        </UiButton>
                    </div>

                    {myUser?.id === selectedUserId && (
                        <ShareCollection myUserId={myUser.id} />
                    )}
                </div>
            )}

            {myUser?.id === selectedUserId || wishes.length > 0 ? (
                <div
                    className="wish-list-scrollbar mt-4 grow overflow-y-auto overflow-x-hidden p-2.5"
                    ref={wishListRef}
                >
                    <ul className="grid grid-cols-2 gap-1.5 tablet-lg:grid-cols-3 tablet-xl:grid-cols-4 tablet-xl:gap-4 desktop-sm:grid-cols-5 desktop-xl:grid-cols-6 desktop-2xl:grid-cols-8">
                        {myUser?.id === selectedUserId && (
                            <li className="relative flex items-center justify-center rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                                <button
                                    className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-transparent transition-all duration-300 ease-in-out hover:-rotate-3 hover:border-cyan-500 hover:dark:border-cyan-300"
                                    type="button"
                                    onClick={handleShowCreateWish}
                                >
                                    <CrossIcon classes="w-28 h-28 -rotate-45 group-hover:stroke-cyan-500 group-hover:dark:stroke-cyan-300 stroke-zinc-700 dark:stroke-zinc-400" />

                                    <span className="text-xl font-bold text-zinc-700 group-hover:text-cyan-500 dark:text-zinc-400 group-hover:dark:text-cyan-300">
                                        {mainPageT('create-wish')}
                                    </span>
                                </button>
                            </li>
                        )}

                        {wishes.length > 0 &&
                            wishes.map((wish, idx) => (
                                <WishItem
                                    key={wish.id + idx}
                                    wish={wish}
                                    idx={idx}
                                    currentPage="main"
                                    editWish={() => handleShowEditWish(wish.id)}
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
                                    className={`${opacity} flex min-h-96 w-full flex-col items-center justify-center gap-6 rounded-md border-2 border-dashed border-zinc-300 p-8 dark:border-zinc-700`}
                                    onClick={() =>
                                        myUser?.id === selectedUserId &&
                                        handleShowCreateWish()
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
                            <UiLoading isLocal />
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <p className="flex w-full flex-col items-center text-center text-xl text-zinc-700 dark:text-zinc-300">
                        {emptyText}
                    </p>
                </div>
            )}

            <CreateWish
                showModal={showCreateWish}
                hide={handleHideCreateWish}
            />

            {showEditWish && (
                <EditWish
                    idOfSelectedWish={idOfSelectedWish}
                    hide={handleHideEditWish}
                />
            )}

            <SlidePanel wishListRefCurrent={wishListRef.current} />
        </>
    );
};

export default WishList;

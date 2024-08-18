import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { EWishSort, EWishStatus, IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import WishItem from '@/components/layouts/wish-list/WishItem';
import CreateWish from '@/components/layouts/wish-list/CreateWish';
import EditWish from '@/components/layouts/wish-list/EditWish';
import DetailWish from '@/components/layouts/wish-list/DetailWish';
import Loading from '@/components/layouts/Loading';
import UiModal from '@/components/ui/UiModal';
import CrossIcon from '@/components/icons/CrossIcon';
import LogoIcon from '@/components/icons/LogoIcon';

interface IProps {
    selectedUserFullName: string;
}

const WishList: FC<IProps> = ({ selectedUserFullName }) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [showWish, setShowWish] = useState<boolean>(false);
    const [showCreateWish, setShowCreateWish] = useState<boolean>(false);
    const [showEditWish, setShowEditWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);

    const wishListRef = useRef<HTMLUListElement>(null);
    const gotWishes = useRef(false);

    const mainPageT = useTranslations('main-page');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);
    const setSelectedUserId = useUsersStore((state) => state.setSelectedUserId);

    const wishes = useWishesStore((state) => state.list);
    const page = useWishesStore((state) => state.page);
    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const isLoading = useWishesStore((state) => state.isLoading);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);
    const resetWishCandidate = useWishesStore(
        (state) => state.resetWishCandidate
    );
    const getWishList = useWishesStore((state) => state.getWishList);
    const addWishList = useWishesStore((state) => state.addWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);
    const addAllWishes = useWishesStore((state) => state.addAllWishes);

    const selectedUser = useMemo(
        () => users.find((user) => user.id === selectedUserId),
        [users, selectedUserId]
    );

    const detailWish = useMemo(
        () => wishes.find((wish) => wish.id === idOfSelectedWish),
        [wishes, idOfSelectedWish]
    );

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
        resetWishCandidate(null);
    };

    const handleShowEditWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowEditWish(true);
    };
    const handleHideEditWish = () => {
        setShowEditWish(false);
    };

    const handleShowWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowWish(true);
    };
    const handleHideWish = () => {
        setShowWish(false);
    };

    useEffect(() => {
        const fetchWishes = async () => {
            if (firstLoad) {
                setFirstLoad(false);
                return;
            }

            if (!inView || stopRequests) return;

            if (selectedUserId) {
                await addWishList({
                    myId: myUser?.id,
                    userId: selectedUserId,
                    status,
                    page,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort,
                });
            } else {
                await addAllWishes({
                    page,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort,
                });
            }
        };

        fetchWishes().finally();
    }, [inView]);

    useEffect(() => {
        const fetchWishes = async () => {
            if (gotWishes.current) return;
            gotWishes.current = true;

            const isMyWishes = location.search === '?my-wishes'; // Випадок переходу зі сторінки профілю або зі сторінки списку бажань на власні бажання
            if (isMyWishes && myUser) {
                await getWishList({
                    myId: myUser.id,
                    userId: myUser.id,
                    status,
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort: EWishSort.CREATED_DESC,
                });
                setSelectedUserId(myUser.id);
                setWishesSort(EWishSort.CREATED_DESC);
                return;
            }

            const localSelectedUserId = localStorage.getItem('selectedUserId');
            if (localSelectedUserId) {
                await getWishList({
                    myId: myUser?.id,
                    userId: localSelectedUserId,
                    status,
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort:
                        myUser?.id === localSelectedUserId
                            ? EWishSort.CREATED_DESC
                            : sort,
                });
                setSelectedUserId(localSelectedUserId);
                if (myUser?.id === localSelectedUserId) {
                    setWishesSort(EWishSort.CREATED_DESC);
                }
            } else {
                await getAllWishes({
                    page: 1,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort: EWishSort.POPULAR,
                });
                setWishesSort(EWishSort.POPULAR);
            }
        };

        fetchWishes().finally();
    }, []);

    return (
        <>
            <WishListFilter wishListRefCurrent={wishListRef.current} />

            <WishListActions wishListRefCurrent={wishListRef.current} />

            {myUser?.id === selectedUserId || wishes.length > 0 ? (
                <ul
                    className="wish-list-scrollbar mt-6 grid grow grid-cols-3 gap-4 overflow-y-auto overflow-x-hidden p-2.5"
                    ref={wishListRef}
                >
                    {myUser?.id === selectedUserId && (
                        <li className="relative flex items-center justify-center rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
                            <button
                                className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-transparent transition-all duration-300 ease-in-out hover:-rotate-3 hover:border-cyan-300"
                                type="button"
                                onClick={handleShowCreateWish}
                            >
                                <CrossIcon classes="w-28 h-28 -rotate-45 group-hover:stroke-cyan-300 stroke-zinc-700 dark:stroke-zinc-400" />

                                <span className="text-xl font-bold text-zinc-700 group-hover:text-cyan-300 dark:text-zinc-400">
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
                                id={idx}
                                editWish={() => handleShowEditWish(wish.id)}
                                showWish={() => handleShowWish(wish.id)}
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
                                        id={idx}
                                    />
                                </div>

                                <div className="w-full text-center text-lg font-bold text-zinc-800 dark:text-zinc-300">
                                    {wish.name}
                                </div>
                            </li>
                        );
                    })}

                    <li
                        className="observable-element"
                        style={{
                            display: stopRequests ? 'none' : 'block',
                        }}
                        ref={ref}
                    ></li>
                </ul>
            ) : (
                <div className="flex h-full w-full items-center justify-center">
                    <p className="flex w-full flex-col items-center text-center text-xl text-zinc-700 dark:text-zinc-300">
                        {emptyText}
                    </p>
                </div>
            )}

            {isLoading && <Loading isLocal />}

            {detailWish && (
                <UiModal show={showWish} hide={handleHideWish}>
                    <DetailWish
                        wish={detailWish}
                        selectedUser={selectedUser}
                        editWish={() => handleShowEditWish(idOfSelectedWish)}
                        hide={handleHideWish}
                    />
                </UiModal>
            )}

            <UiModal show={showCreateWish} hide={handleHideCreateWish}>
                <CreateWish hide={handleHideCreateWish} />
            </UiModal>

            <UiModal show={showEditWish} hide={handleHideEditWish}>
                <EditWish
                    idOfSelectedWish={idOfSelectedWish}
                    hide={handleHideEditWish}
                />
            </UiModal>
        </>
    );
};

export default WishList;

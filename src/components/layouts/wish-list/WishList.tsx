import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import { EWishSort, EWishStatus, IWish } from '@/models/Wish';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import { useWishesStore } from '@/stores/wishes';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import UiSearch from '@/components/ui/UiSearch';
import InfoIcon from '@/components/icons/InfoIcon';
import UiTooltip from '@/components/ui/UiTooltip';
import UiShareButton from '@/components/ui/UiShareButton';
import { EPrivacy } from '@/models/Settings';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import SortIcon from '@/components/icons/SortIcon';
import CrossIcon from '@/components/icons/CrossIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import WishItem from '@/components/layouts/wish-list/WishItem';

interface IProps {
    selectedUserFullName: string;
}

const WishList: FC<IProps> = ({ selectedUserFullName }) => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [showWish, setShowWish] = useState<boolean>(false);
    const [showCreateWish, setShowCreateWish] = useState<boolean>(false);
    const [showEditWish, setShowEditWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);

    const wishListRef = useRef<HTMLUListElement>(null);

    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);
    const setSelectedUserId = useUsersStore((state) => state.setSelectedUserId);
    const wishes = useWishesStore((state) => state.list);
    const page = useWishesStore((state) => state.page);
    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const setWishesStatus = useWishesStore((state) => state.setWishesStatus);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);
    const resetWishCandidate = useWishesStore(
        (state) => state.resetWishCandidate
    );
    const getWishList = useWishesStore((state) => state.getWishList);
    const addWishList = useWishesStore((state) => state.addWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);
    const addAllWishes = useWishesStore((state) => state.addAllWishes);

    const wishListIncludesShowAllWish = useMemo(
        () => wishes.some((wish) => wish.show === EPrivacy.ALL),
        [wishes]
    );

    const selectOptions: IOption[] = [
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('title-personal')}
                </span>
            ),
            value: EWishStatus.ALL,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('unfulfilled')}
                </span>
            ),
            value: EWishStatus.UNFULFILLED,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {mainPageT('fulfilled.plural')}
                </span>
            ),
            value: EWishStatus.FULFILLED,
        },
    ];

    let wishesSortText;
    sort === EWishSort.POPULAR &&
        (wishesSortText = mainPageT('sort.by-popularity'));
    sort === EWishSort.PRICE_DESC &&
        (wishesSortText = mainPageT('sort.by-price-down'));
    sort === EWishSort.PRICE_ASC &&
        (wishesSortText = mainPageT('sort.by-price-up'));
    sort === EWishSort.CREATED_DESC &&
        (wishesSortText = mainPageT('sort.by-created-up'));
    sort === EWishSort.CREATED_ASC &&
        (wishesSortText = mainPageT('sort.by-created-down'));

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
                <span className="empty-name">{selectedUserFullName}</span>
                <span>{doesNotHave}</span>
            </>
        ));
    !selectedUserId &&
        (emptyText = <span>{mainPageT('no_wishes_found')}</span>);

    const handleChangeWishStatus = async (value: IOption['value']) => {
        setWishesStatus(value as EWishStatus);

        if (!myUser || !selectedUserId) return;

        await getWishList({
            myId: myUser.id,
            userId: selectedUserId,
            status: value as EWishStatus,
            page: 1,
            limit: WISHES_PAGINATION_LIMIT,
            search,
            sort,
        });

        if (!wishListRef.current) return;

        wishListRef.current.scrollTo(0, 0);
    };

    const handleChangeSearchBar = async (value: string) => {
        setWishesSearch(value);

        if (selectedUserId) {
            await getWishList({
                myId: myUser?.id,
                userId: selectedUserId,
                status,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: value,
                sort,
            });
        } else {
            await getAllWishes({
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search: value,
                sort,
            });
        }

        if (!wishListRef.current) return;

        wishListRef.current.scrollTo(0, 0);
    };

    const handleSortBy = async (value: EWishSort) => {
        setWishesSort(value);

        if (selectedUserId) {
            await getWishList({
                myId: myUser?.id,
                userId: selectedUserId,
                status,
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search,
                sort: value,
            });
        } else {
            await getAllWishes({
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search,
                sort: value,
            });
        }

        if (!wishListRef.current) return;

        wishListRef.current.scrollTo(0, 0);

        setShowPopup(false);
    };

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
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests) return;

        if (selectedUserId) {
            addWishList({
                myId: myUser?.id,
                userId: selectedUserId,
                status,
                page,
                limit: WISHES_PAGINATION_LIMIT,
                search,
                sort,
            });
        } else {
            addAllWishes({
                page,
                limit: WISHES_PAGINATION_LIMIT,
                search,
                sort,
            });
        }
    }, [inView]);

    useEffect(() => {
        const isMyWishes = location.search === '?my-wishes'; // Випадок переходу зі сторінки профілю або зі сторінки списку бажань на власні бажання
        if (isMyWishes && myUser) {
            getWishList({
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
            getWishList({
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
            getAllWishes({
                page: 1,
                limit: WISHES_PAGINATION_LIMIT,
                search,
                sort: EWishSort.POPULAR,
            });
            setWishesSort(EWishSort.POPULAR);
        }
    }, []);

    return (
        <>
            <div className="flex w-full items-end gap-3">
                {/*** Filter ***/}
                <div className="w-2/5">
                    <UiSelect
                        options={selectOptions}
                        value={status}
                        onChange={handleChangeWishStatus}
                    />
                </div>

                {/*** Search ***/}
                <UiSearch
                    id="wishes-search"
                    label={mainPageT('wishes-search')}
                    value={search}
                    changeSearchBar={handleChangeSearchBar}
                />
            </div>

            <div className="mt-6 flex w-full items-center gap-3">
                {/*** Share ***/}
                {myUser?.id === selectedUserId && (
                    <div className="flex items-center gap-3">
                        <span
                            className="tooltip"
                            data-tooltip-id="share-wishes"
                            data-tooltip-content={
                                wishListIncludesShowAllWish
                                    ? mainPageT('can-see.share-tooltip')
                                    : mainPageT(
                                          'can-see.inactive-share-tooltip'
                                      )
                            }
                        >
                            <InfoIcon />
                        </span>
                        <UiTooltip id="share-wishes" />

                        <div
                            className={
                                wishListIncludesShowAllWish
                                    ? ''
                                    : 'pointer-events-none opacity-20'
                            }
                        >
                            <UiShareButton
                                link={`/${activeLocale}/wish-list/${selectedUserId}`}
                            >
                                <span className="mr-1.5 whitespace-nowrap text-sm text-zinc-800 dark:text-zinc-300">
                                    {mainPageT('share-wishes')}
                                </span>
                            </UiShareButton>
                        </div>
                    </div>
                )}

                {/*** Sort ***/}
                <div className="relative ml-auto">
                    <UiButton variant="text" onClick={() => setShowPopup(true)}>
                        <span className="text-sm text-zinc-800 dark:text-zinc-300">
                            {wishesSortText}
                        </span>
                        <SortIcon />
                    </UiButton>

                    <UiPopup
                        classes="pt-10"
                        show={showPopup}
                        hide={() => setShowPopup(false)}
                    >
                        <div className="flex flex-col p-2">
                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() => handleSortBy(EWishSort.POPULAR)}
                            >
                                {mainPageT('sort.by-popularity')}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.PRICE_DESC)
                                }
                            >
                                {mainPageT('sort.by-price-down')}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.PRICE_ASC)
                                }
                            >
                                {mainPageT('sort.by-price-up')}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.CREATED_DESC)
                                }
                            >
                                {mainPageT('sort.by-created-up')}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.CREATED_ASC)
                                }
                            >
                                {mainPageT('sort.by-created-down')}
                            </button>
                        </div>
                    </UiPopup>
                </div>
            </div>

            {myUser?.id === selectedUserId || wishes.length > 0 ? (
                <ul className="wish-list" ref={wishListRef}>
                    {myUser?.id === selectedUserId && (
                        <li className="create-wish">
                            <button
                                className="create-wish-action"
                                type="button"
                                onClick={handleShowCreateWish}
                            >
                                <CrossIcon />
                            </button>
                        </li>
                    )}

                    {wishes.length > 0 &&
                        wishes.map((wish, idx) => (
                            <WishItem
                                key={wish.id + idx}
                                wish={wish}
                                editWish={() => handleShowEditWish(wish.id)}
                                showWish={() => handleShowWish(wish.id)}
                            />
                        ))}

                    {wishesExample.map((wish, idx) => {
                        if (wishes.length > idx) return null;

                        return (
                            <li
                                key={idx}
                                className={
                                    'wish-item' +
                                    (myUser?.id !== selectedUserId
                                        ? ' opacity'
                                        : ` example_${idx}`)
                                }
                                onClick={() => handleShowEditWish(null)}
                            >
                                <div className="wish-box">
                                    <div className="wish-item-img">
                                        <LogoIcon />
                                    </div>

                                    <div className="wish-item-data">
                                        <div className="wish-item-name">
                                            {wish.name}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}

                    <div
                        className="observable-element"
                        style={{
                            display: stopRequests ? 'none' : 'block',
                        }}
                        ref={ref}
                    ></div>
                </ul>
            ) : (
                <div className="empty-box">
                    <p className="empty-text">{emptyText}</p>
                </div>
            )}
        </>
    );
};

export default WishList;

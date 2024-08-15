import React, { FC, useRef, useMemo, useState } from 'react';
import UiSelect, { IOption } from '@/components/ui/UiSelect';
import { EWishSort, EWishStatus, IWish } from '@/models/Wish';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import { useWishesStore } from '@/stores/wishes';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import UiSearch from '@/components/ui/UiSearch';
import InfoIcon from '@/components/icons/InfoIcon';
import UiTooltip from '@/components/ui/UiTooltip';
import UiShareButton, {
    IUiShareButtonTranslations,
} from '@/components/ui/UiShareButton';
import { useLocale } from 'next-intl';
import { EPrivacy } from '@/models/Settings';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import SortIcon from '@/components/icons/SortIcon';

interface IProps {
    allT: string;
    unfulfilledT: string;
    fulfilledT: string;
    wishesSearchT: string;
    uiShareButtonTranslations: IUiShareButtonTranslations;
    shareWishesT: string;
    canSeeShareTooltipT: string;
    canSeeInactiveShareTooltipT: string;
    sortByPopularityT: string;
    sortByPriceDownT: string;
    sortByPriceUpT: string;
    sortByCreatedUpT: string;
    sortByCreatedDownT: string;
}

const WishList: FC<IProps> = ({
    allT,
    unfulfilledT,
    fulfilledT,
    wishesSearchT,
    uiShareButtonTranslations,
    shareWishesT,
    canSeeShareTooltipT,
    canSeeInactiveShareTooltipT,
    sortByPopularityT,
    sortByPriceDownT,
    sortByPriceUpT,
    sortByCreatedUpT,
    sortByCreatedDownT,
}) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const wishListRef = useRef<HTMLUListElement>(null);

    const activeLocale = useLocale();

    const myUser = useMyUserStore((state) => state.myUser);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);
    const wishes = useWishesStore((state) => state.list);
    const status = useWishesStore((state) => state.status);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const setWishesStatus = useWishesStore((state) => state.setWishesStatus);
    const setWishesSearch = useWishesStore((state) => state.setWishesSearch);
    const setWishesSort = useWishesStore((state) => state.setWishesSort);
    const getWishList = useWishesStore((state) => state.getWishList);
    const getAllWishes = useWishesStore((state) => state.getAllWishes);

    const wishListIncludesShowAllWish = useMemo(
        () => wishes.some((wish) => wish.show === EPrivacy.ALL),
        [wishes]
    );

    const selectOptions: IOption[] = [
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {allT}
                </span>
            ),
            value: EWishStatus.ALL,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {unfulfilledT}
                </span>
            ),
            value: EWishStatus.UNFULFILLED,
        },
        {
            label: (
                <span className="pr-6 text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {fulfilledT}
                </span>
            ),
            value: EWishStatus.FULFILLED,
        },
    ];

    let wishesSortText;
    sort === EWishSort.POPULAR && (wishesSortText = sortByPopularityT);
    sort === EWishSort.PRICE_DESC && (wishesSortText = sortByPriceDownT);
    sort === EWishSort.PRICE_ASC && (wishesSortText = sortByPriceUpT);
    sort === EWishSort.CREATED_DESC && (wishesSortText = sortByCreatedUpT);
    sort === EWishSort.CREATED_ASC && (wishesSortText = sortByCreatedDownT);

    const handleShowPopup = () => {
        setShowPopup(true);
    };

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

    return (
        <>
            <div className="flex w-full items-end gap-3">
                <div className="w-2/5">
                    <UiSelect
                        options={selectOptions}
                        value={status}
                        onChange={handleChangeWishStatus}
                    />
                </div>

                <UiSearch
                    id="wishes-search"
                    label={wishesSearchT}
                    value={search}
                    changeSearchBar={handleChangeSearchBar}
                />
            </div>

            <div className="mt-6 flex w-full items-center gap-3">
                {myUser?.id === selectedUserId && (
                    <div className="flex items-center gap-3">
                        <span
                            className="tooltip"
                            data-tooltip-id="share-wishes"
                            data-tooltip-content={
                                wishListIncludesShowAllWish
                                    ? canSeeShareTooltipT
                                    : canSeeInactiveShareTooltipT
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
                                uiShareButtonTranslations={
                                    uiShareButtonTranslations
                                }
                            >
                                <span className="mr-1.5 whitespace-nowrap text-sm text-zinc-800 dark:text-zinc-300">
                                    {shareWishesT}
                                </span>
                            </UiShareButton>
                        </div>
                    </div>
                )}

                <div className="relative ml-auto">
                    <UiButton variant="text" onClick={handleShowPopup}>
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
                                {sortByPopularityT}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.PRICE_DESC)
                                }
                            >
                                {sortByPriceDownT}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.PRICE_ASC)
                                }
                            >
                                {sortByPriceUpT}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.CREATED_DESC)
                                }
                            >
                                {sortByCreatedUpT}
                            </button>

                            <button
                                className="rounded-md px-2 py-1 text-left text-sm font-bold text-zinc-800 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                                type="button"
                                onClick={() =>
                                    handleSortBy(EWishSort.CREATED_ASC)
                                }
                            >
                                {sortByCreatedDownT}
                            </button>
                        </div>
                    </UiPopup>
                </div>
            </div>

            {/*{ (myUser?.id === selectedUserId || wishes.list.length > 0) ? (*/}
            {/*    <ul className="wish-list" ref={ wishListRef }>*/}
            {/*        { myUser?.id === selectedUserId && (*/}
            {/*            <li className="create-wish">*/}
            {/*                <button*/}
            {/*                    className="create-wish-action"*/}
            {/*                    type="button"*/}
            {/*                    onClick={ handleShowCreateWish }*/}
            {/*                >*/}
            {/*                    <AddCircleIcon className="create-wish-plus" />*/}
            {/*                </button>*/}
            {/*            </li>*/}
            {/*        ) }*/}

            {/*        { wishes.list.length > 0 && wishes.list.map((wish, idx) => (*/}
            {/*            <WishItem*/}
            {/*                key={ wish.id + idx }*/}
            {/*                wish={ wish }*/}
            {/*                editWish={ () => handleShowEditWish(wish.id) }*/}
            {/*                showWish={ () => handleShowWish(wish.id) }*/}
            {/*            />*/}
            {/*        )) }*/}

            {/*        { wishesExample.map((wish, idx) => {*/}
            {/*            if (wishes.list.length > idx) return null;*/}

            {/*            return (*/}
            {/*                <li*/}
            {/*                    key={ idx }*/}
            {/*                    className={*/}
            {/*                        "wish-item"*/}
            {/*                        + (myUser?.id !== selectedUserId ? " opacity" : ` example_${ idx }`)*/}
            {/*                    }*/}
            {/*                    onClick={ () => handleShowEditWish(null) }*/}
            {/*                >*/}
            {/*                    <div className="wish-box">*/}
            {/*                        <div className="wish-item-img">*/}
            {/*                            <img*/}
            {/*                                className="wish-item-img-icon"*/}
            {/*                                src={ LogoIcon }*/}
            {/*                                alt="Wish Hub Logo"*/}
            {/*                            />*/}
            {/*                        </div>*/}

            {/*                        <div className="wish-item-data">*/}
            {/*                            <div className="wish-item-name">*/}
            {/*                                { wish.name }*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </li>*/}
            {/*            );*/}
            {/*        }) }*/}

            {/*        <div*/}
            {/*            className="observable-element"*/}
            {/*            style={ { display: users.stopRequests ? 'none' : 'block' } }*/}
            {/*            ref={ ref }*/}
            {/*        ></div>*/}
            {/*    </ul>*/}
            {/*) : (*/}
            {/*    <div className="empty-box">*/}
            {/*        <p className="empty-text">{ emptyText }</p>*/}
            {/*    </div>*/}
            {/*) }*/}
        </>
    );
};

export default WishList;

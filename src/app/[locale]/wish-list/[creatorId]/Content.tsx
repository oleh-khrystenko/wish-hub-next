'use client';

import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UseFullName from '@/helpers/hooks/UseFullName';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import DetailWish from '@/components/layouts/detail-wish/DetailWish';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import WishItem from '@/components/layouts/wish-list/WishItem';
import UiAvatar from '@/components/ui/UiAvatar';
import UiLoading from '@/components/ui/UiLoading';
import UiModal from '@/components/ui/UiModal';
import ListIcon from '@/components/icons/ListIcon';

const Content: FC = () => {
    const [showWish, setShowWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const { creatorId } = useParams<{ creatorId: string }>();

    const mainPageT = useTranslations('main-page');
    const profilePageT = useTranslations('profile-page');
    const alertsT = useTranslations('alerts');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const wishes = useWishesStore((state) => state.list);
    const wishesCreator = useWishesStore((state) => state.creator);
    const status = useWishesStore((state) => state.status);
    const page = useWishesStore((state) => state.page);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const addWishList = useWishesStore((state) => state.addWishList);

    const { getInitialWishList } = UseInitialWishes();
    const { getFullName } = UseFullName();
    const screenWidth = UseScreenWidth();

    const pages = [
        {
            href: 'wish-list',
            icon: ListIcon,
            name: profilePageT('wish-list-title'),
        },
    ];

    const selectedUser = useMemo(
        () => users.find((user) => user.id === selectedUserId),
        [users, selectedUserId]
    );
    const detailWish = useMemo(
        () => wishes.find((wish) => wish.id === idOfSelectedWish),
        [wishes, idOfSelectedWish]
    );

    const handleShowWish = (id: IWish['id'] | null) => {
        setIdOfSelectedWish(id);
        setShowWish(true);
    };

    const handleHideWish = () => {
        setIdOfSelectedWish(null);
        setShowWish(false);
    };

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests) return;

        const fetchWishList = async () => {
            setIsLoadingAdd(true);

            await addWishList(
                {
                    myId: myUser?.id,
                    userId: creatorId,
                    status,
                    page,
                    limit: WISHES_PAGINATION_LIMIT,
                    search,
                    sort,
                },
                alertsT('wishes-api.get-wish-list.error')
            );

            setIsLoadingAdd(false);
        };
        fetchWishList().finally();
    }, [inView]);

    useEffect(() => {
        getInitialWishList(myUser?.id, creatorId).finally();
    }, [creatorId]);

    return (
        <div className="pt-3">
            <Breadcrumbs pages={pages} />

            <div className="mt-3 px-3 pb-5">
                <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {mainPageT('wish-list-page-title')}
                </p>

                <div className="flex items-center gap-3 tablet-sm:gap-4">
                    <UiAvatar
                        avatar={wishesCreator?.avatar}
                        alt={getFullName(wishesCreator)}
                        priority
                        size={screenWidth < 768 ? 144 : 208}
                        sizeTailwind="w-36 min-w-36 h-36 min-h-36 tablet-md:w-52 tablet-md:min-w-52 tablet-md:h-52 tablet-md:min-h-52"
                        sizeIcon="w-28 h-28 tablet-md:w-40 tablet-md:h-40"
                    />

                    <p
                        className="max-w-32 truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:max-w-40 mobile-sm:max-w-48 mobile-md:max-w-56 mobile-lg:max-w-60 mobile-xl:max-w-72 tablet-sm:max-w-96 tablet-md:max-w-lg tablet-md:text-3xl tablet-lg:max-w-3xl desktop-xs:max-w-5xl"
                        title={getFullName(wishesCreator)}
                    >
                        {getFullName(wishesCreator)}
                    </p>
                </div>

                {wishesCreator && wishesCreator.wishList.length > 4 && (
                    <>
                        <WishListFilter
                            wishListRefCurrent={wishListRef.current}
                        />

                        <WishListActions
                            withoutShare
                            wishListRefCurrent={wishListRef.current}
                        />
                    </>
                )}

                {wishes.length > 0 ? (
                    <div className="mt-6" ref={wishListRef}>
                        <ul className="grid grid-cols-2 gap-1.5 tablet-xl:grid-cols-3 tablet-xl:gap-4 desktop-xs:grid-cols-4">
                            {wishes.map((wish, idx) => (
                                <WishItem
                                    key={wish.id + idx}
                                    wish={wish}
                                    id={idx}
                                    showWish={() => handleShowWish(wish.id)}
                                />
                            ))}

                            <div
                                className="h-px w-full"
                                style={{
                                    display: stopRequests ? 'none' : 'block',
                                }}
                                ref={ref}
                            ></div>
                        </ul>

                        {isLoadingAdd && (
                            <div className="relative mt-5 h-20 w-full">
                                <UiLoading isLocal />
                            </div>
                        )}
                    </div>
                ) : (
                    <p className="profile-wishes-empty">
                        {profilePageT('wishes-empty')}
                    </p>
                )}
            </div>

            {detailWish && (
                <UiModal
                    show={showWish}
                    px="px-0 pr-1 tablet-md:pr-2 tablet-lg:pr-3 desktop-xs:pr-0"
                    hide={handleHideWish}
                >
                    <DetailWish
                        wish={detailWish}
                        selectedUser={selectedUser}
                        hide={handleHideWish}
                    />
                </UiModal>
            )}
        </div>
    );
};

export default Content;

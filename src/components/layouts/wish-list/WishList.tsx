import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useUsersStore } from '@/stores/users';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import WishItem from '@/components/layouts/wish-list/WishItem';
import DetailWish from '@/components/layouts/detail-wish/DetailWish';
import UiModal from '@/components/ui/modal/UiModal';
import UiLoading from '@/components/ui/UiLoading';

interface IProps {
    userId: string;
}

const WishList: FC<IProps> = ({ userId }) => {
    const [showWish, setShowWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const alertsT = useTranslations('alerts');
    const profilePageT = useTranslations('profile-page');

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
                    userId,
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
        getInitialWishList(myUser?.id, userId).finally();
    }, [userId]);

    return (
        <>
            {wishesCreator && wishesCreator.wishList.length > 4 && (
                <>
                    <WishListFilter wishListRefCurrent={wishListRef.current} />

                    <WishListActions
                        withoutShare
                        wishListRefCurrent={wishListRef.current}
                    />
                </>
            )}

            {wishes.length > 0 ? (
                <div className="mt-6" ref={wishListRef}>
                    <ul className="grid grid-cols-2 gap-1.5 tablet-xl:grid-cols-3 tablet-xl:gap-4">
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
        </>
    );
};

export default WishList;

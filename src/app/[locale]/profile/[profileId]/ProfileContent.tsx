'use client';

import { FC, useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import EditProfile from '@/app/[locale]/profile/[profileId]/EditProfile';
import ChangePassword from '@/app/[locale]/profile/[profileId]/ChangePassword';
import DetailProfile from '@/app/[locale]/profile/[profileId]/DetailProfile';
import UiButton from '@/components/ui/UiButton';
import EditIcon from '@/components/icons/EditIcon';
import WishItem from '@/components/layouts/wish-list/WishItem';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import { IWish } from '@/models/Wish';
import UiLoading from '@/components/ui/UiLoading';

const ProfileContent: FC = () => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showWish, setShowWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);
    const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);

    const wishListRef = useRef<HTMLDivElement>(null);

    const { profileId } = useParams<{ profileId: string }>();

    const profilePageT = useTranslations('profile-page');
    const alertsT = useTranslations('alerts');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

    const wishes = useWishesStore((state) => state.list);
    const wishesCreator = useWishesStore((state) => state.creator);
    const status = useWishesStore((state) => state.status);
    const page = useWishesStore((state) => state.page);
    const search = useWishesStore((state) => state.search);
    const sort = useWishesStore((state) => state.sort);
    const stopRequests = useWishesStore((state) => state.stopRequests);
    const addWishList = useWishesStore((state) => state.addWishList);

    const { getInitialWishList } = UseInitialWishes();

    const handleEditAccount = () => {
        setShowEdit(true);
    };

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
                    userId: profileId,
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
        getInitialWishList(myUser?.id, profileId).finally();
    }, [profileId]);

    return (
        <div className="px-3 pb-5 pt-4">
            <div className="flex items-center justify-between gap-2 mobile-xs:gap-3">
                <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {profilePageT(
                        profileId === myUser?.id ? 'my-profile' : 'user-profile'
                    )}
                </p>

                {!showEdit && profileId === myUser?.id && (
                    <UiButton onBtnClick={handleEditAccount}>
                        {profilePageT('edit')}

                        <EditIcon classes="w-5 h-5 fill-zinc-800" />
                    </UiButton>
                )}
            </div>

            {showEdit ? (
                <>
                    <EditProfile cancel={() => setShowEdit(false)} />

                    {profileId === myUser?.id && (
                        <ChangePassword
                            userId={myUser?.id}
                            cancel={() => setShowEdit(false)}
                        />
                    )}
                </>
            ) : (
                <DetailProfile />
            )}

            {!showEdit && (
                <>
                    <p>{profilePageT('wish-list-title')}</p>

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
                            <ul className="grid grid-cols-2 gap-1.5 tablet-xl:grid-cols-3 tablet-xl:gap-4 desktop-xl:grid-cols-4 desktop-2xl:grid-cols-5">
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
                                        display: stopRequests
                                            ? 'none'
                                            : 'block',
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
                </>
            )}
        </div>
    );
};

export default ProfileContent;

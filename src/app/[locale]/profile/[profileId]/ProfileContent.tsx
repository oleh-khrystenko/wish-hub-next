'use client';

import { FC, useState, useRef, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useInView } from 'react-intersection-observer';
import { IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { useWishesStore } from '@/stores/wishes';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import { WISHES_PAGINATION_LIMIT } from '@/helpers/utils/constants';
import EditProfile from '@/app/[locale]/profile/[profileId]/EditProfile';
import ChangePassword from '@/app/[locale]/profile/[profileId]/ChangePassword';
import DetailProfile from '@/app/[locale]/profile/[profileId]/DetailProfile';
import DeleteMyUserConfirmModal from '@/app/[locale]/profile/[profileId]/DeleteMyUserConfirmModal';
import WishItem from '@/components/layouts/wish-list/WishItem';
import WishListFilter from '@/components/layouts/wish-list/WishListFilter';
import WishListActions from '@/components/layouts/wish-list/WishListActions';
import DetailWish from '@/components/layouts/detail-wish/DetailWish';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiButton from '@/components/ui/UiButton';
import UiLoading from '@/components/ui/UiLoading';
import UiModal from '@/components/ui/UiModal';
import EditIcon from '@/components/icons/EditIcon';
import PersonIcon from '@/components/icons/PersonIcon';

const ProfileContent: FC = () => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showWish, setShowWish] = useState<boolean>(false);
    const [idOfSelectedWish, setIdOfSelectedWish] = useState<
        IWish['id'] | null
    >(null);
    const [showConfirmDeleteMyUser, setShowConfirmDeleteMyUser] =
        useState<boolean>(false);
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

    const pages = [
        {
            href: 'profile',
            icon: PersonIcon,
            name: profilePageT('profile'),
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
        <div className="pt-3">
            <Breadcrumbs pages={pages} />

            <div className="mt-3 px-3 pb-5">
                <div className="flex items-center justify-between gap-2 mobile-xs:gap-3">
                    <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                        {profilePageT(
                            profileId === myUser?.id
                                ? 'my-profile'
                                : 'user-profile'
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
                            <>
                                <ChangePassword userId={myUser?.id} />

                                <div className="ml-auto mt-6 w-fit">
                                    <UiButton
                                        type="button"
                                        variant="text-attention"
                                        onBtnClick={() =>
                                            setShowConfirmDeleteMyUser(true)
                                        }
                                    >
                                        {profilePageT('delete-account')}
                                    </UiButton>
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <DetailProfile />
                )}

                {!showEdit && (
                    <>
                        <p className="my-6 text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                            {profilePageT('wish-list-title')}
                        </p>

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
                                            showWish={() =>
                                                handleShowWish(wish.id)
                                            }
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

                <GoogleOAuthProvider
                    clientId={
                        process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
                            ? process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID
                            : ''
                    }
                >
                    <DeleteMyUserConfirmModal
                        show={showConfirmDeleteMyUser}
                        hid={() => setShowConfirmDeleteMyUser(false)}
                    />
                </GoogleOAuthProvider>
            </div>
        </div>
    );
};

export default ProfileContent;

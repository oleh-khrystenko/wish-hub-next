'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import EditProfile from '@/app/[locale]/user/[userId]/profile/EditProfile';
import ChangePassword from '@/app/[locale]/user/[userId]/profile/ChangePassword';
import DetailProfile from '@/app/[locale]/user/[userId]/profile/DetailProfile';
import DeleteMyUserConfirmModal from '@/app/[locale]/user/[userId]/profile/DeleteMyUserConfirmModal';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import WishList from '@/components/layouts/wish-list/WishList';
import Inactivated from '@/components/layouts/Inactivated';
import UiButton from '@/components/ui/UiButton';
import EditIcon from '@/components/icons/EditIcon';
import PersonIcon from '@/components/icons/PersonIcon';
import MainIcon from '@/components/icons/MainIcon';

const Body: FC = () => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showConfirmDeleteMyUser, setShowConfirmDeleteMyUser] =
        useState<boolean>(false);

    const { userId } = useParams<{ userId: string }>();

    const profilePageT = useTranslations('profile-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const breadcrumbsPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: `user/${selectedUserId}/profile`,
            icon: (
                <PersonIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('profile'),
        },
    ];

    return (
        <main className="mx-auto max-w-7xl pt-3">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-3 px-3 pb-5 desktop-sm:px-0">
                <div className="flex items-center justify-between gap-2 mobile-xs:gap-3">
                    <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                        {profilePageT(
                            userId === myUser?.id
                                ? 'my-profile'
                                : 'user_profile'
                        )}
                    </h1>

                    {!showEdit && userId === myUser?.id && (
                        <UiButton onBtnClick={() => setShowEdit(true)}>
                            {profilePageT('edit')}

                            <EditIcon classes="w-5 h-5 fill-zinc-800" />
                        </UiButton>
                    )}
                </div>

                {showEdit ? (
                    <>
                        <EditProfile cancel={() => setShowEdit(false)} />

                        {userId === myUser?.id && (
                            <>
                                <ChangePassword userId={myUser?.id} />

                                <div className="ml-auto mt-6 w-fit">
                                    <UiButton
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

                        <WishList userId={userId} currentPage="profile" />
                    </>
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

            {myUser && !myUser.isActivated && <Inactivated />}
        </main>
    );
};

export default Body;

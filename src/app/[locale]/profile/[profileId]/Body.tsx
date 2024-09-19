'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useMyUserStore } from '@/stores/my-user';
import EditProfile from '@/app/[locale]/profile/[profileId]/EditProfile';
import ChangePassword from '@/app/[locale]/profile/[profileId]/ChangePassword';
import DetailProfile from '@/app/[locale]/profile/[profileId]/DetailProfile';
import DeleteMyUserConfirmModal from '@/app/[locale]/profile/[profileId]/DeleteMyUserConfirmModal';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import WishList from '@/components/layouts/wish-list/WishList';
import Inactivated from '@/components/layouts/Inactivated';
import UiButton from '@/components/ui/UiButton';
import EditIcon from '@/components/icons/EditIcon';
import PersonIcon from '@/components/icons/PersonIcon';

const Body: FC = () => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [showConfirmDeleteMyUser, setShowConfirmDeleteMyUser] =
        useState<boolean>(false);

    const { profileId } = useParams<{ profileId: string }>();

    const profilePageT = useTranslations('profile-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const breadcrumbsPages = [
        {
            href: 'profile',
            icon: (
                <PersonIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: profilePageT('profile'),
        },
    ];

    return (
        <main className="mx-auto max-w-7xl pt-3">
            <Breadcrumbs pages={breadcrumbsPages} />

            <div className="mt-3 px-3 pb-5 desktop-sm:px-0">
                <div className="flex items-center justify-between gap-2 mobile-xs:gap-3">
                    <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                        {profilePageT(
                            profileId === myUser?.id
                                ? 'my-profile'
                                : 'user-profile'
                        )}
                    </h1>

                    {!showEdit && profileId === myUser?.id && (
                        <UiButton onBtnClick={() => setShowEdit(true)}>
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

                        <WishList userId={profileId} />
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

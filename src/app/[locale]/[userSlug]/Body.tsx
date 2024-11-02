'use client';

import { FC, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IPageParams } from '@/models/Settings';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import { USER_SLUG_TO_ID_MAP } from '@/helpers/utils/constants';
import DetailProfile from '@/app/[locale]/user/[userId]/profile/DetailProfile';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiButton from '@/components/ui/UiButton';
import PersonIcon from '@/components/icons/PersonIcon';
import MainIcon from '@/components/icons/MainIcon';

const Body: FC = () => {
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const { userSlug } = useParams<IPageParams['params']>();

    const profilePageT = useTranslations('profile-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const getUser = useUsersStore((state) => state.getUser);

    const breadcrumbsPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: `user/${userSlug}/profile`,
            icon: (
                <PersonIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('profile'),
        },
    ];

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!myUser || !userSlug) return;

        getUser(
            { userId: USER_SLUG_TO_ID_MAP[userSlug], myUserId: myUser.id },
            allPagesT('users-api.get-user.error')
        ).finally();
    }, [firstLoad]);

    return (
        <main className="mx-auto w-full max-w-7xl pt-3">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-3 px-3 pb-5 desktop-sm:px-0">
                <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                    {profilePageT(
                        userSlug && USER_SLUG_TO_ID_MAP[userSlug] === myUser?.id
                            ? 'my-profile'
                            : 'user_profile'
                    )}
                </h1>

                <DetailProfile />

                <div className="mt-6 w-fit">
                    <UiButton href={`${userSlug}/collection`}>
                        {profilePageT('user_collection')}
                    </UiButton>
                </div>
            </div>
        </main>
    );
};

export default Body;

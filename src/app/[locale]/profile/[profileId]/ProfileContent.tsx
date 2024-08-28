'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';

const ProfileContent: FC = () => {
    const { profileId } = useParams<{ profileId: string }>();

    const profilePageT = useTranslations('profile-page');

    const myUser = useMyUserStore((state) => state.myUser);

    return (
        <div>
            <span className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
                {profilePageT(
                    profileId === myUser?.id ? 'my-profile' : 'user-profile'
                )}
            </span>
        </div>
    );
};

export default ProfileContent;

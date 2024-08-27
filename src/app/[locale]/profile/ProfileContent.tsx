'use client';

import { FC } from 'react';
import { useUsersStore } from '@/stores/users';

const ProfileContent: FC = () => {
    const profileId = useUsersStore((state) => state.profileId);

    return (
        <div className="text-zinc-700 dark:text-zinc-300">
            ProfileContent: {profileId}
        </div>
    );
};

export default ProfileContent;

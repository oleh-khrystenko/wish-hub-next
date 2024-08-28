'use client';

import { FC } from 'react';
import { useParams } from 'next/navigation';

const ProfileContent: FC = () => {
    const { profileId } = useParams<{ profileId: string }>();

    return (
        <div className="text-zinc-700 dark:text-zinc-300">
            ProfileContent: {profileId}
        </div>
    );
};

export default ProfileContent;

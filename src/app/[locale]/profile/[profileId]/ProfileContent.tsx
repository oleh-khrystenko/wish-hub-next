'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import EditIcon from '@/components/icons/EditIcon';
import UiButton from '@/components/ui/UiButton';
import EditProfile from '@/app/[locale]/profile/[profileId]/EditProfile';

const ProfileContent: FC = () => {
    const [showEdit, setShowEdit] = useState<boolean>(false);

    const { profileId } = useParams<{ profileId: string }>();

    const profilePageT = useTranslations('profile-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const handleEditAccount = () => {
        setShowEdit(true);
    };

    return (
        <div className="px-3 pb-5 pt-4">
            <div className="flex items-center justify-between gap-3">
                <p className="text-2xl font-bold text-zinc-700 dark:text-zinc-300">
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
                <EditProfile cancel={() => setShowEdit(false)} />
            ) : (
                <div>DetailProfile</div>
            )}
        </div>
    );
};

export default ProfileContent;

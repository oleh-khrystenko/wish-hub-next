'use client';

import { FC, useState, useEffect } from 'react';
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

const ProfileContent: FC = () => {
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [firstLoad, setFirstLoad] = useState<boolean>(true);

    const { profileId } = useParams<{ profileId: string }>();

    const profilePageT = useTranslations('profile-page');
    const alertsT = useTranslations('alerts');

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const myUser = useMyUserStore((state) => state.myUser);

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

    useEffect(() => {
        if (firstLoad) {
            setFirstLoad(false);
            return;
        }

        if (!inView || stopRequests) return;

        addWishList(
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
        ).finally();
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
        </div>
    );
};

export default ProfileContent;

'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ICandidateForWin, IUser } from '@/models/User';
import { useMyUserStore } from '@/stores/my-user';
import { INSTRUKTOR_WISH_HUB } from '@/helpers/utils/constants';
import candidatesForWinApi from '@/helpers/api/candidates-for-win';
import UiAvatar from '@/components/ui/UiAvatar';

const CandidatesForWin: FC = () => {
    const [candidates, setCandidates] = useState<ICandidateForWin[]>([]);

    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');

    const router = useRouter();

    const activeLocale = useLocale();

    const myUser = useMyUserStore((state) => state.myUser);

    const handleGoToProfilePage = (userId: IUser['id']) => {
        if (myUser?.id === INSTRUKTOR_WISH_HUB) {
            return router.push(`/${activeLocale}/user/${userId}/profile`);
        }
    };

    useEffect(() => {
        const fetchCandidates = async () => {
            const response = await candidatesForWinApi.getCandidatesForWin();
            setCandidates(response.data);
        };

        fetchCandidates().finally();
    }, []);

    return (
        <div className="mx-auto mt-10 w-full tablet-md:w-3/4 desktop-xs:mx-0 desktop-xs:w-full">
            <p className="text-xl font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-2xl">
                {rozigrashBazhanPageT('candidates')}:
            </p>

            {candidates.length > 0 && (
                <ul className="mt-5 flex max-h-96 flex-wrap items-center gap-x-4 gap-y-6 overflow-y-auto overflow-x-hidden pb-4 pr-3">
                    {candidates.map((candidate) => (
                        <li
                            key={candidate.invitedPerson.id}
                            className="w-full rounded-md border border-dashed border-zinc-500 dark:border-zinc-600 tablet-md:w-fit tablet-md:rounded-xl"
                            onClick={() => handleGoToProfilePage(candidate.id)}
                        >
                            <div className="relative flex h-full items-center gap-4 rounded-md border border-dashed border-transparent px-6 py-2 before:absolute before:inset-0 before:h-full before:w-full before:rounded-md before:bg-wish-bg before:bg-cover before:bg-center before:bg-no-repeat before:opacity-0 tablet-md:rounded-xl tablet-md:before:rounded-xl">
                                <span className="text-xl font-bold text-cyan-500 dark:text-cyan-300">
                                    {candidate.serialNumber}
                                </span>

                                <UiAvatar
                                    avatar={candidate.avatar}
                                    alt={candidate.firstName}
                                    size={40}
                                    sizeTailwind="w-10 min-w-10 h-10 min-h-10"
                                />

                                <p className="max-w-xs truncate whitespace-nowrap text-zinc-800 dark:text-zinc-200 tablet-md:text-lg">
                                    {candidate.firstName}
                                    {candidate.lastName && (
                                        <> {candidate.lastName.charAt(0)}.</>
                                    )}
                                </p>

                                <div className="absolute bottom-0 right-1 flex max-w-[80%] translate-y-1/2 items-center gap-3 rounded-md bg-zinc-300 px-2 py-1 dark:bg-zinc-800">
                                    <UiAvatar
                                        avatar={candidate.invitedPerson.avatar}
                                        alt={candidate.invitedPerson.firstName}
                                        size={24}
                                        sizeTailwind="w-6 min-w-6 h-6 min-h-6"
                                        sizeIcon="w-4 h-4"
                                    />

                                    <p className="truncate whitespace-nowrap text-xs text-zinc-800 dark:text-zinc-200 tablet-md:text-sm">
                                        {candidate.invitedPerson.firstName}
                                        {candidate.invitedPerson.lastName && (
                                            <>
                                                {' '}
                                                {candidate.invitedPerson.lastName.charAt(
                                                    0
                                                )}
                                                .
                                            </>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CandidatesForWin;

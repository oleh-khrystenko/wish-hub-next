'use client';

import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { ICandidateForWin, IUser } from '@/models/User';
import { useMyUserStore } from '@/stores/my-user';
import { ADMIN_IDS } from '@/helpers/utils/constants';
import candidatesForWinApi from '@/helpers/api/candidates-for-win';
import UiAvatar from '@/components/ui/UiAvatar';

const CandidatesForWin: FC = () => {
    const [candidates, setCandidates] = useState<ICandidateForWin[]>([]);

    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');

    const router = useRouter();

    const activeLocale = useLocale();

    const myUser = useMyUserStore((state) => state.myUser);

    const handleGoToProfilePage = (userId: IUser['id']) => {
        if (myUser && ADMIN_IDS.includes(myUser.id)) {
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
                            className={`${candidate.isActivated ? 'border-zinc-500 dark:border-zinc-600' : 'border-rose-500'} w-full rounded-md border border-dashed tablet-md:w-fit tablet-md:rounded-xl`}
                            onClick={() => handleGoToProfilePage(candidate.id)}
                        >
                            <div className="relative h-full px-6 py-2">
                                <div
                                    className={`${!candidate.isActivated && 'animate-blink'} flex items-center gap-4`}
                                >
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
                                            <>
                                                {' '}
                                                {candidate.lastName.charAt(0)}.
                                            </>
                                        )}
                                    </p>
                                </div>

                                <p
                                    className={`${candidate.isActivated ? 'opacity-0' : 'animate-blink-duration'} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-lg font-bold text-rose-500`}
                                >
                                    {rozigrashBazhanPageT('not_activated')}
                                </p>

                                <div
                                    className={`${candidate.invitedPerson.isActivated ? 'border-transparent' : 'border-rose-500'} absolute bottom-0 right-1 max-w-[80%] translate-y-1/2 rounded-md border border-dashed bg-zinc-300 px-3 py-1 dark:bg-zinc-800`}
                                >
                                    <div
                                        className={`${!candidate.invitedPerson.isActivated && 'animate-blink'} flex items-center gap-3`}
                                    >
                                        <UiAvatar
                                            avatar={
                                                candidate.invitedPerson.avatar
                                            }
                                            alt={
                                                candidate.invitedPerson
                                                    .firstName
                                            }
                                            size={24}
                                            sizeTailwind="w-6 min-w-6 h-6 min-h-6"
                                            sizeIcon="w-4 h-4"
                                        />

                                        <p className="truncate whitespace-nowrap text-xs text-zinc-800 dark:text-zinc-200 tablet-md:text-sm">
                                            {candidate.invitedPerson.firstName}
                                            {candidate.invitedPerson
                                                .lastName && (
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

                                    <p
                                        className={`${candidate.invitedPerson.isActivated ? 'opacity-0' : 'animate-blink-duration'} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xs font-bold leading-3 text-rose-500`}
                                    >
                                        {rozigrashBazhanPageT('not_activated')}
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

'use client';

import {FC} from "react";
import Image from 'next/image';
import { useUsersStore } from '@/stores/users';
import getFullName from '@/helpers/utils/get-full-name';
import AvatarIcon from '@/components/icons/AvatarIcon';
import UiButton from "@/components/ui/UiButton";

interface IProps {
    singInT: string;
    userNotFoundT: string;
}

const UserSetting: FC<IProps> = ({ singInT, userNotFoundT }) => {
    const myUser = useUsersStore((state) => state.myUser);

    const handleShowSetting = () => {
        console.log('handleShowSetting');
    }

    return (
        <div className="flex items-center justify-center gap-4">
            <UiButton href="auth" variant="text">
                <div className="flex flex-col items-end gap-1">
                    <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                        {getFullName(myUser, singInT)}
                    </span>

                    {myUser?.email && (
                        <span className="text-xs text-zinc-700 dark:text-zinc-400">
                            {myUser?.email}
                        </span>
                    )}
                </div>
            </UiButton>

            <button type="button" onClick={handleShowSetting}>
                <div className="h-11 w-11 min-w-11 overflow-hidden rounded-full bg-zinc-500 dark:bg-zinc-600 flex items-center justify-center">
                    {myUser?.avatar ? (
                        <Image
                            src={myUser?.avatar}
                            alt={getFullName(myUser, userNotFoundT)}
                            width={44}
                            height={44}
                        />
                    ) : (
                        <AvatarIcon />
                    )}
                </div>
            </button>
        </div>
    );
}

export default UserSetting;

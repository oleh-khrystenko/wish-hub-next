'use client';

import { useUsersStore } from '@/stores/users';
import Image from 'next/image';
import getFullName from '@/helpers/utils/get-full-name';
import AvatarIcon from '@/components/icons/AvatarIcon';

function UserSetting() {
    const myUser = useUsersStore((state) => state.myUser);

    return (
        <div className="flex items-center justify-center gap-4">
            <div>
                <span className="text-sm font-bold text-zinc-800 dark:text-zinc-300">
                    {getFullName(myUser)}
                </span>

                <span className="text-xs text-zinc-700 dark:text-zinc-400">
                    {myUser?.email}
                </span>
            </div>

            <div className="h-11 w-11 min-w-11 overflow-hidden rounded-full bg-zinc-600">
                {myUser?.avatar ? (
                    <img src={myUser?.avatar} alt={getFullName(myUser)} />
                ) : (
                    <AvatarIcon />
                )}
            </div>
        </div>
    );
}

export default UserSetting;

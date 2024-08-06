'use client';

import { useUsersStore } from '@/stores/users';

function UserSetting() {
    const myUser = useUsersStore((state) => state.myUser);
    console.log('myUser: ', myUser);

    return (
        <div className="text-zinc-800 dark:text-zinc-300">
            UserSetting: {myUser?.firstName}
        </div>
    );
}

export default UserSetting;

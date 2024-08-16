'use client';

import { FC, useMemo } from 'react';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import getFullName from '@/helpers/utils/get-full-name';
import WishList from '@/components/layouts/wish-list/WishList';
import { useTranslations } from 'next-intl';

const MainContent: FC = () => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);
    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const selectedUserFullName = useMemo(() => {
        const selectedUser = users.find((user) => user.id === selectedUserId);
        return getFullName(selectedUser, mainPageT('user_not_found'));
    }, [users, selectedUserId]);

    return (
        <div className="grow overflow-y-auto px-5 pb-5 pt-2">
            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-300">
                {myUser?.id === selectedUserId ? (
                    <>
                        {mainPageT('title-personal')}{' '}
                        {mainPageT('title-wishes')}
                    </>
                ) : (
                    <>
                        {mainPageT('Title-wishes')} {mainPageT('of-user')}{' '}
                        {selectedUserFullName}
                    </>
                )}
            </span>

            <WishList selectedUserFullName={selectedUserFullName} />
        </div>
    );
};

export default MainContent;

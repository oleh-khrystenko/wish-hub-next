'use client';

import { FC, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import UseFullName from '@/helpers/hooks/UseFullName';
import WishList from '@/components/layouts/wish-list/WishList';

const MainContent: FC = () => {
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);
    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const { getFullName } = UseFullName();

    const selectedUserFullName = useMemo(() => {
        const selectedUser = users.find((user) => user.id === selectedUserId);
        return getFullName(selectedUser);
    }, [users, selectedUserId]);

    return (
        <div className="flex grow flex-col pb-5 pl-3 pr-5 pt-2 tablet-md:w-3/4">
            <span className="pl-2.5 text-xl font-bold text-zinc-800 dark:text-zinc-300">
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

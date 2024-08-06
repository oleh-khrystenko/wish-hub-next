'use client';

import { FC } from 'react';
import { redirect } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useUsersStore } from '@/stores/users';

const ClientLogout: FC = () => {
    const myUser = useUsersStore((state) => state.myUser);

    const activeLocale = useLocale();

    if (!myUser) {
        redirect(`/${activeLocale}/auth`);
    }

    return <div className="text-zinc-800 dark:text-zinc-300">LogoutAction</div>;
};

export default ClientLogout;

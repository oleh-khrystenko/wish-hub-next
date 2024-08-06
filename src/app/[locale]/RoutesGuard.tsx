'use client';

import { FC, ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useUsersStore } from '@/stores/users';
import Loading from '@/components/layouts/Loading';

interface IProps {
    children: ReactNode;
}

const RoutesGuard: FC<IProps> = ({ children }) => {
    const [ready, setReady] = useState<boolean>(false);

    const myUser = useUsersStore((state) => state.myUser);
    const checkAuth = useUsersStore((state) => state.checkAuth);

    const activeLocale = useLocale();
    const router = useRouter();

    useEffect(() => {
        checkAuth()
            .then(() => setReady(true))
            .catch(() => setReady(false));
    }, [checkAuth]);

    useEffect(() => {
        if (ready && !myUser) {
            router.replace(`/${activeLocale}/`);
        }
    }, [ready, myUser, activeLocale, router]);

    if (!ready) {
        return <Loading />;
    }

    return children;
};

export default RoutesGuard;

'use client';

import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { useUsersStore } from '@/stores/users';
import Loading from '@/components/layouts/Loading';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
    isUnauthenticated?: boolean;
    children: ReactNode;
}

const RoutesGuard: FC<IProps> = ({ isUnauthenticated = false, children }) => {
    const [ready, setReady] = useState<boolean>(false);

    const myUser = useUsersStore((state) => state.myUser);
    const checkAuth = useUsersStore((state) => state.checkAuth);

    const activeLocale = useLocale();
    const router = useRouter();

    const hasCheckedAuth = useRef(false); // додано useRef

    useEffect(() => {
        if (ready || hasCheckedAuth.current) return;
        hasCheckedAuth.current = true;
        checkAuth()
            .then(() => setReady(true))
            .catch(() => setReady(false));
    }, []);

    useEffect(() => {
        if (ready && (isUnauthenticated ? myUser : !myUser)) {
            router.replace(`/${activeLocale}/`);
        }
    }, [ready, myUser, activeLocale, router, isUnauthenticated]);

    if (!ready || (isUnauthenticated ? myUser : !myUser)) {
        return <Loading />;
    }

    return (
        <>
            {children}
            <ToastContainer
                bodyClassName={() =>
                    'flex items-center text-sm font-bold text-zinc-800 dark:text-zinc-300'
                }
            />
        </>
    );
};

export default RoutesGuard;

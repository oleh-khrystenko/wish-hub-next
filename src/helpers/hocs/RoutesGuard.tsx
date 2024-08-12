'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import { useMyUserStore } from '@/stores/my-user';
import Loading from '@/components/layouts/Loading';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
    isUnauthenticated?: boolean;
    children: ReactNode;
}

const RoutesGuard: FC<IProps> = ({ isUnauthenticated = false, children }) => {
    const myUser = useMyUserStore((state) => state.myUser);

    const activeLocale = useLocale();
    const router = useRouter();

    useEffect(() => {
        if (isUnauthenticated ? myUser : !myUser) {
            router.replace(`/${activeLocale}/`);
        }
    }, [myUser, activeLocale, router, isUnauthenticated]);

    if (isUnauthenticated ? myUser : !myUser) {
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

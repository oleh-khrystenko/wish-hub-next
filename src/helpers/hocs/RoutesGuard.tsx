'use client';

import { FC, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import Loading from '@/components/layouts/Loading';

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
            router.replace(`/${activeLocale}/main`);
        }
    }, [myUser, activeLocale, router, isUnauthenticated]);

    if (isUnauthenticated ? myUser : !myUser) {
        return <Loading />;
    }

    return children;
};

export default RoutesGuard;

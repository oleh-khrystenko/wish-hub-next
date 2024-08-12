'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useMyUserStore } from '@/stores/my-user';
import Loading from '@/components/layouts/Loading';

interface IProps {
    children: ReactNode;
}

const Refresh: FC<IProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refresh = useMyUserStore((state) => state.refresh);

    const hasCheckedAuth = useRef(false);

    useEffect(() => {
        setIsLoading(true);
        if (hasCheckedAuth.current) return;
        hasCheckedAuth.current = true;
        refresh().finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return children;
};

export default Refresh;

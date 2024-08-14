'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useMyUserStore } from '@/stores/my-user';
import Loading from '@/components/layouts/Loading';
import 'react-toastify/dist/ReactToastify.css';

interface IProps {
    refreshT: string;
    children: ReactNode;
}

const Refresh: FC<IProps> = ({ refreshT, children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refresh = useMyUserStore((state) => state.refresh);

    const refreshed = useRef(false);

    useEffect(() => {
        setIsLoading(true);
        if (refreshed.current) return;
        refreshed.current = true;
        refresh(refreshT).finally(() => setIsLoading(false));
    }, []);

    if (isLoading) {
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

export default Refresh;

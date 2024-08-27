'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMyUserStore } from '@/stores/my-user';
import UiLoading from '@/components/ui/UiLoading';

interface IProps {
    children: ReactNode;
}

const Refresh: FC<IProps> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refreshed = useRef(false);

    const alertsT = useTranslations('alerts');

    const refresh = useMyUserStore((state) => state.refresh);

    useEffect(() => {
        setIsLoading(true);
        if (refreshed.current) return;
        refreshed.current = true;
        refresh(alertsT('my-user-api.refresh.error')).finally(() =>
            setIsLoading(false)
        );
    }, []);

    if (isLoading) {
        return <UiLoading />;
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

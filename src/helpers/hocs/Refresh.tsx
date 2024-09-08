'use client';

import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useMyUserStore } from '@/stores/my-user';
import UiLoading from '@/components/ui/UiLoading';
import {
    checkNotificationSubscription,
    requestNotificationPermission,
} from '@/helpers/utils/notification-manager';

interface IProps {
    withoutLoading?: boolean;
    children: ReactNode;
}

const Refresh: FC<IProps> = ({ withoutLoading, children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refreshed = useRef(false);

    const alertsT = useTranslations('alerts');

    const myUserId = useMyUserStore((state) => state.myUser?.id);
    const refresh = useMyUserStore((state) => state.refresh);

    useEffect(() => {
        const registerServiceWorker = () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then((registration) => {
                    console.log(
                        'Service Worker registered with scope:',
                        registration.scope
                    );
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        };

        if ('serviceWorker' in navigator) {
            // Перевірка, чи документ вже завантажено
            if (document.readyState === 'complete') {
                // Якщо так, реєструємо відразу
                registerServiceWorker();
            } else {
                // Інакше чекаємо події load
                window.addEventListener('load', registerServiceWorker);
            }
        }

        return () => {
            window.removeEventListener('load', registerServiceWorker);
        };
    }, []);

    useEffect(() => {
        setIsLoading(true);

        if (refreshed.current) return;
        refreshed.current = true;

        refresh(alertsT('my-user-api.refresh.error'))
            .then(() => {
                if (myUserId) {
                    // Перевірка підписки на повідомлення
                    checkNotificationSubscription(
                        myUserId,
                        alertsT('my-user-api.notification-unsubscribe.error')
                    ).finally();
                }
            })
            .finally(() => setIsLoading(false));
    }, [myUserId]);

    useEffect(() => {
        // Запитуємо дозвіл на повідомлення, якщо користувач не підписаний
        if (myUserId) {
            requestNotificationPermission(
                myUserId,
                alertsT('my-user-api.notification-subscribe.error')
            ).finally();
        }
    }, [myUserId]);

    if (isLoading && !withoutLoading) {
        return <UiLoading />;
    }

    return (
        <>
            {!isLoading && <>{children}</>}
            <ToastContainer
                bodyClassName={() =>
                    'flex items-center text-sm font-bold text-zinc-800 dark:text-zinc-300'
                }
            />
        </>
    );
};

export default Refresh;

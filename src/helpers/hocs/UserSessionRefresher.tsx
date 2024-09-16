'use client';

import { FC, ReactNode, useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import {
    checkNotificationSubscription,
    requestNotificationPermission,
} from '@/helpers/utils/notification-manager';
import UiLoading from '@/components/ui/UiLoading';

interface IProps {
    withoutLoading?: boolean;
    children: ReactNode;
}

const UserSessionRefresher: FC<IProps> = ({ withoutLoading, children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refreshed = useRef(false);

    const alertsT = useTranslations('alerts');

    const refresh = useMyUserStore((state) => state.refresh);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    useEffect(() => {
        setShowGlobalLoading(false);

        if (refreshed.current) return;
        refreshed.current = true;

        setIsLoading(true);

        const initializeUserSession = async () => {
            const user = await refresh(alertsT('my-user-api.refresh.error'));

            if (!user) return;

            checkNotificationSubscription(user.id).finally();
            requestNotificationPermission(user.id).finally();
        };

        initializeUserSession().finally(() => setIsLoading(false));
    }, []);

    if (isLoading && !withoutLoading) {
        return <UiLoading />;
    }

    return !isLoading && <>{children}</>;
};

export default UserSessionRefresher;

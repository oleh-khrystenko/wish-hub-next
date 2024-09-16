'use client';

import { FC, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import {
    checkNotificationSubscription,
    requestNotificationPermission,
} from '@/helpers/utils/notification-manager';

const UserSessionRefresher: FC = () => {
    const refreshed = useRef(false);

    const alertsT = useTranslations('alerts');

    const refresh = useMyUserStore((state) => state.refresh);

    useEffect(() => {
        if (refreshed.current) return;
        refreshed.current = true;

        const initializeUserSession = async () => {
            const user = await refresh(alertsT('my-user-api.refresh.error'));

            if (!user) return;

            checkNotificationSubscription(user.id).finally();
            requestNotificationPermission(user.id).finally();
        };

        initializeUserSession().finally();
    }, []);

    return null;
};

export default UserSessionRefresher;

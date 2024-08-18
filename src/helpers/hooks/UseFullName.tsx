'use client';

import { IUser } from '@/models/User';
import { useTranslations } from 'next-intl';

const UseFullName = () => {
    const mainPageT = useTranslations('main-page');

    const getFullName = (user: IUser | null | undefined): string => {
        if (!user) return mainPageT('user_not_found');

        return user.firstName + (user.lastName ? ` ${user.lastName}` : '');
    };

    return { getFullName };
};

export default UseFullName;

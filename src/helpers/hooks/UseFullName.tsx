'use client';

import { IUser } from '@/models/user';
import { useTranslations } from 'next-intl';

const UseFullName = () => {
    const allPagesT = useTranslations('all-pages');

    const getFullName = (user: IUser | null | undefined): string => {
        if (!user) return allPagesT('guest');

        return user.firstName + (user.lastName ? ` ${user.lastName}` : '');
    };

    return { getFullName };
};

export default UseFullName;

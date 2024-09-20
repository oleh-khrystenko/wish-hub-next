'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import UiButton from '@/components/ui/UiButton';
import LogoutIcon from '@/components/icons/LogoutIcon';

const Body: FC = () => {
    const activationLinkExpiredPageT = useTranslations(
        'activation-link-expired-page'
    );
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const logout = useMyUserStore((state) => state.logout);

    const handleLogout = async () => {
        await logout(allPagesT('my-user-api.logout.error'));
    };

    return (
        <div className="flex w-full max-w-lg grow flex-col items-center justify-center gap-12">
            <p className="text-center text-zinc-700 dark:text-zinc-300">
                {activationLinkExpiredPageT('expired')}
                <br />
                {activationLinkExpiredPageT('utc')}
                <br />
                {activationLinkExpiredPageT('again')}
            </p>

            <UiButton onBtnClick={handleLogout}>
                <LogoutIcon classes="w-6 h-6 stroke-zinc-800" />
                {mainPageT('logout')}
            </UiButton>
        </div>
    );
};

export default Body;

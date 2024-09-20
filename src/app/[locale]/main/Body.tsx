'use client';

import { FC, useMemo, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import UseFullName from '@/helpers/hooks/UseFullName';
import { useInstallPWA } from '@/helpers/hooks/useInstallPWA';
import WishList from '@/app/[locale]/main/WishList';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import Inactivated from '@/components/layouts/Inactivated';
import UiModal from '@/components/ui/modal/UiModal';
import UiBrand from '@/components/ui/UiBrand';
import UiButton from '@/components/ui/UiButton';
import InstallIcon from '@/components/icons/InstallIcon';
import MainIcon from '@/components/icons/MainIcon';

const Body: FC = () => {
    const activeLocale = useLocale();
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const { getFullName } = UseFullName();
    const {
        installPWAPrompt,
        neverInstallPWA,
        handleHideModal,
        handleNeverShowInstallation,
        handleInstallPWA,
    } = useInstallPWA();

    const breadcrumbsPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('main'),
        },
    ];

    const selectedUserFullName = useMemo(() => {
        const selectedUser = users.find((user) => user.id === selectedUserId);
        return getFullName(selectedUser);
    }, [users, selectedUserId]);

    return (
        <>
            <div className="relative flex w-full grow flex-col pl-1 pr-2 pt-2 tablet-md:w-2/3 tablet-md:pb-5 tablet-xl:w-3/4">
                <div className="-ml-2 flex items-center justify-between py-1 tablet-md:hidden">
                    <UiBrand withLogo logoId="brand-logo-top" />
                </div>

                <Breadcrumbs
                    seoPages={breadcrumbsPages}
                    visualPages={breadcrumbsPages}
                />

                <div className="mb-6 mt-2 pl-2.5">
                    {selectedUserId ? (
                        <>
                            {myUser?.id === selectedUserId ? (
                                <h1 className="text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                                    {mainPageT('my_wishes')}
                                </h1>
                            ) : (
                                <h1 className="flex max-w-full flex-wrap items-center">
                                    <span className="mr-1 min-h-7 whitespace-nowrap text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                                        {mainPageT('wishes_of_user')}
                                    </span>
                                    <span className="min-h-7 max-w-full truncate pr-0.5 text-base font-bold italic text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                                        {selectedUserFullName}
                                    </span>
                                </h1>
                            )}
                        </>
                    ) : (
                        <h1 className="text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                            {mainPageT('wishes_of_users')}
                        </h1>
                    )}
                </div>

                <WishList selectedUserFullName={selectedUserFullName} />
            </div>

            <UiModal
                rounded="rounded-2xl"
                show={installPWAPrompt !== null && !neverInstallPWA}
                hide={handleHideModal}
            >
                <p className="pr-9 text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-lg">
                    {mainPageT('pwa.text_before')}{' '}
                    <span className="whitespace-nowrap">Wish Hub</span>{' '}
                    {mainPageT('pwa.text_after')}
                </p>

                <div className="mt-4 flex flex-col items-end justify-end gap-2 mobile-sm:flex-row">
                    <div className="-mr-4 mobile-sm:mr-0">
                        <UiButton
                            variant="text-attention"
                            onBtnClick={handleNeverShowInstallation}
                        >
                            {mainPageT('pwa.never_show')}
                        </UiButton>
                    </div>

                    <UiButton onBtnClick={handleInstallPWA}>
                        <InstallIcon classes="w-6 h-6 fill-zinc-800" />
                        {mainPageT('pwa.install')}
                    </UiButton>
                </div>
            </UiModal>

            {myUser && !myUser.isActivated && <Inactivated />}
        </>
    );
};

export default Body;

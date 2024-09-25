'use client';

import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
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
    const mainPageT = useTranslations('main-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

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

    return (
        <>
            <div className="relative flex w-full grow flex-col pl-1 pr-2 pt-2 tablet-md:w-2/3 tablet-md:pb-5 tablet-md:pt-0 tablet-xl:w-3/4">
                <div className="-ml-2 flex items-center justify-between py-1 tablet-md:hidden">
                    <UiBrand withLogo disabled logoId="brand-logo-top" />
                </div>

                <Breadcrumbs
                    seoPages={breadcrumbsPages}
                    visualPages={breadcrumbsPages}
                    isMainPage
                />

                <WishList />
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

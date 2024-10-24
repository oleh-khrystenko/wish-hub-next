'use client';

import { FC } from 'react';
import Actions from '@/app/[locale]/root-page-components/Actions';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import UiBrand from '@/components/ui/UiBrand';
import UseScreenWidth from '@/helpers/hooks/UseScreenWidth';

const Header: FC = () => {
    const { screenWidth } = UseScreenWidth();

    return (
        <header className="absolute -left-4 right-0 top-0 flex items-center justify-between gap-4 py-4 tablet-md:px-0 tablet-md:py-6">
            <UiBrand withLogo disabled />

            <div className="flex items-center gap-10">
                <ThemeSwitcher />

                <div className="fixed inset-x-0 bottom-0 z-40 flex flex-wrap justify-around gap-1.5 bg-zinc-100 px-3.5 py-2 dark:bg-zinc-900 mobile-xs:items-center mobile-xs:justify-between mobile-sm:gap-4 mobile-sm:px-4 tablet-md:static tablet-md:bg-transparent tablet-md:p-0 tablet-md:dark:bg-transparent">
                    <LangSelect
                        withoutText={screenWidth < 412}
                        expandTop={screenWidth < 768}
                    />

                    <Actions />
                </div>
            </div>
        </header>
    );
};

export default Header;

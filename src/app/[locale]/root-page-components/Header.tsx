import { FC } from 'react';
import Actions from '@/app/[locale]/root-page-components/Actions';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import UiBrand from '@/components/ui/UiBrand';

const Header: FC = () => {
    return (
        <header className="-ml-4 flex items-center justify-between gap-4 py-4 tablet-md:px-0 tablet-md:py-6">
            <UiBrand withLogo />

            <div className="flex items-center gap-10">
                <ThemeSwitcher />

                <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-5 bg-zinc-100 px-3.5 py-2 dark:bg-zinc-900 tablet-md:static tablet-md:gap-10 tablet-md:bg-transparent tablet-md:p-0 tablet-md:dark:bg-transparent">
                    <LangSelect />

                    <Actions />
                </div>
            </div>
        </header>
    );
};

export default Header;

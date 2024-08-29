'use client';

import { FC } from 'react';
import { useSettingsStore } from '@/stores/settings';
import Menu from '@/components/layouts/header/Menu';
import UiBrand from '@/components/ui/UiBrand';

interface IProps {
    isMainPage?: boolean;
}

const Header: FC<IProps> = ({ isMainPage }) => {
    const activatedBurgerMenu = useSettingsStore(
        (state) => state.activatedBurgerMenu
    );

    return (
        <header
            className={`${activatedBurgerMenu ? 'scale-x-100' : 'scale-x-0'} fixed left-0 right-0 top-0 z-40 flex w-full origin-left items-center justify-between gap-4 rounded-lg bg-zinc-300 py-2 pl-1 pr-5 transition-all duration-300 ease-in-out dark:bg-zinc-800 tablet-md:relative tablet-md:scale-x-100`}
        >
            <div className="hidden tablet-md:block">
                <UiBrand
                    withLogo
                    isMainPage={isMainPage}
                    bgLoading="bg-zinc-300 dark:bg-zinc-800"
                />
            </div>

            <Menu isMainPage={isMainPage} />
        </header>
    );
};

export default Header;

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

    let classes = 'relative pr-3 tablet-md:pr-5 tablet-md:pl-1';
    isMainPage &&
        (classes = `${activatedBurgerMenu ? 'scale-x-100' : 'scale-x-0'} fixed pl-1 pr-5 left-0 right-0 top-0 origin-left tablet-md:relative tablet-md:scale-x-100`);

    return (
        <header
            className={`${classes} z-40 flex w-full items-center justify-between rounded-lg bg-zinc-300 py-2 transition-all duration-300 ease-in-out dark:bg-zinc-800 tablet-md:gap-4`}
        >
            <div
                className={
                    isMainPage
                        ? 'hidden tablet-md:block'
                        : '-ml-1 tablet-md:ml-0'
                }
            >
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

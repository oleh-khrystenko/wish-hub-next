'use client';

import { FC } from 'react';
import Menu from '@/components/layouts/header/Menu';
import UiBrand from '@/components/ui/UiBrand';

interface IProps {
    isMainPage?: boolean;
}

const Header: FC<IProps> = ({ isMainPage }) => {
    return (
        <header
            className={`${isMainPage ? 'hidden tablet-md:block' : 'mx-auto block max-w-7xl'} sticky top-0 z-40 w-full rounded-b-lg bg-zinc-200 px-1 pt-1 dark:bg-zinc-900 desktop-sm:p-0`}
        >
            <div
                className={`${isMainPage ? 'pl-1 pr-5' : 'pr-3 tablet-md:pl-1 tablet-md:pr-5'} flex items-center justify-between gap-2 rounded-lg bg-zinc-300 py-2 dark:bg-zinc-800 tablet-md:gap-4`}
            >
                <div
                    className={
                        isMainPage
                            ? 'hidden tablet-md:block'
                            : '-ml-1 tablet-md:ml-0'
                    }
                >
                    <UiBrand disabled={isMainPage} withLogo />
                </div>

                <Menu isMainPage={isMainPage} />
            </div>
        </header>
    );
};

export default Header;

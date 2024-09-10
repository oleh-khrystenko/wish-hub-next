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
            className={`${isMainPage ? 'hidden pl-1 pr-5 tablet-md:flex' : 'flex pr-3 tablet-md:pl-1 tablet-md:pr-5'} relative z-40 w-full items-center justify-between rounded-lg bg-zinc-300 py-2 transition-all duration-300 ease-in-out dark:bg-zinc-800 tablet-md:gap-4`}
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

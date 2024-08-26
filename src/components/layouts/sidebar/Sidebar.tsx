'use client';

import { useTranslations } from 'next-intl';
import UserList from '@/components/layouts/sidebar/UserList';
import { useSettingsStore } from '@/stores/settings';

function Sidebar() {
    const mainPageT = useTranslations('main-page');

    const activatedBurgerMenu = useSettingsStore(
        (state) => state.activatedBurgerMenu
    );

    return (
        <div
            className={`${activatedBurgerMenu ? 'scale-x-100' : 'scale-x-0'} fixed bottom-0 left-0 top-0 z-30 flex w-full origin-left scale-x-0 flex-col rounded-lg bg-zinc-300 px-3 py-2 pt-16 transition-all duration-300 ease-in-out dark:bg-zinc-800 tablet-md:static tablet-md:w-1/3 tablet-md:scale-x-100 tablet-md:pt-3 tablet-xl:w-1/4`}
        >
            <span className="mb-4 shrink-0 text-xl font-bold text-zinc-800 dark:text-zinc-300">
                {mainPageT('users')}
            </span>

            <UserList />
        </div>
    );
}

export default Sidebar;

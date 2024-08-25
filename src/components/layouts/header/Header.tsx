'use client';

import UserSetting from '@/components/layouts/header/UserSetting';
import UiBrand from '@/components/ui/UiBrand';
import { useSettingsStore } from '@/stores/settings';

function Header() {
    const activatedBurgerMenu = useSettingsStore(
        (state) => state.activatedBurgerMenu
    );

    return (
        <header
            className={`${activatedBurgerMenu ? 'scale-x-100' : 'scale-x-0'} fixed left-0 right-0 top-0 z-40 flex w-full origin-left items-center justify-between gap-4 rounded-lg bg-zinc-300 py-2 pl-1 pr-5 transition-all duration-300 ease-in-out dark:bg-zinc-800 tablet-md:static tablet-md:scale-x-100`}
        >
            <div className="hidden tablet-md:block">
                <UiBrand isMainPage />
            </div>

            <UserSetting logoutWithUpdate />
        </header>
    );
}

export default Header;

'use client';

import { useTranslations } from 'next-intl';
import { useSettingsStore } from '@/stores/settings';
import UserList from '@/app/[locale]/main/sidebar/UserList';
import CrossIcon from '@/components/icons/CrossIcon';

function Sidebar() {
    const mainPageT = useTranslations('main-page');

    const activatedSidebar = useSettingsStore(
        (state) => state.activatedSidebar
    );
    const setActivatedSidebar = useSettingsStore(
        (state) => state.setActivatedSidebar
    );

    return (
        <div
            className={`${activatedSidebar ? 'scale-x-100' : 'scale-x-0'} fixed bottom-16 left-0 top-0 z-30 flex w-full origin-left scale-x-0 flex-col bg-zinc-300 p-3 transition-all duration-300 ease-in-out dark:bg-zinc-800 tablet-md:static tablet-md:w-1/3 tablet-md:scale-x-100 tablet-md:rounded-r-lg tablet-xl:w-1/4`}
        >
            <p className="mb-4 flex shrink-0 items-center justify-between text-xl font-bold text-zinc-800 dark:text-zinc-300">
                {mainPageT('users')}

                <button
                    className="tablet-md:hidden"
                    type="button"
                    onClick={() => setActivatedSidebar(!activatedSidebar)}
                >
                    <CrossIcon classes="w-10 h-10 stroke-zinc-800 dark:stroke-zinc-300" />
                </button>
            </p>

            <UserList />
        </div>
    );
}

export default Sidebar;

'use client';

import { FC } from 'react';
import { useSettingsStore } from '@/stores/settings';
import Menu from '@/components/layouts/header/Menu';
import PeopleIcon from '@/components/icons/PeopleIcon';

const BottomMenu: FC = () => {
    const showSidebar = useSettingsStore((state) => state.showSidebar);
    const setShowSidebar = useSettingsStore((state) => state.setShowSidebar);

    return (
        <div className="flex items-center justify-between bg-zinc-100 px-6 py-2.5 dark:bg-zinc-700 tablet-md:hidden">
            <button type="button" onClick={() => setShowSidebar(!showSidebar)}>
                <PeopleIcon
                    classes={`${showSidebar ? 'fill-cyan-400 dark:fill-cyan-300' : 'fill-zinc-800 dark:fill-zinc-300'} w-10 h-10`}
                />
            </button>

            <Menu isMainPage showPopupUp logoIconId="menu" />
        </div>
    );
};

export default BottomMenu;

'use client';

import { FC } from 'react';
import { useSettingsStore } from '@/stores/settings';
import Sidebar from '@/app/[locale]/main/sidebar/Sidebar';
import Content from '@/app/[locale]/main/Content';
import UiLoading from '@/components/ui/UiLoading';

const Body: FC = () => {
    const showGlobalLoading = useSettingsStore(
        (state) => state.showGlobalLoading
    );

    return (
        <>
            <main className="flex grow overflow-hidden">
                <Sidebar />

                <Content />
            </main>

            {showGlobalLoading && (
                <UiLoading bg="bg-zinc-300 dark:bg-zinc-800" />
            )}
        </>
    );
};

export default Body;

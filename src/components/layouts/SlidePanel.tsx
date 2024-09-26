'use client';

import { FC } from 'react';
import { useSettingsStore } from '@/stores/settings';

const SlidePanel: FC = () => {
    const showSlidePanel = useSettingsStore((state) => state.showSlidePanel);

    return (
        <div
            className={`${showSlidePanel ? 'scale-y-100' : 'scale-y-0'} fixed inset-x-0 bottom-0 z-30 origin-bottom bg-zinc-300 px-4 py-6 transition-all duration-300 ease-in-out dark:bg-zinc-800`}
        >
            <p className="text-xl text-zinc-600 dark:text-zinc-300">
                SlidePanel
            </p>
        </div>
    );
};

export default SlidePanel;

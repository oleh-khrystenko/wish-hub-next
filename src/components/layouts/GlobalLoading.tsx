'use client';

import { FC } from 'react';
import { useSettingsStore } from '@/stores/settings';
import UiLoading from '@/components/ui/UiLoading';

const GlobalLoading: FC = () => {
    const showGlobalLoading = useSettingsStore(
        (state) => state.showGlobalLoading
    );

    return showGlobalLoading ? <UiLoading /> : null;
};

export default GlobalLoading;

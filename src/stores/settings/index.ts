import { create } from 'zustand';
import { ETheme } from '@/models/Settings';

interface ISettingsStore {
    theme: ETheme;
    activatedSidebar: boolean;
    showGlobalLoading: boolean;
    setTheme: (value: ETheme) => void;
    setActivatedSidebar: (value: boolean) => void;
    setShowGlobalLoading: (value: boolean) => void;
}

export const useSettingsStore = create<ISettingsStore>((set) => ({
    theme: ETheme.DARK,
    activatedSidebar: false,
    showGlobalLoading: false,
    setTheme: (value) => {
        set((state) => ({
            ...state,
            theme: value,
        }));
    },
    setActivatedSidebar: (value) => {
        set((state) => ({
            ...state,
            activatedSidebar: value,
        }));
    },
    setShowGlobalLoading: (value) => {
        set((state) => ({
            ...state,
            showGlobalLoading: value,
        }));
    },
}));

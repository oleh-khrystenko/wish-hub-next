import { create } from 'zustand';
import { ETheme } from '@/models/Settings';

interface ISettingsStore {
    theme: ETheme;
    showSidebar: boolean;
    showGlobalLoading: boolean;
    setTheme: (value: ETheme) => void;
    setShowSidebar: (value: boolean) => void;
    setShowGlobalLoading: (value: boolean) => void;
}

export const useSettingsStore = create<ISettingsStore>((set) => ({
    theme: ETheme.DARK,
    showSidebar: false,
    showGlobalLoading: false,
    setTheme: (value) => {
        set((state) => ({
            ...state,
            theme: value,
        }));
    },
    setShowSidebar: (value) => {
        set((state) => ({
            ...state,
            showSidebar: value,
        }));
    },
    setShowGlobalLoading: (value) => {
        set((state) => ({
            ...state,
            showGlobalLoading: value,
        }));
    },
}));

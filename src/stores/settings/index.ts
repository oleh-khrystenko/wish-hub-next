import { create } from 'zustand';
import { ETheme } from '@/models/Settings';

interface ISettingsStore {
    theme: ETheme;
    showSidebar: boolean;
    showSlidePanel: boolean;
    showGlobalLoading: boolean;
    isDirtyForm: boolean;
    setTheme: (value: ETheme) => void;
    setShowSidebar: (value: boolean) => void;
    setShowSlidePanel: (value: boolean) => void;
    setShowGlobalLoading: (value: boolean) => void;
    setIsDirtyForm: (value: boolean) => void;
}

export const useSettingsStore = create<ISettingsStore>((set) => ({
    theme: ETheme.DARK,
    showSidebar: false,
    showSlidePanel: false,
    showGlobalLoading: false,
    isDirtyForm: false,
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
    setShowSlidePanel: (value) => {
        set((state) => ({
            ...state,
            showSlidePanel: value,
        }));
    },
    setShowGlobalLoading: (value) => {
        set((state) => ({
            ...state,
            showGlobalLoading: value,
        }));
    },
    setIsDirtyForm: (value) => {
        set((state) => ({
            ...state,
            isDirtyForm: value,
        }));
    },
}));

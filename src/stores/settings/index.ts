import { create } from 'zustand';
import { ETheme } from '@/models/Settings';
import { IAdminData } from '@/models/User';

interface ISettingsStore {
    theme: ETheme;
    setTheme: (value: ETheme) => void;
    showSidebar: boolean;
    setShowSidebar: (value: boolean) => void;
    showSlidePanel: boolean;
    setShowSlidePanel: (value: boolean) => void;
    showGlobalLoading: boolean;
    setShowGlobalLoading: (value: boolean) => void;
    isDirtyForm: boolean;
    setIsDirtyForm: (value: boolean) => void;
    adminData: IAdminData | null;
    setAdminData: (data: IAdminData) => void;
}

export const useSettingsStore = create<ISettingsStore>((set) => ({
    theme: ETheme.DARK,
    setTheme: (value) => {
        set((state) => ({
            ...state,
            theme: value,
        }));
    },
    showSidebar: false,
    setShowSidebar: (value) => {
        set((state) => ({
            ...state,
            showSidebar: value,
        }));
    },
    showSlidePanel: false,
    setShowSlidePanel: (value) => {
        set((state) => ({
            ...state,
            showSlidePanel: value,
        }));
    },
    showGlobalLoading: false,
    setShowGlobalLoading: (value) => {
        set((state) => ({
            ...state,
            showGlobalLoading: value,
        }));
    },
    isDirtyForm: false,
    setIsDirtyForm: (value) => {
        set((state) => ({
            ...state,
            isDirtyForm: value,
        }));
    },
    adminData: null,
    setAdminData: (data) => {
        set((state) => ({
            ...state,
            adminData: data,
        }));
    },
}));

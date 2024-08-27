import { create } from 'zustand';
import { ETheme } from '@/models/Settings';

interface ISettingsStore {
    theme: ETheme;
    activatedBurgerMenu: boolean;
    setTheme: (value: ETheme) => void;
    setActivatedBurgerMenu: (value: boolean) => void;
}

export const useSettingsStore = create<ISettingsStore>((set) => ({
    theme: ETheme.DARK,
    activatedBurgerMenu: false,
    setTheme: (value) => {
        set((state) => ({
            ...state,
            theme: value,
        }));
    },
    setActivatedBurgerMenu: (value) => {
        set((state) => ({
            ...state,
            activatedBurgerMenu: value,
        }));
    },
}));

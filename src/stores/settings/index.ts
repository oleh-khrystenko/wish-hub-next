import { create } from 'zustand';
import { ETheme } from '@/models/Settings';

interface ISettingsStore {
    theme: ETheme;
    showBurgerMenu: boolean;
    setTheme: (value: ETheme) => void;
    setShowBurgerMenu: (value: boolean) => void;
}

export const useSettingsStore = create<ISettingsStore>((set) => ({
    theme: ETheme.DARK,
    showBurgerMenu: false,
    setTheme: (value) => set({ theme: value }),
    setShowBurgerMenu: (value) => set({ showBurgerMenu: value }),
}));

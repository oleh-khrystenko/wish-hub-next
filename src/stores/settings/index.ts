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
    setTheme: (value) => set({ theme: value }),
    setActivatedBurgerMenu: (value) => set({ activatedBurgerMenu: value }),
}));

import { create } from 'zustand';
import { ETheme } from '@/models/Settings';

interface IThemeStore {
    theme: ETheme;
    showBurgerMenu: boolean;
    setTheme: (value: ETheme) => void;
    setShowBurgerMenu: (value: boolean) => void;
}

export const useSettingStore = create<IThemeStore>((set) => ({
    theme: ETheme.DARK,
    showBurgerMenu: false,
    setTheme: (value) => set({ theme: value }),
    setShowBurgerMenu: (value) => set({ showBurgerMenu: value }),
}));

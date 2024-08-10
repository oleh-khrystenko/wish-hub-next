import { create } from 'zustand';
import {ETheme} from "@/models/Settings";

interface IThemeStore {
    theme: ETheme;
    setTheme: (value: ETheme) => void;
}

export const useThemeStore = create<IThemeStore>((set) => ({
    theme: ETheme.DARK,
    setTheme: (value) => {
        set(() => ({
            theme: value,
        }));
    }
}));

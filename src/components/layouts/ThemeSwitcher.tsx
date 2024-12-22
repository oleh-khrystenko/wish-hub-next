'use client';

import { FC, useEffect } from 'react';
import { ETheme } from '@/models/settings';
import { useSettingsStore } from '@/stores/settings';
import UiSwitch from '@/components/ui/UiSwitch';
import SunIcon from '@/components/icons/SunIcon';
import MoonIcon from '@/components/icons/MoonIcon';

interface IProps {
    hide?: () => void;
}

const ThemeSwitcher: FC<IProps> = ({ hide }) => {
    const theme = useSettingsStore((state) => state.theme);
    const setTheme = useSettingsStore((state) => state.setTheme);

    const handleToggleTheme = () => {
        const newTheme = theme === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);

        hide && hide();
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme as ETheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            const prefersDark = window.matchMedia(
                '(prefers-color-scheme: dark)'
            ).matches;
            const defaultTheme = prefersDark ? ETheme.DARK : ETheme.LIGHT;
            setTheme(defaultTheme);
            document.documentElement.setAttribute('data-theme', defaultTheme);
            document.documentElement.classList.add(defaultTheme);
        }
    }, []);

    return (
        <>
            <UiSwitch
                id="theme-switcher"
                name="theme-switcher"
                checked={theme === ETheme.DARK}
                onChange={handleToggleTheme}
            >
                <SunIcon />
                <MoonIcon />
            </UiSwitch>
        </>
    );
};

export default ThemeSwitcher;

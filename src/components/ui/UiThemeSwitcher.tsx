'use client';

import { useEffect } from 'react';
import { ETheme } from '@/models/Settings';
import {useThemeStore} from "@/stores/theme";
import SunIcon from '@/components/icons/SunIcon';
import MoonIcon from '@/components/icons/MoonIcon';
import UiSwitch from '@/components/ui/UiSwitch';

const UiThemeSwitcher = () => {
    const theme = useThemeStore((state) => state.theme);
    const setTheme = useThemeStore((state) => state.setTheme);

    const handleToggleTheme = () => {
        const newTheme = theme === ETheme.LIGHT ? ETheme.DARK : ETheme.LIGHT;
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
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
                checked={theme === ETheme.LIGHT}
                onChange={handleToggleTheme}
            >
                <SunIcon />
                <MoonIcon />
            </UiSwitch>
        </>
    );
};

export default UiThemeSwitcher;

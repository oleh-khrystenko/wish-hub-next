'use client';

import { useEffect, useState } from 'react';
import { ETheme } from '@/models/Settings';

const UiThemeSwitcher = () => {
    const [theme, setTheme] = useState<ETheme>(ETheme.DARK);

    const toggleTheme = () => {
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
        <button type="button" onClick={toggleTheme}>
            {theme === ETheme.LIGHT
                ? 'Switch to Dark Theme'
                : 'Switch to Light Theme'}
        </button>
    );
};

export default UiThemeSwitcher;

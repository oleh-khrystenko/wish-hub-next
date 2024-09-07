import { ReactNode } from 'react';
import Script from 'next/script';
import { Mulish } from 'next/font/google';
import '@/app/[locale]/globals.css';

const mulish = Mulish({
    subsets: ['cyrillic', 'latin'],
    weight: ['300', '400', '700'],
});

interface IProps {
    children: ReactNode;
    params: { locale: string };
}

const setInitialTheme = `
    (function() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
            document.documentElement.classList.add(savedTheme);
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            const defaultTheme = prefersDark ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', defaultTheme);
            document.documentElement.classList.add(defaultTheme);
        }
    })();
`;

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<IProps>) {
    return (
        <html lang={locale}>
            <body
                className={`${mulish.className} bg-zinc-200 dark:bg-zinc-900`}
            >
                {children}
            </body>
        </html>
    );
}

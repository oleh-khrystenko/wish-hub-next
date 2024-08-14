import { ReactNode } from 'react';
import { Mulish } from 'next/font/google';
import { useTranslations } from 'next-intl';
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
    const t = useTranslations();

    const description =
        t('meta-description') || 'Wish Hub - робить ваші мрії реальністю!';

    return (
        <html lang={locale}>
            <head>
                <title>Wish Hub</title>
                <meta name="description" content={description} />
                <link
                    rel="alternate"
                    hrefLang="x-default"
                    href="https://wish-hub.net/uk"
                />
                <link
                    rel="alternate"
                    hrefLang="uk-ua"
                    href="https://wish-hub.net/uk"
                />
                <link
                    rel="alternate"
                    hrefLang="en-ua"
                    href="https://wish-hub.net/en"
                />
                <link
                    rel="alternate"
                    hrefLang="ru-ua"
                    href="https://wish-hub.net/ru"
                />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
            </head>

            <body
                className={`${mulish.className} bg-zinc-200 dark:bg-zinc-900`}
            >
                {children}
            </body>
        </html>
    );
}

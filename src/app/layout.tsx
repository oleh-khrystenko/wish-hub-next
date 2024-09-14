import { ReactNode } from 'react';
import Script from 'next/script';
import { Mulish } from 'next/font/google';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import '@/app/globals.css';

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

const mulish = Mulish({
    subsets: ['cyrillic', 'latin'],
    weight: ['300', '400', '700'],
});

interface IProps extends IParams {
    children: ReactNode;
}

export default function Layout({
    children,
    params: { locale },
}: Readonly<IProps>) {
    const messages = useMessages();

    return (
        <html lang={locale}>
            <head>
                {/* Google Tag Manager */}
                <Script id="google-tag-manager" strategy="afterInteractive">
                    {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-PKQK5FN3');`}
                </Script>
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="manifest" href="/manifest.json" />
                <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-M8TC7LWZTB"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-M8TC7LWZTB');`}
                </Script>
                {/* End Google Analytics */}
            </head>

            <body
                className={`${mulish.className} bg-zinc-200 dark:bg-zinc-900`}
            >
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-PKQK5FN3"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                {/* End Google Tag Manager */}

                <NextIntlClientProvider
                    messages={pick(messages, ['not-found-page'])}
                >
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}

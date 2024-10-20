import { ReactNode } from 'react';
import Script from 'next/script';
import { Mulish } from 'next/font/google';
import { IPageParams } from '@/models/Settings';
import ServiceWorkerRegistrar from '@/helpers/hocs/ServiceWorkerRegistrar';
import ReactToastify from '@/components/layouts/ReactToastify';
import '@/app/globals.css';
import 'react-toastify/dist/ReactToastify.css';

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

interface IProps extends IPageParams {
    children: ReactNode;
}

export default function Layout({
    children,
    params: { locale },
}: Readonly<IProps>) {
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

                {/* Organization Microdata */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'Wish Hub',
                            url: 'https://wish-hub.net/ua',
                            logo: 'https://wish-hub.net/favicon.svg',
                            description:
                                'Wish Hub — це сервіс, який допомагає легко створювати та ділитися списками бажань, щоб зробити процес вибору подарунків простішим.',
                            sameAs: [
                                'https://www.instagram.com/wish_hub_net',
                                'https://www.facebook.com/wish.hub.net.official',
                                'https://www.youtube.com/@wish-hub',
                                'https://www.tiktok.com/@wish.hub.net',
                                'https://t.me/wish_hub',
                            ],
                            founder: {
                                '@type': 'Person',
                                name: 'Олег Христенко',
                            },
                            email: 'wish.hub.net@gmail.com',
                            telephone: '+380508899268',
                            contactPoint: [
                                {
                                    '@type': 'ContactPoint',
                                    email: 'wish.hub.net@gmail.com',
                                    telephone: '+380508899268',
                                    contactType: 'Technical Support',
                                    areaServed: 'UA',
                                    availableLanguage: [
                                        'Ukrainian',
                                        'English',
                                        'Russian',
                                    ],
                                },
                                {
                                    '@type': 'ContactPoint',
                                    email: 'wish.hub.net@gmail.com',
                                    telephone: '+380508899269',
                                    contactType: 'Customer Service',
                                    areaServed: 'UA',
                                    availableLanguage: [
                                        'Ukrainian',
                                        'English',
                                        'Russian',
                                    ],
                                },
                            ],
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress:
                                    'вулиця Небесної Сотні 13, офіс 408',
                                addressLocality: 'Полтава',
                                postalCode: '36000',
                                addressCountry: 'UA',
                            },
                        }),
                    }}
                />
                {/* End Organization Microdata */}
            </head>

            <body
                className={`${mulish.className} bg-zinc-200 before:fixed before:inset-0 before:-z-10 before:bg-zinc-200/70 after:fixed after:inset-0 after:-z-20 after:bg-rose-cyan-rose after:bg-cover after:bg-[80%_50%] after:bg-no-repeat dark:bg-zinc-900 dark:before:bg-zinc-900/70 desktop-xs:after:bg-center`}
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

                {children}

                <ServiceWorkerRegistrar />

                <ReactToastify />
            </body>
        </html>
    );
}

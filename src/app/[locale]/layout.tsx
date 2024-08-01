import { Mulish, Manrope } from 'next/font/google';
import { useTranslations } from 'next-intl';
import "@/app/[locale]/globals.css";

const mulish = Mulish({ subsets: ["cyrillic", "latin"], weight: ["300", "400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["700"] });

interface IProps {
    children: React.ReactNode;
    params: { locale: string };
}

export default function RootLayout({ children, params: { locale } }: Readonly<IProps>) {
    const t = useTranslations();

    const description = t('meta-description') || "Wish Hub - робить ваші мрії реальністю!";

    return (
        <html lang={locale}>
            <head>
                <title>Wish Hub</title>
                <meta name="description" content={ description } />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            </head>

            <body className={ `${ mulish.className } ${ manrope.className }` }>{ children}</body>
        </html>
    );
}

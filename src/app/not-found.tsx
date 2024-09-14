'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import LangSelect from '@/components/layouts/LangSelect';
import UiLoading from '@/components/ui/UiLoading';
import LogoIcon from '@/components/icons/LogoIcon';
import '@/app/globals.css';

export default function NotFound() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const router = useRouter();

    const activeLocale = useLocale();
    const notFoundPageT = useTranslations('not-found-page');

    const handleRedirectToMain = () => {
        setIsLoading(true);
        router.replace(`/${activeLocale}/main`);
    };

    useEffect(() => {
        // title
        document.title = `Wish Hub - ${notFoundPageT('title')}`;

        // meta description
        let metaDescription = document.querySelector(
            'meta[name="description"]'
        ) as HTMLMetaElement | null;
        if (!metaDescription) {
            // Якщо тега не існує, створюємо його
            metaDescription = document.createElement('meta') as HTMLMetaElement;
            metaDescription.name = 'description';
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute(
            'content',
            `${notFoundPageT('head.description')}`
        );

        // link canonical
        let linkCanonical = document.querySelector(
            'link[rel="canonical"]'
        ) as HTMLLinkElement | null;
        if (!linkCanonical) {
            // Якщо тега не існує, створюємо його
            linkCanonical = document.createElement('link');
            linkCanonical.rel = 'canonical';
            document.head.appendChild(linkCanonical);
        }
        linkCanonical.setAttribute('href', 'https://wish-hub.net/uk/not-found');

        // link alternate x-default
        let linkDefault = document.querySelector(
            'link[hreflang="x-default"]'
        ) as HTMLLinkElement | null;
        if (!linkDefault) {
            // Якщо тега не існує, створюємо його
            linkDefault = document.createElement('link');
            linkDefault.rel = 'alternate';
            linkDefault.hreflang = 'x-default';
            document.head.appendChild(linkDefault);
        }
        linkDefault.setAttribute('href', 'https://wish-hub.net/uk/not-found');

        // link alternate uk-ua
        let linkUk = document.querySelector(
            'link[hreflang="uk-ua"]'
        ) as HTMLLinkElement | null;
        if (!linkUk) {
            // Якщо тега не існує, створюємо його
            linkUk = document.createElement('link');
            linkUk.rel = 'alternate';
            linkUk.hreflang = 'uk-ua';
            document.head.appendChild(linkUk);
        }
        linkUk.setAttribute('href', 'https://wish-hub.net/uk/not-found');

        // link alternate en-ua
        let linkEn = document.querySelector(
            'link[hreflang="en-ua"]'
        ) as HTMLLinkElement | null;
        if (!linkEn) {
            // Якщо тега не існує, створюємо його
            linkEn = document.createElement('link');
            linkEn.rel = 'alternate';
            linkEn.hreflang = 'en-ua';
            document.head.appendChild(linkEn);
        }
        linkEn.setAttribute('href', `https://wish-hub.net/en/not-found`);

        // link alternate ru-ua
        let linkRu = document.querySelector(
            'link[hreflang="ru-ua"]'
        ) as HTMLLinkElement | null;
        if (!linkRu) {
            // Якщо тега не існує, створюємо його
            linkRu = document.createElement('link');
            linkRu.rel = 'alternate';
            linkRu.hreflang = 'ru-ua';
            document.head.appendChild(linkRu);
        }
        linkRu.setAttribute('href', `https://wish-hub.net/ru/not-found`);
    }, [activeLocale]);

    return (
        <main className="flex h-full min-h-screen w-full flex-col items-center gap-10 px-4 py-6">
            <div className="flex min-h-full w-full max-w-7xl grow flex-col items-center">
                <header className="flex w-full items-center justify-between gap-3 tablet-md:gap-5">
                    <button
                        type="button"
                        className="flex items-center gap-2 whitespace-nowrap text-2xl font-bold text-cyan-400 dark:text-cyan-300 tablet-md:text-3xl"
                        onClick={handleRedirectToMain}
                    >
                        <LogoIcon classes="tablet-md:h-10 tablet-md:w-10 h-8 w-8" />
                        Wish Hub
                    </button>

                    <div className="flex items-center gap-4">
                        <ThemeSwitcher />
                        <LangSelect selectHoverItemBg="hover:bg-zinc-100 hover:dark:bg-zinc-700" />
                    </div>
                </header>

                <main className="flex grow flex-col items-center justify-center gap-6">
                    <h1 className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-6xl">
                        {notFoundPageT('title')}
                    </h1>

                    <div className="flex items-center justify-center gap-2 tablet-md:gap-6">
                        <span className="text-7xl font-bold text-rose-500 tablet-md:text-9xl">
                            4
                        </span>

                        <div className="relative h-16 w-16 tablet-md:h-28 tablet-md:w-28">
                            <Image
                                src="/images/invisible-gift.webp"
                                alt={notFoundPageT('title')}
                                title={notFoundPageT('title')}
                                fill
                                sizes={'100%'}
                                className="object-contain"
                            />
                        </div>

                        <span className="text-7xl font-bold text-rose-500 tablet-md:text-9xl">
                            4
                        </span>
                    </div>

                    <p className="text-center text-zinc-700 dark:text-zinc-300 tablet-md:text-2xl">
                        {notFoundPageT('text')}
                    </p>

                    <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 tablet-md:text-lg">
                        {notFoundPageT('sub_text')}
                    </p>

                    <button
                        type="button"
                        className="relative block w-fit px-4 py-2.5 before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-br before:from-cyan-200 before:via-cyan-300 before:to-cyan-400 before:transition-all before:duration-300 before:ease-in-out after:absolute after:inset-0 after:z-10 after:rounded-md after:bg-gradient-to-tl after:from-cyan-200 after:via-cyan-300 after:to-cyan-400 after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:after:opacity-100"
                        onClick={handleRedirectToMain}
                    >
                        <span className="relative z-20 whitespace-nowrap font-bold text-zinc-800">
                            {notFoundPageT('to_main')}
                        </span>
                    </button>
                </main>
            </div>

            {isLoading && <UiLoading />}
        </main>
    );
}

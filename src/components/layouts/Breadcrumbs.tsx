'use client';

import { FC, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import HomeIcon from '@/components/icons/HomeIcon';

interface IPage {
    href: string;
    icon: ReactNode;
    name: string;
}

interface IProps {
    pages: IPage[];
}

const Breadcrumbs: FC<IProps> = ({ pages }) => {
    const activeLocale = useLocale();
    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    useEffect(() => {
        const itemListElement = [
            {
                '@type': 'ListItem',
                position: 1,
                name: alertsT('home'),
                item: `https://wish-hub.net/${activeLocale}`,
            },
        ];

        pages.map((page) => {
            itemListElement.push({
                '@type': 'ListItem',
                position: itemListElement.length + 1,
                name: page.name,
                item: `https://wish-hub.net/${activeLocale}/${page.href}`,
            });
        });

        const breadcrumbJsonLd = JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement,
        });

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(breadcrumbJsonLd);
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, [activeLocale]);

    return (
        <nav className="flex items-center gap-0.5 px-1 desktop-sm:px-0">
            <Link
                href={`/${activeLocale}/${myUser ? 'main' : ''}`}
                className="group relative flex items-center justify-center rounded-l-md bg-zinc-300 px-4 py-1 transition-all duration-300 ease-in-out after:absolute after:right-0 after:top-1/2 after:z-10 after:h-4 after:w-4 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:bg-zinc-300 after:transition-all after:duration-300 after:ease-in-out hover:bg-cyan-400 hover:after:bg-cyan-400 dark:bg-zinc-800 after:dark:bg-zinc-800 hover:dark:bg-cyan-300 hover:after:dark:bg-cyan-300"
                onClick={() => setShowGlobalLoading(true)}
            >
                <HomeIcon classes="w-4 h-4 stroke-zinc-500 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-600" />
            </Link>

            {pages.map((page, idx) => {
                return idx === pages.length - 1 ? (
                    <div
                        key={page.href}
                        className="relative flex cursor-default items-center justify-center rounded-r-md bg-zinc-400 px-4 py-1 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-zinc-200 dark:bg-zinc-700 before:dark:bg-zinc-900"
                    >
                        {page.icon}

                        <span className="ml-1 text-xs text-zinc-200 transition-all duration-300 ease-in-out dark:text-zinc-400 group-hover:dark:text-zinc-600">
                            {page.name}
                        </span>
                    </div>
                ) : (
                    <Link
                        key={page.href}
                        href={`/${activeLocale}/${page.href}`}
                        className="group relative flex items-center justify-center bg-zinc-300 px-4 py-1 transition-all duration-300 ease-in-out before:absolute before:left-0 before:top-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-zinc-200 after:absolute after:right-0 after:top-1/2 after:z-10 after:h-4 after:w-4 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:bg-zinc-300 after:transition-all after:duration-300 after:ease-in-out hover:bg-cyan-400 hover:after:bg-cyan-400 dark:bg-zinc-800 before:dark:bg-zinc-900 after:dark:bg-zinc-800 hover:dark:bg-cyan-300 hover:after:dark:bg-cyan-300"
                        onClick={() => setShowGlobalLoading(true)}
                    >
                        {page.icon}

                        <span className="ml-1 text-xs text-zinc-500 transition-all duration-300 ease-in-out dark:text-zinc-400 group-hover:dark:text-zinc-600">
                            {page.name}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;

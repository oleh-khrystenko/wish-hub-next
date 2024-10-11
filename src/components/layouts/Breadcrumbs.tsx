'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useSettingsStore } from '@/stores/settings';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UiButton from '@/components/ui/UiButton';
import HomeIcon from '@/components/icons/HomeIcon';

interface ISeoPage {
    href: string;
    name: string;
}

interface IVisualPage extends ISeoPage {
    icon: ReactNode;
}

interface IProps {
    visualPages: IVisualPage[];
    seoPages: ISeoPage[];
    isMainPage?: boolean;
}

const Breadcrumbs: FC<IProps> = ({ visualPages, seoPages, isMainPage }) => {
    const navRef = useRef<HTMLDivElement>(null);

    const activeLocale = useLocale();
    const allPagesT = useTranslations('all-pages');

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const utmParams = UseUTMParams();

    useEffect(() => {
        const itemListElement = [
            {
                '@type': 'ListItem',
                position: 1,
                name: allPagesT('home'),
                item: `https://wish-hub.net/${activeLocale}`,
            },
        ];

        seoPages.map((page, idx) => {
            itemListElement.push({
                '@type': 'ListItem',
                position: idx + 2,
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

    useEffect(() => {
        if (!navRef.current) return;
        navRef.current.scrollTo({
            left: navRef.current.scrollWidth,
            behavior: 'smooth',
        });
    }, []);

    return (
        <nav
            className={`${isMainPage ? 'tablet-md:px-0' : 'desktop-sm:px-0'} ${visualPages.length > 3 ? 'breadcrumbs-scrollbar overflow-x-auto pb-1' : ''} flex items-center gap-0.5 px-1`}
            ref={navRef}
        >
            <UiButton
                href={utmParams ? `?${utmParams}` : ''}
                variant="clear-styles"
                classesWrap="group relative flex items-center justify-center rounded-l-md bg-zinc-300 px-4 py-1 transition-all duration-300 ease-in-out after:absolute after:right-0 after:top-1/2 after:z-10 after:h-4 after:w-4 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:bg-zinc-300 after:transition-all after:duration-300 after:ease-in-out hover:bg-cyan-400 hover:after:bg-cyan-400 dark:bg-zinc-800 after:dark:bg-zinc-800 hover:dark:bg-cyan-300 hover:after:dark:bg-cyan-300"
                onLinkClick={() => setShowGlobalLoading(true)}
            >
                <HomeIcon classes="w-4 h-4 stroke-zinc-500 dark:stroke-zinc-400 group-hover:dark:stroke-zinc-600" />
            </UiButton>

            {visualPages.map((page, idx) => {
                return idx === visualPages.length - 1 ? (
                    <div
                        key={page.href}
                        className="relative flex cursor-default items-center justify-center rounded-r-md bg-zinc-400 px-4 py-1 before:absolute before:left-0 before:top-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-zinc-200 dark:bg-zinc-700 before:dark:bg-zinc-900"
                    >
                        {page.icon}

                        <span
                            className={`${visualPages.length > 2 ? 'max-w-8 truncate mobile-xs:max-w-11 mobile-sm:max-w-14 mobile-md:max-w-16 mobile-lg:max-w-20 mobile-xl:max-w-fit' : ''} ml-1.5 text-xs text-zinc-200 transition-all duration-300 ease-in-out dark:text-zinc-400`}
                        >
                            {page.name}
                        </span>
                    </div>
                ) : (
                    <UiButton
                        key={page.href}
                        href={`/${page.href}${utmParams ? `?${utmParams}` : ''}`}
                        variant="clear-styles"
                        classesWrap="group relative flex items-center justify-center bg-zinc-300 px-4 py-1 transition-all duration-300 ease-in-out before:absolute before:left-0 before:top-1/2 before:h-4 before:w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 before:bg-zinc-200 after:absolute after:right-0 after:top-1/2 after:z-10 after:h-4 after:w-4 after:-translate-y-1/2 after:translate-x-1/2 after:rotate-45 after:bg-zinc-300 after:transition-all after:duration-300 after:ease-in-out hover:bg-cyan-400 hover:after:bg-cyan-400 dark:bg-zinc-800 before:dark:bg-zinc-900 after:dark:bg-zinc-800 hover:dark:bg-cyan-300 hover:after:dark:bg-cyan-300"
                        onLinkClick={() => setShowGlobalLoading(true)}
                    >
                        {page.icon}

                        <span
                            className={`${visualPages.length > 2 ? 'max-w-8 truncate mobile-xs:max-w-11 mobile-sm:max-w-14 mobile-md:max-w-16 mobile-lg:max-w-20 mobile-xl:max-w-fit' : ''} ml-1.5 text-xs text-zinc-500 transition-all duration-300 ease-in-out dark:text-zinc-400 group-hover:dark:text-zinc-600`}
                        >
                            {page.name}
                        </span>
                    </UiButton>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;

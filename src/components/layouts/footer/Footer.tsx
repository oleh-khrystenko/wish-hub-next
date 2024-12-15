'use client';

import { FC, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { ETheme, INavItem } from '@/models/Settings';
import { useSettingsStore } from '@/stores/settings';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import Divider from '@/components/layouts/Divider';
import SocialNetworks from '@/components/layouts/SocialNetworks';
import NavList from '@/components/layouts/footer/NavList';
import UiBrand from '@/components/ui/UiBrand';

interface IProps {
    remove?: INavItem['href'];
    isWelcome?: boolean;
}

const Footer: FC<IProps> = ({ remove, isWelcome }) => {
    const allPagesT = useTranslations('all-pages');

    const utmParams = UseUTMParams();

    const setTheme = useSettingsStore((state) => state.setTheme);

    const navList: INavItem[] = [
        {
            href: `main${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('main'),
        },
        {
            href: `instruction${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('instruction'),
        },
        {
            href: `about${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('about'),
        },
        {
            href: `blog${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('blog'),
        },
        {
            href: `reviews${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('reviews'),
        },
        {
            href: `rozigrash-bazhan${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('rozigrash-bazhan'),
            // isNew: true,
        },
        {
            href: `privacy-policy${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('privacy_policy'),
        },
        {
            href: `contact${utmParams ? `?${utmParams}` : ''}`,
            title: allPagesT('contact'),
        },
    ];

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
        <footer className="mt-auto">
            <Divider />

            <div className="bg-zinc-300 px-4 pt-4 dark:bg-zinc-800">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-3">
                    <div className="grid gap-6 tablet-lg:grid-cols-2 desktop-xs:grid-cols-3">
                        <div>
                            <div className="-ml-4">
                                <UiBrand withLogo disabled={isWelcome} />
                            </div>

                            <p className="text-lg text-zinc-700 dark:text-zinc-400">
                                {allPagesT('slogan')}
                            </p>
                        </div>

                        <NavList navList={navList} remove={remove} />

                        <div className="flex flex-col gap-2 tablet-lg:col-start-2 tablet-lg:col-end-3 desktop-xs:col-auto">
                            <p className="text-zinc-600 dark:text-zinc-400">
                                {allPagesT('phone')}{' '}
                                <a
                                    href="tel:+380508899268"
                                    className="font-bold"
                                >
                                    +38 050 88 99 268
                                </a>
                            </p>

                            <p className="text-zinc-600 dark:text-zinc-400">
                                {allPagesT('email')}{' '}
                                <a
                                    href="mailto:wish.hub.net@gmail.com"
                                    className="font-bold"
                                >
                                    wish.hub.net@gmail.com
                                </a>
                            </p>

                            <div className="flex items-center gap-4 desktop-xs:mt-4">
                                <SocialNetworks />
                            </div>
                        </div>
                    </div>

                    <p className="w-full border-t border-solid border-zinc-400 p-2 text-center text-sm font-bold text-zinc-400 dark:border-zinc-500 dark:text-zinc-500">
                        2024. Wish Hub. All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

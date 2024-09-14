'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { IParams } from '@/models/Settings';
import { fetchMetadata } from '@/helpers/utils/metadata';
import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import UiLoading from '@/components/ui/UiLoading';
import LogoIcon from '@/components/icons/LogoIcon';
import '@/app/globals.css';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'not-found');
}

export default function NotFound() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const pathname = usePathname();

    // Витягуємо локаль з URL (передбачається, що локаль завжди на початку URL)
    const localeMatch = pathname?.match(/^\/(uk|en|ru)\//);
    const locale = localeMatch ? localeMatch[1] : null;

    // Тексти для різних локалей
    const titleT: { [key: string]: string } = {
        uk: 'Сторінку не знайдено',
        en: 'Page not found',
        ru: 'Страница не найдена',
    };
    const title = locale ? titleT[locale] : titleT['uk'];

    const textT: { [key: string]: string } = {
        uk: 'Ой! Сторінки, яку ви шукали, не існує.',
        en: 'Oops! The page you were looking for does not exist.',
        ru: 'Ой! Страницы, которую вы искали, не существует.',
    };
    const text = locale ? textT[locale] : textT['uk'];

    const subTextT: { [key: string]: string } = {
        uk: 'Можливо, ви неправильно ввели адресу сторінки.',
        en: 'You may have entered the page address incorrectly.',
        ru: 'Возможно, вы неправильно ввели адрес страницы.',
    };
    const subText = locale ? subTextT[locale] : subTextT['uk'];

    const toMainT: { [key: string]: string } = {
        uk: 'На Головну',
        en: 'To Main',
        ru: 'На Главную',
    };
    const toMain = locale ? toMainT[locale] : toMainT['uk'];

    return (
        <main className="flex h-full min-h-screen w-full flex-col items-center gap-10 bg-zinc-300 px-4 py-6 dark:bg-zinc-800">
            <div className="flex min-h-full w-full max-w-7xl grow flex-col items-center">
                <header className="flex w-full items-center justify-between gap-3 tablet-md:gap-5">
                    <Link
                        href="/"
                        className="flex items-center gap-2 whitespace-nowrap text-2xl font-bold text-cyan-400 dark:text-cyan-300 tablet-md:text-3xl"
                        onClick={() => setIsLoading(true)}
                    >
                        <LogoIcon classes="tablet-md:h-10 tablet-md:w-10 h-8 w-8" />
                        Wish Hub
                    </Link>
                    <ThemeSwitcher />
                </header>

                <main className="flex grow flex-col items-center justify-center gap-6">
                    <h1 className="text-center text-2xl font-bold text-zinc-800 dark:text-zinc-200 tablet-md:text-6xl">
                        {title}
                    </h1>

                    <div className="flex items-center justify-center gap-2 tablet-md:gap-6">
                        <span className="text-7xl font-bold text-rose-500 tablet-md:text-9xl">
                            4
                        </span>

                        <div className="relative h-16 w-16 tablet-md:h-28 tablet-md:w-28">
                            <Image
                                src="/images/invisible-gift.webp"
                                alt="invisible-gift"
                                title="invisible-gift"
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
                        {text}
                    </p>

                    <p className="text-center text-sm text-zinc-600 dark:text-zinc-400 tablet-md:text-lg">
                        {subText}
                    </p>

                    <Link
                        href="/"
                        className="relative block w-fit px-4 py-2.5 before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-br before:from-cyan-200 before:via-cyan-300 before:to-cyan-400 before:transition-all before:duration-300 before:ease-in-out after:absolute after:inset-0 after:z-10 after:rounded-md after:bg-gradient-to-tl after:from-cyan-200 after:via-cyan-300 after:to-cyan-400 after:opacity-0 after:transition-all after:duration-300 after:ease-in-out hover:after:opacity-100"
                        onClick={() => setIsLoading(true)}
                    >
                        <span className="relative z-20 whitespace-nowrap font-bold text-zinc-800">
                            {toMain}
                        </span>
                    </Link>
                </main>
            </div>

            {isLoading && <UiLoading />}
        </main>
    );
}

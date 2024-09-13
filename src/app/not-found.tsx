'use client';

import { usePathname } from 'next/navigation';
import '@/app/globals.css';

export default function NotFound() {
    const pathname = usePathname();

    // Витягуємо локаль з URL (передбачається, що локаль завжди на початку URL)
    const localeMatch = pathname?.match(/^\/(uk|en|ru)\//);
    const locale = localeMatch ? localeMatch[1] : null;

    // Тексти для різних локалей
    const messages: { [key: string]: string } = {
        uk: 'Сторінку не знайдено',
        en: 'Page not found',
        ru: 'Страница не найдена',
    };

    // Вибираємо повідомлення на основі локалі
    const message = locale ? messages[locale] : messages['uk'];

    return (
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-zinc-500">
            <span className="text-2xl text-rose-500">GLOBAL</span>
            <h1 className="text-xl text-rose-500">{message}</h1>
        </main>
    );
}

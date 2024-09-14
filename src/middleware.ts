import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { ELang } from '@/models/Settings';

const intlMiddleware = createMiddleware({
    locales: Object.values(ELang), // Використовуємо всі значення з перерахування
    defaultLocale: ELang.UK,
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Створюємо регулярний вираз на основі перерахування ELang
    const langRegex = new RegExp(`^/(${Object.values(ELang).join('|')})/`);

    // Перевіряємо, чи маршрут уже містить локалізацію
    const isLocalized = langRegex.test(pathname);

    // Якщо маршрут не локалізований, редіректимо на локалізовану версію
    if (!isLocalized) {
        return NextResponse.redirect(
            new URL(`/${ELang.UK}${pathname}`, request.url)
        );
    }

    // Викликаємо обробник локалізації після редіректу
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!_next|api|static|favicon.svg).*)'], // Ігноруємо технічні маршрути
};

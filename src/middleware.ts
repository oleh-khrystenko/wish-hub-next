import createMiddleware from 'next-intl/middleware';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['uk', 'en', 'ru'],
    defaultLocale: 'uk',
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Перевіряємо, чи маршрут уже містить локалізацію
    const isLocalized = /^\/(uk|en|ru)\//.test(pathname);

    // Якщо маршрут не локалізований, редіректимо на локалізовану версію
    if (!isLocalized) {
        return NextResponse.redirect(new URL(`/uk${pathname}`, request.url));
    }

    // Викликаємо обробник локалізації після редіректу
    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico).*)'], // Ігноруємо технічні маршрути
};

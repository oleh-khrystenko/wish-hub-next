import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { ELang } from '@/models/Settings';

const intlMiddleware = createMiddleware({
    locales: Object.values(ELang), // Використовуємо всі значення з перерахування
    defaultLocale: ELang.UK,
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Перевіряємо, чи це маршрут /welcome
    if (pathname === '/welcome') {
        // Редіректимо до /uk і зупиняємо подальший обробіток
        return NextResponse.redirect(new URL(`/${ELang.UK}`, request.url));
    }

    // Створюємо регулярний вираз на основі перерахування ELang
    const langRegex = new RegExp(`^/(${Object.values(ELang).join('|')})/`);

    // Перевіряємо, чи маршрут уже містить локалізацію
    const isLocalized = langRegex.test(pathname);

    // Якщо маршрут не локалізований, редіректимо на локалізовану версію
    if (!isLocalized && pathname !== `/${ELang.UK}`) {
        return NextResponse.redirect(
            new URL(`/${ELang.UK}${pathname}`, request.url)
        );
    }

    // Викликаємо обробник локалізації після редіректу
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        '/((?!_next|api|static|app-icons|icons|images|favicon.svg|manifest.json|service-worker.js).*)',
    ], // Ігноруємо технічні маршрути
};

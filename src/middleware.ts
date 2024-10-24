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
        // Редіректимо до /ua і зупиняємо подальший обробіток
        return NextResponse.redirect(new URL(`/${ELang.UK}`, request.url));
    }

    // Редірект зі сторінки /ua/uk/main на /ua/main
    if (pathname === `/${ELang.UK}/uk/main`) {
        return NextResponse.redirect(new URL(`/${ELang.UK}/main`, request.url));
    }

    // Створюємо регулярний вираз на основі перерахування ELang
    const langRegex = new RegExp(`^/(${Object.values(ELang).join('|')})(/|$)`);

    // Перевіряємо, чи маршрут уже містить локалізацію
    const isLocalized = langRegex.test(pathname);

    // Якщо маршрут уже містить локалізацію і вона не є кореневою (наприклад, /en або /ua), викликаємо intlMiddleware
    if (isLocalized) {
        return intlMiddleware(request);
    }

    // Якщо маршрут не локалізований, редіректимо на локалізовану версію
    return NextResponse.redirect(
        new URL(`/${ELang.UK}${pathname}`, request.url)
    );
}

export const config = {
    matcher: [
        '/((?!_next|api|static|app-icons|icons|images|favicon.svg|manifest.json|robots.txt|service-worker.js).*)',
    ], // Ігноруємо технічні маршрути
};

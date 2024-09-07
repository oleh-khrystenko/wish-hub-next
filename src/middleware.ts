import createMiddleware from 'next-intl/middleware';
import { NextResponse, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
    locales: ['uk', 'en', 'ru'],
    defaultLocale: 'uk',
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // редіректи
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/uk', request.url));
    }
    if (pathname === '/welcome') {
        return NextResponse.redirect(new URL('/uk', request.url));
    }
    if (pathname === '/auth') {
        return NextResponse.redirect(new URL('/uk/auth', request.url));
    }
    if (pathname === '/about') {
        return NextResponse.redirect(new URL('/uk/about', request.url));
    }
    if (pathname === '/privacy-policy') {
        return NextResponse.redirect(
            new URL('/uk/privacy-policy', request.url)
        );
    }

    // Викликаємо обробник локалізації після редіректів
    return intlMiddleware(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: [
        '/',
        '/welcome',
        '/auth',
        '/about',
        '/privacy-policy',
        '/(uk|en|ru)/:path*',
    ],
};

import createMiddleware from 'next-intl/middleware';
import { NextResponse, NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Якщо користувач заходить на головну сторінку `/`, робимо переадресацію на `/uk`
    if (pathname === '/') {
        return NextResponse.redirect(new URL('/uk', request.url));
    }

    return createMiddleware({
        locales: ['uk', 'en', 'ru'],
        defaultLocale: 'uk',
    })(request);
}

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(uk|en|ru)/:path*'],
};

import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serviceWorker: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3.eu-central-1.amazonaws.com',
                pathname: '/wish.hub/**',
            },
            // TODO: Потенційно небезпечний дозвіл на завантеження картинок по URL з усіх джерел для тега import Image from 'next/image';
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
            // TODO: Потенційно небезпечний дозвіл на завантеження картинок по URL з усіх джерел для тега import Image from 'next/image';
        ],
    },
};

export default withNextIntl(nextConfig);

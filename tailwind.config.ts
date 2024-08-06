import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            boxShadow: {
                'checked-outline-light': '0 0 0 1px #e4e4e7', // zinc-200
                'checked-outline-dark': '0 0 0 1px #18181b', // zinc-900
            },
            height: {
                0.75: '0.1875rem',
            },
            width: {
                0.75: '0.1875rem',
            },
            keyframes: {
                spinner: {
                    '0%, 20%, 80%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.5)' },
                },
            },
            animation: {
                'spinner-1': 'spinner 1.2s ease-in-out infinite 0s',
                'spinner-2': 'spinner 1.2s ease-in-out infinite -0.1s',
                'spinner-3': 'spinner 1.2s ease-in-out infinite -0.2s',
                'spinner-4': 'spinner 1.2s ease-in-out infinite -0.3s',
                'spinner-5': 'spinner 1.2s ease-in-out infinite -0.4s',
                'spinner-6': 'spinner 1.2s ease-in-out infinite -0.5s',
                'spinner-7': 'spinner 1.2s ease-in-out infinite -0.6s',
                'spinner-8': 'spinner 1.2s ease-in-out infinite -0.7s',
                'spinner-9': 'spinner 1.2s ease-in-out infinite -0.8s',
                'spinner-10': 'spinner 1.2s ease-in-out infinite -0.9s',
                'spinner-11': 'spinner 1.2s ease-in-out infinite -1s',
                'spinner-12': 'spinner 1.2s ease-in-out infinite -1.1s',
            },
        },
        screens: {
            // Mobile sizes
            'mobile-xs': '360px', // @media (min-width: 360px)
            'mobile-sm': '390px', // @media (min-width: 390px)
            'mobile-md': '412px', // @media (min-width: 412px)
            'mobile-lg': '430px', // @media (min-width: 430px)
            'mobile-xl': '500px', // @media (min-width: 500px)
            'mobile-2xl': '520px', // @media (min-width: 520px)

            // Tablet sizes
            'tablet-sm': '600px', // @media (min-width: 600px)
            'tablet-md': '768px', // @media (min-width: 768px)
            'tablet-lg': '1024px', // @media (min-width: 1024px)
            'tablet-xl': '1180px', // @media (min-width: 1180px)

            // Desktop sizes
            'desktop-xs': '1280px', // @media (min-width: 1280px)
            'desktop-sm': '1366px', // @media (min-width: 1366px)
            'desktop-md': '1440px', // @media (min-width: 1440px)
            'desktop-lg': '1600px', // @media (min-width: 1600px)
            'desktop-xl': '1920px', // @media (min-width: 1920px)
        },
    },
    plugins: [],
};

export default config;

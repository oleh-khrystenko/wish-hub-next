import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
        'flex',
        'flex-col',
        'tablet-lg:items-center',
        'gap-2',
        'gap-5',
        'tablet-lg:gap-6',
        'grid',
        'tablet-lg:grid-cols-5',
        'tablet-lg:col-span-3',
        'tablet-lg:col-span-2',
        'text-xl',
        'desktop-xs:text-2xl',
        'desktop-xs:text-lg',
        'font-bold',
        'text-zinc-700',
        'dark:text-zinc-300',
        'text-cyan-400',
        'dark:text-cyan-300',
        'hover:underline',
        'text-justify',
        'relative',
        'absolute',
        'inset-0',
        'w-full',
        'h-full',
        'overflow-hidden',
        'rounded-lg',
        'pt-[45%]',
        'pt-[56.25%]',
        'object-cover',
        'tablet-lg:order-1',
    ],
    theme: {
        extend: {
            height: {
                0.75: '0.1875rem',
            },
            width: {
                0.75: '0.1875rem',
            },
            backgroundImage: {
                'cyan-cyan-rose': "url('/images/cyan-cyan-rose.webp')",
                'rose-cyan-rose': "url('/images/rose-cyan-rose.webp')",
                'wish-bg': "url('/images/wish-bg.webp')",
            },
            boxShadow: {
                'checked-outline-light': '0 0 0 1px #e4e4e7', // zinc-200
                'checked-outline-dark': '0 0 0 1px #18181b', // zinc-900
                'checked-outline-light-tablet': '0 0 0 1px #d4d4d8', // zinc-300
                'checked-outline-dark-tablet': '0 0 0 1px #27272a', // zinc-800
            },
            keyframes: {
                spinner: {
                    '0%, 20%, 80%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.5)' },
                },
                appear: {
                    to: { opacity: '1' },
                },
                '-fulfilled': {
                    to: { transform: 'rotate(-3deg)', borderColor: '#67e8f9' },
                },
                fulfilled: {
                    to: { transform: 'rotate(3deg)', borderColor: '#67e8f9' },
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
                'appear-1': 'appear 0.2s forwards ease-in-out 0.2s',
                'appear-2': 'appear 0.2s forwards ease-in-out 0.4s',
                'appear-3': 'appear 0.2s forwards ease-in-out 0.5s',
                'appear-4': 'appear 0.2s forwards ease-in-out 0.6s',
                'appear-5': 'appear 0.2s forwards ease-in-out 1s',
                'appear-6': 'appear 0.2s forwards ease-in-out 1.1s',
                'appear-7': 'appear 0.2s forwards ease-in-out 1.3s',
                'appear-8': 'appear 0.2s forwards ease-in-out 1.4s',
                'appear-9': 'appear 0.2s forwards ease-in-out 1.6s',
                'appear-10': 'appear 0.2s forwards ease-in-out 1.7s',
                'appear-11': 'appear 0.2s forwards ease-in-out 1.9s',
                'appear-12': 'appear 0.2s forwards ease-in-out 2s',
                'appear-13': 'appear 0.2s forwards ease-in-out 2.1s',
                'appear-14': 'appear 0.2s forwards ease-in-out 2.2s',
                'appear-15': 'appear 0.2s forwards ease-in-out 2.4s',
                'appear-16': 'appear 0.2s forwards ease-in-out 2.5s',
                'appear-17': 'appear 0.2s forwards ease-in-out 2.6s',
                'appear-18': 'appear 0.2s forwards ease-in-out 2.7s',
                'appear-19': 'appear 0.2s forwards ease-in-out 2.8s',
                'appear-20': 'appear 0.2s forwards ease-in-out 2.9s',
                'appear-21': 'appear 0.2s forwards ease-in-out 3s',
                'appear-22': 'appear 0.2s forwards ease-in-out 3.2s',
                'fulfilled-1': '-fulfilled 0.2s forwards ease-in-out 2.2s',
                'fulfilled-2': 'fulfilled 0.2s forwards ease-in-out 3s',
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
            'desktop-2xl': '2560px', // @media (min-width: 2560px)
        },
    },
    plugins: [],
};

export default config;

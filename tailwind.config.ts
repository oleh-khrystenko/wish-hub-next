import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: 'class',
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {},
        colors: {
            primary: '#45f3ff',
            'primary-light': '#acfaff',
            'primary-dark': '#02b9c7',
            success: '#90FF27',
            action: '#ff2770',
            'action-light': '#ff679d',
            'action-dark': '#cb0043',
            dark: '#191919',
            light: '#8c8c8c',
            'bg-dark': '#0b0b0b',
            'bg-light': '#c6c6c6',
        },
        screens: {
            // Mobile sizes
            'mobile-xs': '360px', // => @media (min-width: 360px) { ... }
            'mobile-sm': '390px', // => @media (min-width: 390px) { ... }
            'mobile-md': '412px', // => @media (min-width: 412px) { ... }
            'mobile-lg': '430px', // => @media (min-width: 430px) { ... }
            'mobile-xl': '500px', // => @media (min-width: 500px) { ... }
            'mobile-2xl': '520px', // => @media (min-width: 520px) { ... }

            // Tablet sizes
            'tablet-sm': '600px', // => @media (min-width: 600px) { ... }
            'tablet-md': '768px', // => @media (min-width: 768px) { ... }
            'tablet-lg': '1024px', // => @media (min-width: 1024px) { ... }
            'tablet-xl': '1180px', // => @media (min-width: 1180px) { ... }

            // Desktop sizes
            'desktop-xs': '1280px', // => @media (min-width: 1280px) { ... }
            'desktop-sm': '1366px', // => @media (min-width: 1366px) { ... }
            'desktop-md': '1440px', // => @media (min-width: 1440px) { ... }
            'desktop-lg': '1600px', // => @media (min-width: 1600px) { ... }
            'desktop-xl': '1920px', // => @media (min-width: 1920px) { ... }
        },
    },
    plugins: [],
};

export default config;

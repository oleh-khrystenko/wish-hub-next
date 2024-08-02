import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: 'class',
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
    },
    plugins: [],
};

export default config;

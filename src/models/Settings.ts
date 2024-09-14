export enum ELang {
    EN = 'en',
    UK = 'uk',
    RU = 'ru',
}

export enum ETheme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum EPrivacy {
    ALL = 'all',
    FRIENDS = 'friends',
    NOBODY = 'nobody',
}

export interface IZoomedImage {
    src: string;
    alt: string;
}

export interface INavItem {
    title: string;
    href: 'main' | 'about' | 'privacy-policy';
}

export interface IParams {
    params: { locale: ELang };
}

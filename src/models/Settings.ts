export enum ELang {
    EN = 'en',
    UK = 'ua',
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

export enum EAddToCollection {
    NONE = 'none',
    CREATE = 'create-collection',
    ADD = 'add-to-collection',
}

export interface IZoomedImage {
    src: string;
    alt: string;
}

export interface INavItem {
    title: string;
    href: string;
}

export interface IPageParams {
    params: {
        locale: ELang;
        userId?: string;
        userSlug?: string;
        collectionSlug?: string;
        wishSlug?: string;
    };
}

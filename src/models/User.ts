import { Dayjs } from 'dayjs';
import { EPrivacy, ELang } from '@/models/Settings';

export interface ICandidate {
    email?: string;
    firstName?: string;
}

export interface IUser {
    id: string;
    email: string;
    showEmail: EPrivacy;
    hasPassword: boolean;
    isActivated: boolean;
    lang: ELang;
    showedInfo: boolean; // показую інструкцію як встановити PWA додаток
    firstLoaded: boolean; // має показувати модалку з редагуванням профілю. Але зараз такої модалки немає і замість неї сторінка з профілем. Тож поки це поле не задіяне
    firstName: string;
    lastName?: string;
    avatar?: string;
    deliveryAddress?: string;
    showDeliveryAddress: EPrivacy;
    birthday?: Dayjs;
    showBirthday: EPrivacy;
    wishList: string[];
    successfulWishes: number;
    unsuccessfulWishes: number;
    friends: string[];
    followFrom: string[];
    followTo: string[];
}

export type TCurrentAvatar = File | 'delete' | string;

export interface IAuth {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

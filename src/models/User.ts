import { Dayjs } from 'dayjs';
import { EPrivacy, ELang } from '@/models/Settings';
import { IGuestWish } from '@/models/Wish';

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
    // показую інструкцію як встановити PWA додаток
    showedInfo: boolean;
    // має показувати модалку з редагуванням профілю.
    // Але зараз такої модалки немає і замість неї сторінка з профілем.
    // Тож поки це поле не задіяне
    firstLoaded: boolean;
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

export interface IAdminData {
    usersCount: number;
    notActivatedUsersCount: number;
    wishesCount: number;
    executedWishesCount: number;
    bookedWishesCount: number;
}

export interface IAuth {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    wishes: IGuestWish[];
    adminData: IAdminData;
}

export interface IInvitedPerson {
    id: IUser['id'];
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    avatar: IUser['avatar'];
    isActivated: IUser['isActivated'];
}

export interface ICandidateForWin {
    id: IUser['id'];
    serialNumber: number;
    firstName: IUser['firstName'];
    lastName: IUser['lastName'];
    avatar: IUser['avatar'];
    isActivated: IUser['isActivated'];
    invitedPerson: IInvitedPerson;
}

import { Dayjs } from 'dayjs';
import { IUser } from '@/models/User';
import { EPrivacy } from '@/models/Settings';

export interface IImage {
    id?: string;
    path: string;
    position: number;
    delete?: boolean;
}

export type TCurrentImage = File | IImage;

export interface IBooking {
    userId: IUser['id'];
    start: Dayjs;
    end: Dayjs;
}

interface IAddress {
    id: string;
    value: string;
}

interface ILike {
    userId: string;
    userAvatar: string;
    userFullName: string;
}

export enum EWishStatus {
    ALL = 'all',
    UNFULFILLED = 'unfulfilled',
    FULFILLED = 'fulfilled',
}

export enum EWishSort {
    POPULAR = 'sortByLikes:desc',
    PRICE_DESC = 'priceInBaseCurrency:desc',
    PRICE_ASC = 'priceInBaseCurrency:asc',
    CREATED_DESC = 'createdAt:desc',
    CREATED_ASC = 'createdAt:asc',
}

export enum ECurrency {
    USD = 'USD',
    EUR = 'EUR',
    UAH = 'UAH',
}

export interface IWish {
    id: string;
    userId: IUser['id'];
    material: boolean;
    show: EPrivacy;
    name: string;
    images: IImage[];
    price?: string;
    currency: ECurrency;
    addresses?: IAddress[];
    description: string;
    executed: boolean;
    booking?: IBooking;
    likes: ILike[];
    dislikes: ILike[];
}

export interface IWishCandidate {
    name: IWish['name'];
    image: string;
    url: string;
    price: IWish['price'];
    description: IWish['description'];
}

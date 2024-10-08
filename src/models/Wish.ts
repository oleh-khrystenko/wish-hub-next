import { Dayjs } from 'dayjs';
import { IUser } from '@/models/User';
import { EPrivacy } from '@/models/Settings';
import { ICollection } from '@/models/Collection';

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

export type TWishSort =
    | 'sortByLikes:desc'
    | 'priceInBaseCurrency:desc'
    | 'priceInBaseCurrency:asc'
    | 'createdAt:desc'
    | 'createdAt:asc'
    | `collectionId:${ICollection['id']}`;

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
    selected?: boolean;
}

export interface IWishCandidate {
    name: IWish['name'];
    image: string;
    url: string;
    price: IWish['price'];
    description: IWish['description'];
}

export type TWishFormInputs = {
    name: IWish['name'];
    price: IWish['price'];
    addresses: IWish['addresses'];
    description: IWish['description'];
    collection: ICollection['name'];
};

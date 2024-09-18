import { TCurrentImage, IWish, EWishStatus, EWishSort } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IQuote } from '@/models/Quote';

export interface ICreateWish {
    userId: IUser['id'];
    material: IWish['material'];
    name: IWish['name'];
    images: TCurrentImage[];
    price?: IWish['price'];
    currency?: IWish['currency'] | string;
    addresses?: IWish['addresses'];
    description?: IWish['description'];
    show: IWish['show'];
}

export interface IUpdateWish extends ICreateWish {
    id: IWish['id'];
}

export interface IWishWithQuote {
    wish: IWish;
    quote: IQuote;
}

export interface IWishAction {
    wishId: IWish['id'];
    userId?: IUser['id'];
}

export interface ISendAllWishes {
    page: number;
    limit: number;
    status: EWishStatus;
    search: string;
    sort: EWishSort;
}

export interface ISendWishList extends ISendAllWishes {
    myId?: IUser['id'];
    userId: IUser['id'];
}

export interface IGetWish {
    creator: IUser;
    wish: IWish;
}

export interface IGetWishList {
    creator: IUser;
    wishes: IWish[];
}

export interface IBookWish extends IActionWish {
    end: string;
}

export interface IActionWish {
    userId: IUser['id'];
    wishId: IWish['id'];
}

export enum EWhoseWish {
    MY = 'my',
    SOMEONE = 'someone',
}

export interface IDoneWish extends IActionWish {
    whoseWish: EWhoseWish;
}

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

export interface IDeleteWish {
    userId: IUser['id'];
    wishId: IWish['id'];
}

export interface ISendWish {
    wishId: IWish['id'];
}

export interface ISendAllWishes {
    page: number;
    limit: number;
    search: string;
    sort: EWishSort;
}

export interface ISendWishList extends ISendAllWishes {
    myId?: IUser['id'];
    userId: IUser['id'];
    status: EWishStatus;
}

export interface IGetWish {
    userFirstName: IUser['firstName'];
    userLastName: IUser['lastName'];
    userAvatar: IUser['avatar'];
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

import { TCurrentImage, IWish, EWishStatus, TWishSort } from '@/models/Wish';
import { IUser } from '@/models/User';
import { IQuote } from '@/models/Quote';
import { ICollection } from '@/models/Collection';

export interface IEditorWish {
    userId: IUser['id'];
    material: IWish['material'];
    name: IWish['name'];
    images: TCurrentImage[];
    price?: IWish['price'];
    currency?: IWish['currency'] | string;
    addresses?: IWish['addresses'];
    description?: IWish['description'];
    collectionName?: ICollection['name'];
    show: IWish['show'];
}

export interface ICreateWish extends IEditorWish {
    collectionIdList?: ICollection['id'][];
}

export interface IUpdateWish extends IEditorWish {
    id: IWish['id'];
    collectionIdList?: {
        id: ICollection['id'];
        selected: boolean;
    }[];
}

export interface IWishWithQuote {
    wish: IWish;
    quote: IQuote;
}

export interface IGetAnyWish {
    wishId: IWish['id'];
}

export interface IActionWish extends IGetAnyWish {
    userId: IUser['id'];
}

export interface ISendAllWishes {
    page: number;
    limit: number;
    status: EWishStatus;
    search: string;
    sort: TWishSort;
}

export interface ISendWishList extends ISendAllWishes {
    myId?: IUser['id'];
    userId: IUser['id'];
}

export interface ISendCollectionWishes extends ISendWishList {
    collectionId: ICollection['id'];
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

export enum EWhoseWish {
    MY = 'my',
    SOMEONE = 'someone',
}

export interface IDoneWish extends IActionWish {
    whoseWish: EWhoseWish;
}

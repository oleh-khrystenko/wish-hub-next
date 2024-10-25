import { ECollectionSort, ICollection } from '@/models/Collection';
import { IUser } from '@/models/User';
import { IWish } from '@/models/Wish';

export interface ISendCreateCollection {
    userId: IUser['id'];
    wishIdList: ICollection['wishIdList'];
    name: ICollection['name'];
}

export interface ICollectionId {
    collectionId: ICollection['id'];
}

export interface ISendUpdateCollection
    extends ISendCreateCollection,
        ICollectionId {}

export interface ISendGetCollections {
    myId?: IUser['id'];
    userId: IUser['id'];
    page: number;
    limit: number;
    search: string;
    sort: ECollectionSort;
}

export interface ISendGetWishCollections {
    wishId: IWish['id'];
    page: number;
    limit: number;
}

export interface IGetCollections {
    collections: ICollection[];
    limit: number;
    page: number;
    total: number;
}

export interface ISendDeleteCollection extends ICollectionId {
    userId: IUser['id'];
}

export interface IDeleteCollection extends ICollectionId {
    message: string;
}

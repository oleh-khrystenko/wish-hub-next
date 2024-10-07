import { ECollectionSort, ICollection } from '@/models/Collection';
import { IUser } from '@/models/User';

export interface ISendCreateCollection {
    userId: IUser['id'];
    wishIdList: ICollection['wishIdList'];
    name: ICollection['name'];
}

export interface ISendUpdateCollection extends ISendCreateCollection {
    collectionId: ICollection['id'];
}

export interface ISendGetCollections {
    myId?: IUser['id'];
    userId: IUser['id'];
    page: number;
    limit: number;
    search: string;
    sort: ECollectionSort;
}

export interface IGetCollections {
    collections: ICollection[];
    limit: number;
    page: number;
    total: number;
}

export interface ISendDeleteCollection {
    collectionId: ICollection['id'];
    userId: IUser['id'];
}

export interface IDeleteCollection {
    collectionId: ICollection['id'];
    message: string;
}

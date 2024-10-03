import { ECollectionSort, ICollection } from '@/models/Collection';
import { IUserId } from '@/stores/my-user/types';

export interface ISendCreateCollection extends IUserId {
    wishIdList: ICollection['wishIdList'];
    name: ICollection['name'];
}

export interface ISendGetCollections extends IUserId {
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

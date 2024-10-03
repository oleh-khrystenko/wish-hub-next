import { IUser } from '@/models/User';
import { IWish } from '@/models/Wish';

export interface ICollection {
    id: string;
    userId: IUser['id'];
    wishIdList: IWish['id'][];
    name: string;
}

export enum ECollectionSort {
    CREATED_DESC = 'createdAt:desc',
    CREATED_ASC = 'createdAt:asc',
    NAME_DESC = 'name:desc',
    NAME_ASC = 'name:asc',
}

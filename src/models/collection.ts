import { IUser } from '@/models/user';
import { IWish } from '@/models/wish';

export interface ICollection {
    id: string;
    userId: IUser['id'];
    wishIdList: IWish['id'][];
    name: string;
    selected?: boolean;
    slug?: string;
}

export enum ECollectionSort {
    CREATED_DESC = 'createdAt:desc',
    CREATED_ASC = 'createdAt:asc',
    TITLE_DESC = 'name:desc',
    TITLE_ASC = 'name:asc',
}

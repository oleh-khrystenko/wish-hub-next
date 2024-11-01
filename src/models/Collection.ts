import { IUser } from '@/models/User';
import { IWish } from '@/models/Wish';

export interface ICollection {
    id: string;
    userId: IUser['id'];
    wishIdList: IWish['id'][];
    name: string;
    selected?: boolean;
    nameSlug?: string;
}

export enum ECollectionSort {
    CREATED_DESC = 'createdAt:desc',
    CREATED_ASC = 'createdAt:asc',
    TITLE_DESC = 'name:desc',
    TITLE_ASC = 'name:asc',
}

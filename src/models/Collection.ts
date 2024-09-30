import { IUser } from '@/models/User';
import { IWish } from '@/models/Wish';

export interface ICollection {
    id: string;
    userId: IUser['id'];
    wishIdList: IWish['id'][];
    name: string;
}

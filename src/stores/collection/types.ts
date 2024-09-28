import { ICollection } from '@/models/Collection';
import { IUserId } from '@/stores/my-user/types';

export interface ICreateCollection extends IUserId {
    wishIdList: ICollection['wishes'];
    name: ICollection['name'];
}

export interface IGetCollection extends IUserId {
    collectionId: ICollection['id'];
}

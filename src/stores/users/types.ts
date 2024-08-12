import { IUser } from '@/models/User';

export interface ISendAllUsersParams {
    page: number;
    limit: number;
    search: string;
}

export enum EUserType {
    ALL = 'all',
    FRIENDS = 'friends',
    FOLLOW_FROM = 'followFrom',
    FOLLOW_TO = 'followTo',
}

export interface ISendUsersParams extends ISendAllUsersParams {
    myUserId: IUser['id'];
    userType: EUserType;
}

export interface IGetUsers {
    followFromCount: number;
    users: IUser[];
}

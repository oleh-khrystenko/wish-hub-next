import { Dayjs } from 'dayjs';
import { IUser } from '@/models/User';

export interface IReview {
    id: string;
    userId: IUser['id'];
    authorFullName: string;
    authorAvatar?: string;
    text?: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    updatedAt: Dayjs;
}

export interface ISendReview {
    userId: IUser['id'];
    text?: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface ISendReviews {
    lang: string;
    page: number;
    limit: number;
}

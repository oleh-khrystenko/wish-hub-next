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

export interface IReviews {
    reviews: IReview[];
    userReview: IReview;
}

export interface ICreateReview {
    userId: IUser['id'];
    text?: IReview['text'];
    rating: IReview['rating'];
}

export interface IReviewId {
    reviewId: IReview['id'];
}

export interface ISendReviews {
    page: number;
    limit: number;
    userId?: IUser['id'];
}

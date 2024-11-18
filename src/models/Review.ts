import { Dayjs } from 'dayjs';

export interface IReview {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    text: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    timestamp: Dayjs;
}

export interface ISendReview {
    fullName: string;
    email: string;
    avatar: string;
    text: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface ISendReviews {
    lang: string;
    page: number;
    limit: number;
}

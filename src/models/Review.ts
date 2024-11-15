import { Dayjs } from 'dayjs';

export interface IReview {
    id: string;
    fullName: string;
    email: string;
    avatar: string;
    text: string;
    rate: string;
    timestamp: Dayjs;
}

export interface ISendReview {
    fullName: string;
    email: string;
    avatar: string;
    text: string;
    rate: string;
}

export interface ISendReviews {
    lang: string;
    page: number;
    limit: number;
}

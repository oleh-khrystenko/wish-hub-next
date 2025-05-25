import { Dayjs } from 'dayjs';

export interface IMeta {
    title: string;
    description: string;
}

export interface IArticle {
    id: string;
    slug: string;
    meta: IMeta;
    title: string;
    description: string;
    preview: string;
    readingTime: string;
    content: string;
    createdAt: Dayjs;
    updatedAt: Dayjs;
}

export interface ISendArticle {
    articleId: string;
    lang: string;
}

export interface ISendArticles {
    lang: string;
    page: number;
    limit: number;
}

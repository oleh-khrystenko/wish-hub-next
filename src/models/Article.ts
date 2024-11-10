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
    content: string;
    createdAt: string;
    updatedAt: string;
}

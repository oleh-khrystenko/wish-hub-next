import { Metadata } from 'next';
import axios, { AxiosResponse } from 'axios';
import { IArticle } from '@/models/Article';
import { ELang } from '@/models/Settings';
import { fetchMetadata } from '@/helpers/utils/metadata';
import PageContent from '@/app/[locale]/blog/PageContent';
import ErrorContent from '@/app/[locale]/blog/[articleSlug]/ErrorContent';

const api = axios.create({
    withCredentials: true,
    baseURL:
        process.env.NODE_ENV === 'development'
            ? process.env.NEXT_PUBLIC_DEV_API_URL
            : process.env.NEXT_PUBLIC_API_URL,
});

const getArticles = async (params: {
    lang: string;
    page: number;
    limit: number;
}): Promise<AxiosResponse<IArticle[]> | null> => {
    try {
        return await api.get('/articles', { params });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 400) {
                console.error('400 Error: Bad Request', error.response.data);
                return null;
            }
        }

        throw error;
    }
};

interface IPageParams {
    params: {
        locale: ELang;
    };
}

// Функція для отримання даних з сервера
const getData = async (lang: string) => {
    const res = await getArticles({
        lang,
        page: 1,
        limit: 24,
    });

    if (!res) {
        throw new Error('Article list not found or Bad Request');
    }

    return res.data;
};

// Функція для генерації метаданих
export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'blog', 'blog');
}

const Blog = async ({ params }: IPageParams) => {
    try {
        const articles = await getData(params.locale);

        return <PageContent articles={articles} />;
    } catch (error) {
        console.error('Error: ', error);

        return <ErrorContent />;
    }
};

export default Blog;

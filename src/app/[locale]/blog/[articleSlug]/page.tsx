import { Metadata } from 'next';
import axios, { AxiosResponse } from 'axios';
import { IArticle } from '@/models/Article';
import { ELang } from '@/models/Settings';
import { fetchMetadata } from '@/helpers/utils/metadata';
import { ARTICLE_SLUG_TO_ID_MAP } from '@/helpers/utils/constants';
import PageContent from '@/app/[locale]/blog/[articleSlug]/PageContent';
import ErrorContent from '@/app/[locale]/blog/[articleSlug]/ErrorContent';

const api = axios.create({
    withCredentials: true,
    baseURL:
        process.env.NODE_ENV === 'development'
            ? process.env.NEXT_PUBLIC_DEV_API_URL
            : process.env.NEXT_PUBLIC_API_URL,
});

const getArticle = async (params: {
    articleId: string;
    lang: string;
}): Promise<AxiosResponse<IArticle> | null> => {
    try {
        return await api.get('/article', { params });
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
        articleSlug: string;
    };
}

// Функція для отримання даних з сервера
const getData = async (articleSlug: string, lang: string) => {
    const res = await getArticle({
        articleId: ARTICLE_SLUG_TO_ID_MAP[articleSlug],
        lang,
    });

    if (!res) {
        throw new Error('Article not found or Bad Request');
    }

    return res.data;
};

// Функція для генерації метаданих
export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    const data = await getData(params.articleSlug, params.locale);

    return await fetchMetadata(
        params.locale,
        null,
        `blog/${params.articleSlug}`,
        data.meta
    );
}

const Article = async ({ params }: IPageParams) => {
    try {
        const data = await getData(params.articleSlug, params.locale);

        return <PageContent data={data} />;
    } catch (error) {
        console.error('Error: ', error);

        return <ErrorContent />;
    }
};

export default Article;

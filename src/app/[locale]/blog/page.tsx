import { Metadata } from 'next';
import { IPageParams } from '@/models/settings';
import { fetchMetadata } from '@/helpers/utils/metadata';
import PageContent from '@/app/[locale]/blog/PageContent';
import ErrorPage from '@/components/layouts/ErrorPage';
import articleApi from '@/helpers/api/article';

// Функція для отримання даних з сервера
const getData = async (lang: string) => {
    const res = await articleApi.getArticles({
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

        return <ErrorPage />;
    }
};

export default Blog;

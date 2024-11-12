import { Metadata } from 'next';
import { ELang } from '@/models/Settings';
import articleApi from '@/helpers/api/article';
import { fetchMetadata } from '@/helpers/utils/metadata';
import { ARTICLE_SLUG_TO_ID_MAP } from '@/helpers/utils/constants';
import PageContent from '@/app/[locale]/blog/[articleSlug]/PageContent';
import ErrorContent from '@/app/[locale]/blog/[articleSlug]/ErrorContent';

interface IPageParams {
    params: {
        locale: ELang;
        articleSlug: string;
    };
}

// Функція для отримання даних з сервера
const getData = async (articleSlug: string, lang: string) => {
    const res = await articleApi.getArticle({
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

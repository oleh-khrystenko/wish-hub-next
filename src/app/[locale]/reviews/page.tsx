import { Metadata } from 'next';
import { IPageParams } from '@/models/Settings';
import { fetchMetadata } from '@/helpers/utils/metadata';
import reviewApi from '@/helpers/api/review';
import PageContent from '@/app/[locale]/reviews/PageContent';
import ErrorPage from '@/components/layouts/ErrorPage';

// Функція для отримання даних з сервера
const getData = async (lang: string) => {
    const res = await reviewApi.getReviews({
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
    return await fetchMetadata(params.locale, 'reviews', 'reviews');
}

const Reviews = async ({ params }: IPageParams) => {
    try {
        const reviews = await getData(params.locale);

        return <PageContent reviews={reviews} />;
    } catch (error) {
        console.error('Error: ', error);

        return <ErrorPage />;
    }
};

export default Reviews;

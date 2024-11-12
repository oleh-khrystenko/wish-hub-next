import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import MainIcon from '@/components/icons/MainIcon';
import BlogIcon from '@/components/icons/BlogIcon';
import { IArticle } from '@/models/Article';

interface IProps {
    articles: IArticle[];
}

const Body: FC<IProps> = ({ articles }) => {
    const blogPageT = useTranslations('blog-page');
    const allPagesT = useTranslations('all-pages');

    const breadcrumbsPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: 'blog',
            icon: (
                <BlogIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('blog'),
        },
    ];

    return (
        <main className="mx-auto mt-3 w-full max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <section className="mt-6 flex flex-col gap-5 px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                <h1 className="text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                    {blogPageT('title')}
                </h1>

                <ul>
                    {articles.map((article) => (
                        <li key={article.id}>{article.title}</li>
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Body;

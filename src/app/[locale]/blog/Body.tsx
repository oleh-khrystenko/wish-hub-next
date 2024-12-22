import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { IArticle } from '@/models/article';
import ArticleItem from '@/app/[locale]/blog/ArticleItem';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import MainIcon from '@/components/icons/MainIcon';
import BlogIcon from '@/components/icons/BlogIcon';

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
                <BlogIcon classes="w-4 h-4 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
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

                <ul className="grid grid-cols-2 gap-1.5 tablet-md:grid-cols-3 tablet-lg:grid-cols-4 tablet-lg:gap-4">
                    {articles.map((article) => (
                        <ArticleItem key={article.id} article={article} />
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Body;

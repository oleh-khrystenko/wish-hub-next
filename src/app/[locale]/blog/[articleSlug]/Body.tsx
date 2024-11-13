import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { IArticle } from '@/models/Article';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import MainIcon from '@/components/icons/MainIcon';
import BlogIcon from '@/components/icons/BlogIcon';
import ArticleIcon from '@/components/icons/ArticleIcon';

interface IProps {
    data: IArticle;
}

const Body: FC<IProps> = ({ data }) => {
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
        {
            href: `blog/${data.slug}`,
            icon: (
                <ArticleIcon classes="w-4 h-4 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: data.title,
        },
    ];

    return (
        <div className="mx-auto mt-3 w-full max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-6 flex flex-col gap-5 px-4 pb-10 desktop-sm:px-0 desktop-sm:pb-14">
                <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300 tablet-lg:text-4xl">
                    {data.title}
                </h1>

                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
        </div>
    );
};

export default Body;

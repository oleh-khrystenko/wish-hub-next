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
                <BlogIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('blog'),
        },
        {
            href: `blog/${data.slug}`,
            icon: (
                <ArticleIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
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

            <div className="mt-6 flex flex-col gap-5 px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                <h1 className="text-3xl font-bold text-zinc-700 dark:text-zinc-300 tablet-lg:text-4xl">
                    {data.title}
                </h1>

                <div className="absolute -left-full -top-full hidden opacity-0">
                    <div className="flex flex-col gap-5"></div>
                    <div className="grid gap-5 tablet-lg:grid-cols-5 tablet-lg:items-center tablet-lg:gap-6"></div>
                    <div className="flex flex-col gap-2 tablet-lg:col-span-3"></div>
                    <div className="text-xl font-bold text-zinc-700 dark:text-zinc-300 desktop-xs:text-2xl"></div>
                    <div className="text-zinc-700 dark:text-zinc-300 desktop-xs:text-lg"></div>
                    <div className="relative w-full overflow-hidden rounded-lg pt-[45%] tablet-lg:col-span-2"></div>
                    <div className="absolute inset-0 h-full w-full object-cover"></div>
                    <div className="order-1 flex flex-col gap-2 tablet-lg:col-span-3"></div>
                </div>

                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
        </div>
    );
};

export default Body;

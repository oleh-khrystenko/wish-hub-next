'use client';

import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';
import { IArticle } from '@/models/Article';
import { useSettingsStore } from '@/stores/settings';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import UiButton from '@/components/ui/UiButton';
import UiImage from '@/components/ui/UiImage';

interface IProps {
    article: IArticle;
}

const ArticleItem: FC<IProps> = ({ article }) => {
    const activeLocale = useLocale();
    const blogPageT = useTranslations('blog-page');

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const { getFullDate } = UseLocaleFormats();

    return (
        <li>
            <UiButton
                href={`/blog/${article.slug}`}
                variant="clear-styles"
                classesWrap="group flex h-full w-full flex-col items-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 px-2 pb-3 pt-2"
                onLinkClick={() => setShowGlobalLoading(true)}
            >
                <div className="relative w-full overflow-hidden rounded-md pt-[100%]">
                    <UiImage
                        src={article.preview}
                        alt={article.title}
                        priority={true}
                    />

                    <div className="absolute inset-x-0 bottom-0 flex h-0 w-full items-center justify-center overflow-hidden bg-zinc-300 p-0 opacity-90 transition-all duration-300 ease-in-out group-hover:h-full group-hover:px-2 group-hover:py-3 dark:bg-zinc-700">
                        <p className="text-justify text-sm text-zinc-800 dark:text-zinc-300">
                            {article.description}
                        </p>
                    </div>
                </div>

                <p className="mt-2 w-full text-lg font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-xl">
                    {article.title}
                </p>

                <div className="mt-auto flex w-full items-center justify-between gap-3 pt-2">
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 tablet-md:text-sm">
                        {dayjs(article.updatedAt)
                            .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
                            .format(getFullDate())}
                    </p>

                    <p
                        className="text-xs text-zinc-600 dark:text-zinc-400 tablet-md:text-sm"
                        title={blogPageT('reading_time')}
                    >
                        {article.readingTime} {blogPageT('minutes')}
                    </p>
                </div>
            </UiButton>
        </li>
    );
};

export default ArticleItem;

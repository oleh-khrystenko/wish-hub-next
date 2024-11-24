import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Tabs from '@/app/[locale]/instruction/Tabs';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiImage from '@/components/ui/UiImage';
import MainIcon from '@/components/icons/MainIcon';
import YouTubeIcon from '@/components/icons/YouTubeIcon';

const Body: FC = () => {
    const instructionPageT = useTranslations('instruction-page');
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
            href: 'instruction',
            icon: <YouTubeIcon classes="w-4 h-4" />,
            name: allPagesT('instruction'),
        },
    ];

    return (
        <main className="mx-auto mt-3 max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-6 flex flex-col gap-5 px-4 pb-6 desktop-sm:px-0 desktop-sm:pb-10">
                <section className="flex flex-col">
                    <h1 className="text-center text-3xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-4xl">
                        {instructionPageT('title_before')}
                        <span className="whitespace-nowrap">Wish Hub</span>
                        {instructionPageT('title_after')}
                    </h1>

                    <div className="mt-5 flex items-center justify-evenly gap-8 tablet-xl:gap-12">
                        <div>
                            <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-xl">
                                {instructionPageT('subtitle')}
                            </p>

                            <p className="mt-3 font-medium text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-lg">
                                {instructionPageT('here_you_find')}
                            </p>

                            <p className="mt-6 pl-2 text-sm text-zinc-700 dark:text-zinc-300 tablet-md:mt-8 tablet-md:pl-8 tablet-md:text-justify tablet-md:text-base">
                                {instructionPageT('list_title')}
                            </p>

                            <ul className="mt-2 flex list-disc flex-col gap-1 pl-8 marker:text-zinc-700 marker:dark:text-zinc-300 tablet-md:pl-14">
                                <li>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                        {instructionPageT('tips_and_tricks')}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                        {instructionPageT(
                                            'instructions_for_setting'
                                        )}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                        {instructionPageT('tips_for_making')}
                                    </p>
                                </li>
                                <li>
                                    <p className="text-sm text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                        {instructionPageT('unlock')}
                                    </p>
                                </li>
                            </ul>

                            <p className="mt-6 text-sm font-bold text-zinc-700 dark:text-zinc-300 tablet-md:mt-8 tablet-md:text-justify tablet-md:text-base">
                                {instructionPageT('dont_miss')}
                            </p>

                            <p className="mt-1 text-sm font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-justify tablet-md:text-base">
                                {instructionPageT('subscribe')}
                            </p>
                        </div>

                        <div className="relative hidden h-0 w-full pt-[33%] tablet-lg:block">
                            <UiImage
                                src="/images/instruction.svg"
                                alt={allPagesT('instruction')}
                            />
                        </div>
                    </div>

                    <Tabs />
                </section>
            </div>
        </main>
    );
};

export default Body;

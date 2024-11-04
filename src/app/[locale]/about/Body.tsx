import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import UiImage from '@/components/ui/UiImage';
import InfoIcon from '@/components/icons/InfoIcon';
import MainIcon from '@/components/icons/MainIcon';

const Body: FC = () => {
    const aboutPageT = useTranslations('about-page');
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
            href: 'about',
            icon: (
                <InfoIcon classes="w-4 h-4 stroke-zinc-200 dark:stroke-zinc-400" />
            ),
            name: allPagesT('about'),
        },
    ];

    return (
        <main className="mx-auto mt-3 w-full max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <section className="mt-6 grid px-4 pb-10 tablet-lg:grid-cols-5 tablet-lg:gap-5 desktop-sm:px-0 desktop-sm:pb-10">
                <div className="flex flex-col gap-5 tablet-lg:col-span-3">
                    <h1 className="text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('title')}
                    </h1>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('greetings')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('wish_hub_is')}
                    </p>
                </div>

                <div className="relative w-full pt-[100%] tablet-md:pt-[70%] tablet-lg:col-span-2 tablet-lg:row-span-2">
                    <UiImage
                        src="/images/about-us.svg"
                        alt={allPagesT('about')}
                    />
                </div>

                <div className="flex flex-col gap-5 tablet-lg:col-span-3">
                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('the_idea')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('our_mission')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('join')}
                    </p>
                </div>

                {/*<section className="flex flex-col gap-5">*/}
                {/*    <h2 className="text-center text-xl font-bold text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('sub-title')}*/}
                {/*    </h2>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('do_you_have')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('it_likely')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('what_about')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('it_appears_to')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('probably')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('what_other_factors')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('today_we')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('but_what')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('profound')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('let_delve')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('there_are_so')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('yes_money_it')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('and_finally')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('you_know')}*/}
                {/*    </p>*/}

                {/*    <p className="text-justify text-zinc-700 dark:text-zinc-300">*/}
                {/*        {aboutPageT('this_web')}*/}
                {/*    </p>*/}
                {/*</section>*/}
            </section>
        </main>
    );
};

export default Body;

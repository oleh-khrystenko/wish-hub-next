import { FC } from 'react';
import { useTranslations } from 'next-intl';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import InfoIcon from '@/components/icons/InfoIcon';

const Content: FC = () => {
    const aboutPageT = useTranslations('about-page');

    const pages = [
        {
            href: 'about',
            icon: (
                <InfoIcon classes="w-4 h-4 stroke-zinc-200 dark:stroke-zinc-400" />
            ),
            name: aboutPageT('title'),
        },
    ];

    return (
        <div className="mt-3">
            <Breadcrumbs pages={pages} />

            <div className="mt-6 flex flex-col gap-5 px-4 pb-6 tablet-md:px-0 tablet-md:pb-10">
                <section className="flex flex-col gap-5">
                    <h1 className="text-center text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('title')}
                    </h1>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('hello')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('wish_hub_is')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('our_mission')}
                    </p>
                </section>

                <section className="flex flex-col gap-5">
                    <h2 className="text-center text-xl font-bold text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('sub-title')}
                    </h2>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('do_you_have')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('it_likely')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('what_about')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('it_appears_to')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('probably')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('what_other_factors')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('today_we')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('but_what')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('profound')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('let_delve')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('there_are_so')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('yes_money_it')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('and_finally')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('you_know')}
                    </p>

                    <p className="text-justify text-zinc-700 dark:text-zinc-300">
                        {aboutPageT('this_web')}
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Content;

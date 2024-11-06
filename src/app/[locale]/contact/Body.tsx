import { FC } from 'react';
import { useTranslations } from 'next-intl';
import ContactForm from '@/app/[locale]/contact/ContactForm';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import SocialNetworks from '@/components/layouts/SocialNetworks';
import MainIcon from '@/components/icons/MainIcon';
import ForumIcon from '@/components/icons/ForumIcon';

const Body: FC = () => {
    const contactPageT = useTranslations('contact-page');
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
            href: 'contact',
            icon: (
                <ForumIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('contact'),
        },
    ];

    return (
        <main className="mx-auto mt-3 w-full max-w-7xl">
            <Breadcrumbs
                seoPages={breadcrumbsPages}
                visualPages={breadcrumbsPages}
            />

            <div className="mt-6 flex flex-col gap-5 px-4 pb-10 desktop-sm:px-0 desktop-sm:pb-10">
                <h1 className="text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                    {contactPageT('title')}
                </h1>

                <div className="flex w-full flex-col gap-7 tablet-md:flex-row">
                    <div className="flex w-max flex-col gap-5">
                        <p className="flex flex-col text-zinc-600 dark:text-zinc-400 mobile-sm:flex-row mobile-sm:gap-1.5">
                            <span className="whitespace-nowrap">
                                {allPagesT('email')}
                            </span>
                            <a
                                href="mailto:wish.hub.net@gmail.com"
                                className="text-cyan-400 dark:text-cyan-300"
                            >
                                wish.hub.net@gmail.com
                            </a>
                        </p>

                        <p className="text-zinc-600 dark:text-zinc-400">
                            {allPagesT('phone')}{' '}
                            <a
                                href="tel:+380508899268"
                                className="text-cyan-400 dark:text-cyan-300"
                            >
                                +38 050 88 99 268
                            </a>
                        </p>

                        <div className="flex flex-col gap-4">
                            <p className="text-zinc-600 dark:text-zinc-400">
                                {contactPageT('social-networks')}
                            </p>

                            <div className="flex items-center justify-evenly gap-4">
                                <SocialNetworks />
                            </div>
                        </div>
                    </div>

                    <ContactForm />
                </div>

                <p className="mt-4 text-zinc-600 dark:text-zinc-400">
                    {contactPageT('address')}
                </p>

                <div className="relative h-0 w-full overflow-hidden rounded-lg pt-[80%] tablet-md:pt-[56.25%]">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.681824325664!2d34.55254509201882!3d49.58489047567495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d82f5fd7027cb3%3A0x4816d0f2a51762ca!2z0LLRg9C7LiDQndC10LHQtdGB0L3QvtGXINCh0L7RgtC90ZYsIDEzLCDQn9C-0LvRgtCw0LLQsCwg0J_QvtC70YLQsNCy0YHRjNC60LAg0L7QsdC70LDRgdGC0YwsIDM2MDAw!5e0!3m2!1sru!2sua!4v1730889427779!5m2!1sru!2sua"
                        className="absolute left-0 top-0 h-full w-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <p className="mt-4 text-sm text-zinc-500">
                    {contactPageT('contact-us')}
                </p>
            </div>
        </main>
    );
};

export default Body;

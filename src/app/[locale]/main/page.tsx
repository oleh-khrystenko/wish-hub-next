import { Metadata } from 'next';
import Head from 'next/head';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Sidebar from '@/app/[locale]/main/sidebar/Sidebar';
import Content from '@/app/[locale]/main/Content';
import BottomMenu from '@/app/[locale]/main/BottomMenu';
import Header from '@/components/layouts/header/Header';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'main');
}

const breadcrumbJsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://wish-hub.net/uk',
        },
        {
            '@type': 'ListItem',
            position: 2,
            name: 'Main Page',
            item: 'https://wish-hub.net/uk/main',
        },
    ],
});

export default function Main() {
    const messages = useMessages();

    return (
        <>
            <Head>
                {/* Breadcrumb Microdata */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
                />
                {/* End Breadcrumb Microdata */}
            </Head>

            <div className="flex h-svh flex-col tablet-md:gap-1 tablet-md:p-1">
                <NextIntlClientProvider
                    messages={pick(messages, [
                        'main-page',
                        'wish-page',
                        'share-button',
                        'alerts',
                        'validations',
                        'inactivated',
                    ])}
                >
                    <UserSessionRefresher>
                        <Header isMainPage />

                        <main className="flex grow overflow-hidden">
                            <Sidebar />

                            <Content />
                        </main>
                    </UserSessionRefresher>

                    <BottomMenu />

                    <GlobalLoading />
                </NextIntlClientProvider>
            </div>
        </>
    );
}

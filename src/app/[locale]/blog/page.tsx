import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Body from '@/app/[locale]/blog/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'blog', 'blog');
}

export default function Blog() {
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            messages={pick(messages, [
                'main-page',
                'share-button',
                'all-pages',
            ])}
        >
            <div className="flex min-h-screen flex-col">
                <UserSessionRefresher>
                    <Header />
                </UserSessionRefresher>

                <Body />

                <Footer remove="about" />
            </div>

            <GlobalLoading />
        </NextIntlClientProvider>
    );
}

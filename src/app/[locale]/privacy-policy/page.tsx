import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Body from '@/app/[locale]/privacy-policy/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(
        params.locale,
        'privacy-policy',
        'privacy-policy'
    );
}

export default function PrivacyPolicy() {
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            messages={pick(messages, [
                'main-page',
                'share-button',
                'all-pages',
            ])}
        >
            <UserSessionRefresher>
                <Header />
            </UserSessionRefresher>

            <Body />

            <Footer remove="privacy-policy" />

            <GlobalLoading />
        </NextIntlClientProvider>
    );
}

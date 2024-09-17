import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Content from '@/app/[locale]/privacy-policy/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'privacy-policy');
}

export default function PrivacyPolicy() {
    const messages = useMessages();

    return (
        <>
            <NextIntlClientProvider
                messages={pick(messages, [
                    'main-page',
                    'share-button',
                    'alerts',
                ])}
            >
                <UserSessionRefresher>
                    <Header />
                </UserSessionRefresher>
            </NextIntlClientProvider>

            <Content />

            <Footer remove="privacy-policy" />

            <GlobalLoading />
        </>
    );
}

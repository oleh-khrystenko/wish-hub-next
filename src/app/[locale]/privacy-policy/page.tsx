import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import Refresh from '@/helpers/hocs/Refresh';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Content from '@/app/[locale]/privacy-policy/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

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
                <Refresh>
                    <Header />
                </Refresh>
            </NextIntlClientProvider>

            <Content />

            <Footer remove="privacy-policy" />
        </>
    );
}

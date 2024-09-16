import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Content from '@/app/[locale]/about/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'about');
}

export default function About() {
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
                <Header />
            </NextIntlClientProvider>

            <Content />

            <Footer remove="about" />
        </>
    );
}

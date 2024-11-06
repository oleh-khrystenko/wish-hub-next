import { Metadata } from 'next';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Body from '@/app/[locale]/contact/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'contact', 'contact');
}

export default function Contact() {
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            messages={pick(messages, [
                'contact-page',
                'main-page',
                'share-button',
                'all-pages',
                'validations',
            ])}
        >
            <div className="flex min-h-screen flex-col">
                <UserSessionRefresher>
                    <Header />
                </UserSessionRefresher>

                <Body />

                <Footer remove="contact" />
            </div>

            <GlobalLoading />
        </NextIntlClientProvider>
    );
}

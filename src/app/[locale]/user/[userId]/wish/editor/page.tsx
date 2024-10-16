import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';
import Body from '@/app/[locale]/user/[userId]/wish/editor/Body';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(
        params.locale,
        'wish',
        `user/${params.userId}/wish/editor`
    );
}

export default function Wish() {
    const messages = useMessages();

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'wish-page',
                    'main-page',
                    'profile-page',
                    'share-button',
                    'all-pages',
                    'validations',
                ])}
            >
                <div className="mx-auto flex w-full max-w-7xl grow flex-col">
                    <UserSessionRefresher>
                        <Header />

                        <Body />
                    </UserSessionRefresher>
                </div>

                <Footer />

                <GlobalLoading />
            </NextIntlClientProvider>
        </div>
    );
}

import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Body from '@/app/[locale]/user/[userId]/collection/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(
        params.locale,
        'collection',
        `user/${params.userId}/collection`
    );
}

export default function Wish() {
    const messages = useMessages();

    return (
        <div className="flex min-h-screen flex-col justify-between">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'collection-page',
                    'main-page',
                    'profile-page',
                    'wish-page',
                    'share-button',
                    'all-pages',
                    'validations',
                ])}
            >
                <div className="mx-auto relative flex w-full max-w-7xl grow flex-col">
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

import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Body from '@/app/[locale]/user/[userId]/collection/wish/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'wish');
}

export default function WishList() {
    const messages = useMessages();

    return (
        <>
            <div className="flex h-full min-h-screen flex-col">
                <div className="mx-auto flex w-full max-w-7xl grow flex-col">
                    <NextIntlClientProvider
                        messages={pick(messages, [
                            'main-page',
                            'wish-page',
                            'share-button',
                            'all-pages',
                            'validations',
                        ])}
                    >
                        <UserSessionRefresher>
                            <Header />

                            <Body />
                        </UserSessionRefresher>

                        <GlobalLoading />
                    </NextIntlClientProvider>
                </div>

                <Footer />
            </div>
        </>
    );
}

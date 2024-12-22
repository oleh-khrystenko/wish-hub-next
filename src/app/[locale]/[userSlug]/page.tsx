import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Body from '@/app/[locale]/[userSlug]/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata | void> {
    if (!params.userSlug) return;
    return await fetchMetadata(params.locale, 'profile', params.userSlug);
}

export default function Profile() {
    const messages = useMessages();

    return (
        <div className="flex min-h-screen flex-col">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'profile-page',
                    'main-page',
                    'wish-page',
                    'share-button',
                    'all-pages',
                    'validations',
                    'inactivated',
                ])}
            >
                <UserSessionRefresher>
                    <RoutesGuard>
                        <Header />

                        <Body />
                    </RoutesGuard>
                </UserSessionRefresher>

                <Footer />

                <GlobalLoading />
            </NextIntlClientProvider>
        </div>
    );
}

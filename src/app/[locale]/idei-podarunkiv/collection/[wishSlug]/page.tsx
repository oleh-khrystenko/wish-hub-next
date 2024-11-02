import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import { IDEI_PODARUNKIV_SLUG } from '@/helpers/utils/constants';
import Body from '@/app/[locale]/idei-podarunkiv/collection/[wishSlug]/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(
        params.locale,
        'wish',
        `${IDEI_PODARUNKIV_SLUG}/collection/${params.wishSlug}`
    );
}

export default function WishList() {
    const messages = useMessages();

    return (
        <div className="flex h-full min-h-screen flex-col">
            <NextIntlClientProvider
                messages={pick(messages, [
                    'main-page',
                    'wish-page',
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

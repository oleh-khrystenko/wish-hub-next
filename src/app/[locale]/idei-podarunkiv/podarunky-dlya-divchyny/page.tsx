import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IPageParams } from '@/models/Settings';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import { fetchMetadata } from '@/helpers/utils/metadata';
import {
    IDEI_PODARUNKIV_SLUG,
    IDEI_PODARUNKIV_ID,
    PODARUNKY_DLYA_DIVCHYNY_SLUG,
    PODARUNKY_DLYA_DIVCHYNY_ID,
} from '@/helpers/utils/constants';
import Body from '@/app/[locale]/idei-podarunkiv/components/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

export async function generateMetadata({
    params,
}: IPageParams): Promise<Metadata> {
    return await fetchMetadata(
        params.locale,
        'collection',
        `${IDEI_PODARUNKIV_SLUG}/${PODARUNKY_DLYA_DIVCHYNY_SLUG}`
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
                <div className="relative mx-auto flex w-full max-w-7xl grow flex-col">
                    <UserSessionRefresher>
                        <Header />

                        <Body
                            userNameSlug={IDEI_PODARUNKIV_SLUG}
                            userId={IDEI_PODARUNKIV_ID}
                            collectionNameSlug={PODARUNKY_DLYA_DIVCHYNY_SLUG}
                            collectionId={PODARUNKY_DLYA_DIVCHYNY_ID}
                        />
                    </UserSessionRefresher>
                </div>

                <Footer />

                <GlobalLoading />
            </NextIntlClientProvider>
        </div>
    );
}

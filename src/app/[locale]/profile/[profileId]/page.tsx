import { Metadata } from 'next';
import { useMessages, NextIntlClientProvider } from 'next-intl';
import pick from 'lodash.pick';
import { IParams } from '@/models/Settings';
import Refresh from '@/helpers/hocs/Refresh';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import { fetchMetadata } from '@/helpers/utils/metadata';
import Content from '@/app/[locale]/profile/[profileId]/Content';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
    return await fetchMetadata(params.locale, 'profile');
}

export default function Profile() {
    const messages = useMessages();

    return (
        <>
            <NextIntlClientProvider
                messages={pick(messages, [
                    'profile-page',
                    'main-page',
                    'wish-page',
                    'share-button',
                    'alerts',
                    'validations',
                    'inactivated',
                ])}
            >
                <Refresh>
                    <RoutesGuard>
                        <Header />

                        <Content />
                    </RoutesGuard>
                </Refresh>
            </NextIntlClientProvider>

            <Footer />
        </>
    );
}

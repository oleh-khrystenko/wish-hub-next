import { FC } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IArticle } from '@/models/article';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import Body from '@/app/[locale]/blog/[articleSlug]/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

interface IProps {
    data: IArticle;
}

const PageContent: FC<IProps> = ({ data }) => {
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            messages={pick(messages, [
                'main-page',
                'share-button',
                'all-pages',
            ])}
        >
            <div className="flex min-h-screen flex-col">
                <UserSessionRefresher>
                    <Header />
                </UserSessionRefresher>

                <Body data={data} />

                <Footer />
            </div>

            <GlobalLoading />
        </NextIntlClientProvider>
    );
};

export default PageContent;

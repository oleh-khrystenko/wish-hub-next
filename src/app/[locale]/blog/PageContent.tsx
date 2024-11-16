import { FC } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IArticle } from '@/models/Article';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import Body from '@/app/[locale]/blog/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

interface IProps {
    articles: IArticle[];
}

const PageContent: FC<IProps> = ({ articles }) => {
    const messages = useMessages();

    return (
        <NextIntlClientProvider
            messages={pick(messages, [
                'blog-page',
                'main-page',
                'share-button',
                'all-pages',
            ])}
        >
            <div className="flex min-h-screen flex-col">
                <UserSessionRefresher>
                    <Header />
                </UserSessionRefresher>

                <Body articles={articles} />

                <Footer remove="blog" />
            </div>

            <GlobalLoading />
        </NextIntlClientProvider>
    );
};

export default PageContent;

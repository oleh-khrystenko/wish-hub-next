import { FC } from 'react';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import pick from 'lodash.pick';
import { IReview } from '@/models/Review';
import UserSessionRefresher from '@/helpers/hocs/UserSessionRefresher';
import Body from '@/app/[locale]/reviews/Body';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import GlobalLoading from '@/components/layouts/GlobalLoading';

interface IProps {
    reviews: IReview[];
}

const PageContent: FC<IProps> = ({ reviews }) => {
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

                <Body reviews={reviews} />

                <Footer remove="reviews" />
            </div>

            <GlobalLoading />
        </NextIntlClientProvider>
    );
};

export default PageContent;

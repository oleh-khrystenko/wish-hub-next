import {
    useTranslations,
    useMessages,
    NextIntlClientProvider,
} from 'next-intl';
import Refresh from '@/helpers/hocs/Refresh';
import MainContent from '@/app/[locale]/main/MainContent';
import Header from '@/components/layouts/header/Header';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import pick from 'lodash.pick';

export default function Main() {
    const t = useTranslations();
    const messages = useMessages();

    return (
        <main className="flex h-svh flex-col p-1 tablet-md:gap-1">
            <Refresh refreshT={t('alerts.my-user-api.refresh.error')}>
                <Header />

                <div className="flex grow gap-1 overflow-hidden">
                    <Sidebar />

                    <NextIntlClientProvider
                        messages={pick(messages, ['main-page'])}
                    >
                        <MainContent
                            uiShareButtonTranslations={{
                                shareTextT: t('share-button.share-text'),
                                shareWishHubSuccessT: t(
                                    'alerts.share-button.share.wish_hub_success'
                                ),
                                shareWishSuccessT: t(
                                    'alerts.share-button.share.wish_success'
                                ),
                                shareConsoleErrorT: t(
                                    'alerts.share-button.share.console-error'
                                ),
                                shareErrorT: t(
                                    'alerts.share-button.share.error'
                                ),
                                clipboardWishHubSuccessT: t(
                                    'alerts.share-button.clipboard.wish_hub_success'
                                ),
                                clipboardWishSuccessT: t(
                                    'alerts.share-button.clipboard.wish_success'
                                ),
                                clipboardConsoleErrorT: t(
                                    'alerts.share-button.clipboard.console-error'
                                ),
                                clipboardErrorT: t(
                                    'alerts.share-button.clipboard.error'
                                ),
                                titleModalT: t('confirm-modal.title'),
                                confirmModalT: t('confirm-modal.confirm'),
                                closeModalT: t('confirm-modal.close'),
                                questionNobodyT: t(
                                    'share-button.question-nobody'
                                ),
                                questionFriendsT: t(
                                    'share-button.question-friends'
                                ),
                            }}
                        />
                    </NextIntlClientProvider>
                </div>
            </Refresh>
        </main>
    );
}

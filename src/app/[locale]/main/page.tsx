import { useTranslations } from 'next-intl';
import Refresh from '@/helpers/hocs/Refresh';
import MainContent from '@/app/[locale]/main/MainContent';
import Header from '@/components/layouts/header/Header';
import Sidebar from '@/components/layouts/sidebar/Sidebar';

export default function Main() {
    const t = useTranslations();

    return (
        <main className="flex h-svh flex-col p-1 tablet-md:gap-1">
            <Refresh refreshT={t('alerts.my-user-api.refresh.error')}>
                <Header />

                <div className="flex grow gap-1 overflow-hidden">
                    <Sidebar />

                    <MainContent
                        titlePersonalT={t('main-page.title-personal')}
                        titleWishesT={t('main-page.title-wishes')}
                        TitleWishesT={t('main-page.Title-wishes')}
                        ofUserT={t('main-page.of-user')}
                        userNotFoundT={t('main-page.user_not_found')}
                        allT={t('main-page.all')}
                        unfulfilledT={t('main-page.unfulfilled')}
                        fulfilledT={t('main-page.fulfilled.plural')}
                        wishesSearchT={t('main-page.wishes-search')}
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
                            shareErrorT: t('alerts.share-button.share.error'),
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
                            questionNobodyT: t('share-button.question-nobody'),
                            questionFriendsT: t(
                                'share-button.question-friends'
                            ),
                        }}
                        shareWishesT={t('main-page.share-wishes')}
                        canSeeShareTooltipT={t(
                            `main-page.can-see.share-tooltip`
                        )}
                        canSeeInactiveShareTooltipT={t(
                            `main-page.can-see.inactive-share-tooltip`
                        )}
                        sortByPopularityT={t('main-page.sort.by-popularity')}
                        sortByPriceDownT={t('main-page.sort.by-price-down')}
                        sortByPriceUpT={t('main-page.sort.by-price-up')}
                        sortByCreatedUpT={t('main-page.sort.by-created-up')}
                        sortByCreatedDownT={t('main-page.sort.by-created-down')}
                    />
                </div>
            </Refresh>
        </main>
    );
}

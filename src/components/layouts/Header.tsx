import { useTranslations } from 'next-intl';
import UserSetting from '@/components/layouts/UserSetting';
import WishHub from '@/components/ui/WishHub';

function Header() {
    const t = useTranslations();

    return (
        <header className="flex w-full items-center justify-between gap-4 rounded-lg py-2 pl-1 pr-5 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800">
            <WishHub />

            <UserSetting
                singInT={t('sing-in')}
                userNotFoundT={t('main-page.user_not_found')}
                singUpT={t('sing-up')}
                myWishesT={t('main-page.my-wishes')}
                myProfileT={t('profile-page.my-profile')}
                interfaceLanguageT={t('main-page.interface_language')}
                themeT={t('main-page.theme')}
                aboutT={t('main-page.about')}
                shareTextT={t('share-button.share-text')}
                shareWishHubSuccessT={t(
                    'alerts.share-button.share.wish_hub_success'
                )}
                shareWishSuccessT={t('alerts.share-button.share.wish_success')}
                shareConsoleErrorT={t(
                    'alerts.share-button.share.console-error'
                )}
                shareErrorT={t('alerts.share-button.share.error')}
                clipboardWishHubSuccessT={t(
                    'alerts.share-button.clipboard.wish_hub_success'
                )}
                clipboardWishSuccessT={t(
                    'alerts.share-button.clipboard.wish_success'
                )}
                clipboardConsoleErrorT={t(
                    'alerts.share-button.clipboard.console-error'
                )}
                clipboardErrorT={t('alerts.share-button.clipboard.error')}
                confirmT={t('share-button.confirm')}
                questionNobodyT={t('share-button.question-nobody')}
                questionFriendsT={t('share-button.question-friends')}
                contactsT={t('main-page.contacts')}
                logoutT={t('logout')}
                privacyPolicyT={t('privacy-policy-page.title')}
            />
        </header>
    );
}

export default Header;

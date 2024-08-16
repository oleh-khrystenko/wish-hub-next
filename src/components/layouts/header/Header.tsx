import { useTranslations } from 'next-intl';
import UserSetting from '@/components/layouts/header/UserSetting';
import WishHub from '@/components/ui/WishHub';

function Header() {
    const t = useTranslations();

    return (
        <header className="flex w-full items-center justify-between gap-4 rounded-lg py-2 pl-1 pr-5 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800">
            <WishHub />

            <UserSetting
                logoutWithUpdate
                logoutErrorT={t('alerts.my-user-api.logout.error')}
                singInT={t('sing-in')}
                userNotFoundT={t('main-page.user_not_found')}
                singUpT={t('sing-up')}
                myWishesT={t('main-page.my-wishes')}
                myProfileT={t('profile-page.my-profile')}
                interfaceLanguageT={t('main-page.interface_language')}
                themeT={t('main-page.theme')}
                aboutT={t('main-page.about')}
                confirmT={t('share-button.confirm')}
                contactsT={t('main-page.contacts')}
                logoutT={t('logout')}
                privacyPolicyT={t('privacy-policy-page.title')}
            />
        </header>
    );
}

export default Header;

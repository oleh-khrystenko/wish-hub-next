import {useTranslations} from "next-intl";
import UserSetting from '@/components/layouts/UserSetting';
import WishHub from '@/components/ui/WishHub';

function Header() {
    const t = useTranslations();

    return (
        <header className="flex w-full items-center justify-between gap-4 rounded-lg py-2 pl-1 pr-5 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800">
            <WishHub />

            <UserSetting singInT={t('sing-in')} userNotFoundT={t('main-page.user_not_found')} />
        </header>
    );
}

export default Header;

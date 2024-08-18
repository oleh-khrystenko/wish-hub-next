import UserSetting from '@/components/layouts/header/UserSetting';
import UiBrand from '@/components/ui/UiBrand';

function Header() {
    return (
        <header className="flex w-full items-center justify-between gap-4 rounded-lg py-2 pl-1 pr-5 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800">
            <UiBrand isMainPage />

            <UserSetting logoutWithUpdate />
        </header>
    );
}

export default Header;

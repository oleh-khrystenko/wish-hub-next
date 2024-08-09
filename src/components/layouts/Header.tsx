import UserSetting from '@/components/layouts/UserSetting';
import WishHub from '@/components/ui/WishHub';

function Header() {
    return (
        <header className="flex w-full items-center justify-between gap-4 rounded-lg py-2 pl-1 pr-5 tablet-md:bg-zinc-300 tablet-md:dark:bg-zinc-800">
            <WishHub />
            <UserSetting />
        </header>
    );
}

export default Header;

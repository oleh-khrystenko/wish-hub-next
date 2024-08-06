import UserSetting from '@/components/layouts/UserSetting';

function Header() {
    return (
        <div className="flex items-center justify-between gap-5">
            <p className="text-zinc-800 dark:text-zinc-300">Header Logo</p>
            <UserSetting />
        </div>
    );
}

export default Header;

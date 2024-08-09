import TempNav from '@/app/[locale]/TempNav';
import Header from '@/components/layouts/Header';
import Refresh from '@/components/auth/Refresh';

export default function WishList() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-800 dark:text-zinc-300">
            <TempNav />
            <Header />
            <Refresh>Wish List page</Refresh>
        </main>
    );
}

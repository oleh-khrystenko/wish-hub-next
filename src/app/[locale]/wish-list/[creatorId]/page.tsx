import TempNav from '@/app/[locale]/TempNav';
import Header from '@/components/layouts/header/Header';
import Refresh from '@/helpers/hocs/Refresh';

export default function Wish() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-800 dark:text-zinc-300">
            <TempNav />
            <Header />
            Wish page
        </main>
    );
}

import UiLangSelect from '@/components/ui/UiLangSelect';
import { useLocale, useTranslations } from 'next-intl';
import TempNav from '@/app/[locale]/TempNav';
import Header from '@/components/layouts/Header';
import Refresh from '@/components/auth/Refresh';

export default function Welcome() {
    const t = useTranslations();
    const activeLocale = useLocale();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="lg:flex z-10 w-full max-w-5xl items-center justify-between text-sm text-zinc-800 dark:text-zinc-300">
                <TempNav />
                <Header />
                <Refresh>welcome page</Refresh>
            </div>
        </main>
    );
}

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import UiLangSelect from '@/components/ui/UiLangSelect';
import Header from '@/components/layouts/Header';
import TempNav from '@/app/[locale]/TempNav';
import Refresh from '@/components/auth/Refresh';

export default function Main() {
    const t = useTranslations();
    const activeLocale = useLocale();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-800 dark:text-zinc-300">
            <TempNav />
            <Header />
            <Refresh>main page</Refresh>
        </main>
    );
}

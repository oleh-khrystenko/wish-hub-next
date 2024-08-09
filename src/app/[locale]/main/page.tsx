import UiLangSelect from '@/components/ui/UiLangSelect';
import { useLocale, useTranslations } from 'next-intl';
import TempNav from '@/app/[locale]/TempNav';
import Header from '@/components/layouts/Header';
import Refresh from '@/components/auth/Refresh';

export default function Main() {
    const t = useTranslations();
    const activeLocale = useLocale();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 tablet-md:gap-5">
            <Header />
            <TempNav />
            <Refresh>main page</Refresh>
        </main>
    );
}

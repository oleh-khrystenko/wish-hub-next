import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Header from '@/components/layouts/header/Header';
import TempNav from '@/app/[locale]/TempNav';
import Refresh from '@/helpers/hocs/Refresh';

export default function Welcome() {
    const t = useTranslations();
    const activeLocale = useLocale();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 tablet-md:gap-5 tablet-md:p-5">
            <Header />
            <TempNav />
            <Refresh>Welcome page</Refresh>
        </main>
    );
}

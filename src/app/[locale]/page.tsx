import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Welcome() {
    const t = useTranslations();
    const activeLocale = useLocale();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 tablet-md:gap-5 tablet-md:p-5">
            Welcome page
        </main>
    );
}

import Link from 'next/link';
import UiSelect from '@/components/ui/UiSelect';
import { useLocale, useTranslations } from 'next-intl';

export default function Welcome() {
    const t = useTranslations();
    const activeLocale = useLocale();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="lg:flex z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
                <Link href={`/${activeLocale}/auth`}>auth</Link>
                welcome page
                {t('main-page.you_can_send')}
                <UiSelect />
            </div>
        </main>
    );
}

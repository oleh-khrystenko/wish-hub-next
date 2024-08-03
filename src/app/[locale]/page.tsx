import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import CustomSelect from '@/components/ui/CustomSelect';

export default function Main() {
    const t = useTranslations();
    const activeLocale = useLocale();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href={`/${activeLocale}/welcome`}>welcome</Link>
            main page
            <br />
            {t('main-page.you_can_send')}
            <CustomSelect />
        </main>
    );
}

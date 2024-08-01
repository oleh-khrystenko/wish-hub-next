import CustomSelect from "@/components/ui/CustomSelect";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export default function Auth() {
    const t = useTranslations();
    const activeLocale = useLocale();
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href={`/${activeLocale}/welcome`}>welcome</Link>
            <CustomSelect />
            auth page
            {t('main-page.you_can_send')}
        </main>
    );
}

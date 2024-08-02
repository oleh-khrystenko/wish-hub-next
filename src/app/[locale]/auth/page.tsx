import { useTranslations } from "next-intl";
import Form from "@/app/[locale]/auth/Form";
import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

export default function Auth() {
    const t = useTranslations();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            { t('main-page.you_can_send') }
            <br/>
            <br/>
            <ThemeSwitcher />
            <br/>
            <br/>
            <p className="text-primary dark:text-action">
                if dark action if light primary
            </p>
            <br/>
            <br/>
            <Form />
        </main>
    );
}

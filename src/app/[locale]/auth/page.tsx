import { useTranslations } from "next-intl";
import Form from "@/app/[locale]/auth/Form";

export default function Auth() {
    const t = useTranslations();

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            { t('main-page.you_can_send') }
            <Form />
        </main>
    );
}

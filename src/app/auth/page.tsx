import { useTranslation } from "next-i18next";

export default function Auth() {
    const { t } = useTranslation('common');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>{ t('wish') }</h1>
            auth page
        </main>
    );
}

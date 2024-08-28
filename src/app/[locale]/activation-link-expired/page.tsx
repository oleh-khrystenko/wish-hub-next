import ClientLogout from '@/app/[locale]/activation-link-expired/ClientLogout';
import TempNav from '@/app/[locale]/TempNav';

export default function ActivationLinkExpired() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-800 dark:text-zinc-300">
            <TempNav />
            <ClientLogout />
            activation-link-expired page wish RoutesGuard
        </main>
    );
}

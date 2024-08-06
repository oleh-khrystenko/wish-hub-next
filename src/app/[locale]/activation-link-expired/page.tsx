import ClientLogout from '@/app/[locale]/activation-link-expired/ClientLogout';
import RoutesGuard from '@/app/[locale]/RoutesGuard';

export default function ActivationLinkExpired() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-300">
            <RoutesGuard>
                <ClientLogout />
            </RoutesGuard>
            activation-link-expired page
        </main>
    );
}

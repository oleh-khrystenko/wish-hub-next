import { ParamsOnlyClient } from '@/app/[locale]/profile/[profileId]/ParamsOnlyClient';
import RoutesGuard from '@/helpers/hocs/RoutesGuard';
import TempNav from '@/app/[locale]/TempNav';
import Refresh from '@/helpers/hocs/Refresh';
import Header from '@/components/layouts/Header';

export default function Profile() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-800 dark:text-zinc-300">
            <TempNav />
            <Header />
            <Refresh>
                <RoutesGuard>Profile page Guard</RoutesGuard>
            </Refresh>
            <br />
            <ParamsOnlyClient />
        </main>
    );
}

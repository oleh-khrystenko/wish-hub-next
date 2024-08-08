import Link from 'next/link';
import { ParamsOnlyClient } from '@/app/[locale]/profile/[profileId]/ParamsOnlyClient';
import RoutesGuard from '@/app/[locale]/RoutesGuard';

export default function Profile() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-800 dark:text-zinc-300">
            <Link href="/welcome">welcome</Link>
            Profile page
            <br />
            <br />
            <RoutesGuard>header params</RoutesGuard>
            <br />
            <ParamsOnlyClient />
        </main>
    );
}

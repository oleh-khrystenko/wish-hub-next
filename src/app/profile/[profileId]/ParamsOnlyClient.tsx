'use client';

import { useParams, usePathname } from "next/navigation";

export function ParamsOnlyClient() {
    const params = useParams<{profileId: string}>();
    console.log('profileId: ', params.profileId);
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            You can use Params Only Client side
        </main>
    );
}
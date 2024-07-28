import Link from 'next/link';
import { ParamsOnlyClient } from "@/app/profile/[profileId]/ParamsOnlyClient";

export default function Profile() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href="/welcome">welcome</Link>
            Profile page
            <br/>
            <br/>
            <br/>
            <ParamsOnlyClient />
        </main>
    );
}

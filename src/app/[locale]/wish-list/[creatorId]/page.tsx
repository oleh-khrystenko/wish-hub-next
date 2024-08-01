import Link from "next/link";

export default function Wish() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href="/welcome">welcome</Link>
            Wish page
        </main>
    );
}

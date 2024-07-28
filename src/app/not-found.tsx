import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Link href="/">Home</Link>
            not found page
        </main>
    );
}

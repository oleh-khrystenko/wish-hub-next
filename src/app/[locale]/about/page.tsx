import Link from 'next/link';

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 text-zinc-800 dark:text-zinc-300">
            <Link href="/welcome">welcome</Link>
            About page
        </main>
    );
}

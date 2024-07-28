import Link from "next/link";

export default function Welcome() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <Link href="/">Home</Link>
                welcome page
            </div>
        </main>
    );
}

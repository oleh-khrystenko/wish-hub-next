import Header from '@/components/layouts/header/Header';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import Refresh from '@/helpers/hocs/Refresh';
import TempNav from '@/app/[locale]/TempNav';

export default function Main() {
    return (
        <main className="flex min-h-screen flex-col items-center p-1 tablet-md:gap-1">
            <Header />

            <div className="flex w-full grow gap-2">
                <Sidebar />

                <div>
                    <TempNav />
                    <Refresh>main page</Refresh>
                </div>
            </div>
        </main>
    );
}

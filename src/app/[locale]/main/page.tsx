import Header from '@/components/layouts/header/Header';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import Refresh from '@/helpers/hocs/Refresh';
import TempNav from '@/app/[locale]/TempNav';

export default function Main() {
    return (
        <main className="flex h-svh flex-col p-1 tablet-md:gap-1">
            <Refresh>
                <Header />

                <div className="flex grow gap-2 overflow-hidden">
                    <Sidebar />

                    <div className="grow overflow-y-auto">
                        <TempNav />
                        main page
                    </div>
                </div>
            </Refresh>
        </main>
    );
}

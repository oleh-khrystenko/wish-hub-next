import { useTranslations } from 'next-intl';
import Refresh from '@/helpers/hocs/Refresh';
import Header from '@/components/layouts/header/Header';
import Sidebar from '@/components/layouts/sidebar/Sidebar';
import MainContent from '@/app/[locale]/main/MainContent';

export default function Main() {
    const t = useTranslations();

    return (
        <main className="flex h-svh flex-col p-1 tablet-md:gap-1">
            <Refresh>
                <Header />

                <div className="flex grow gap-2 overflow-hidden">
                    <Sidebar />

                    <MainContent
                        titlePersonalT={t('main-page.title-personal')}
                        titleWishesT={t('main-page.title-wishes')}
                    />
                </div>
            </Refresh>
        </main>
    );
}

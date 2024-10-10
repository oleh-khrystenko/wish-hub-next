import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import UsePageParams from '@/helpers/hooks/UsePageParams';
import UiButton from '@/components/ui/UiButton';

const Actions: FC = () => {
    const router = useRouter();

    const activeLocale = useLocale();
    const welcomePageT = useTranslations('welcome-page');

    const myUser = useMyUserStore((state) => state.myUser);
    const setCandidate = useMyUserStore((state) => state.setCandidate);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const { getAllPageParams } = UsePageParams();

    const handleSignIn = () => {
        setShowGlobalLoading(true);

        setCandidate({ firstName: '', email: '' });

        router.push(`/${activeLocale}/auth?${getAllPageParams()}`);
    };

    const handleSignUp = () => {
        setShowGlobalLoading(true);

        setCandidate({ firstName: '', email: '' });

        router.push(`/${activeLocale}/auth?register&${getAllPageParams()}`);
    };

    return myUser ? (
        <UiButton href="/main">{welcomePageT('to-main')}</UiButton>
    ) : (
        <>
            <div className="mobile-xs:ml-auto tablet-md:ml-6">
                <UiButton variant="outline" onBtnClick={handleSignIn}>
                    {welcomePageT('sign-in')}
                </UiButton>
            </div>

            <UiButton onBtnClick={handleSignUp}>
                {welcomePageT('sign-up')}
            </UiButton>
        </>
    );
};

export default Actions;

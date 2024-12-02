'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    toMainT: string;
    signUpT: string;
}

const Action: FC<IProps> = ({ toMainT, signUpT }) => {
    const router = useRouter();

    const activeLocale = useLocale();

    const myUser = useMyUserStore((state) => state.myUser);
    const setCandidate = useMyUserStore((state) => state.setCandidate);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    const utmParams = UseUTMParams();

    const handleSignUp = () => {
        setShowGlobalLoading(true);

        setCandidate({ firstName: '', email: '' });

        router.push(
            `/${activeLocale}/auth?register${utmParams ? `&${utmParams}` : ''}`
        );
    };

    return (
        <div className="mt-4 w-fit tablet-md:mt-6">
            {myUser ? (
                <UiButton href="/main">{toMainT}</UiButton>
            ) : (
                <UiButton onBtnClick={handleSignUp}>{signUpT}</UiButton>
            )}
        </div>
    );
};

export default Action;

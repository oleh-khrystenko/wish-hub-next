'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
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

    const handleSignUp = () => {
        setCandidate({ firstName: '', email: '' });
        router.push(`/${activeLocale}/auth?register`);
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

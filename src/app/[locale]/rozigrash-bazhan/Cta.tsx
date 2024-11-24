'use client';

import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useMyUserStore } from '@/stores/my-user';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import ShareButton from '@/components/layouts/ShareButton';
import UiButton from '@/components/ui/UiButton';
import UiModal from '@/components/ui/modal/UiModal';
import ShareIcon from '@/components/icons/ShareIcon';

const Cta: FC = () => {
    const [showAttention, setShowAttention] = useState<boolean>(false);

    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');
    const mainPageT = useTranslations('main-page');

    const myUser = useMyUserStore((state) => state.myUser);

    const utmParams = UseUTMParams();

    if (myUser) {
        return (
            <ShareButton
                link={`?utm_source=user&utm_medium=share&utm_campaign=user_${myUser.id}`}
                variant="solid"
                iconClasses="h-6 w-6 fill-zinc-800"
            >
                <span className="flex items-center gap-2 py-1.5 text-lg font-bold text-zinc-800">
                    {rozigrashBazhanPageT('share_and_participate')}
                </span>
            </ShareButton>
        );
    }

    return (
        <>
            <UiButton onBtnClick={() => setShowAttention(true)}>
                <ShareIcon iconClasses="h-6 w-6 fill-zinc-800" />

                <span className="flex items-center gap-2 py-1.5 text-lg font-bold text-zinc-800">
                    {rozigrashBazhanPageT('share_and_participate')}
                </span>
            </UiButton>

            <UiModal
                rounded="rounded-2xl"
                show={showAttention}
                hide={() => setShowAttention(false)}
            >
                <p className="mx-auto mt-3 flex w-11/12 items-center justify-center text-xl font-bold text-orange-600 dark:text-amber-400">
                    ⚠️{' '}
                    <span className="text-center">
                        {rozigrashBazhanPageT('you_need_account')}
                    </span>{' '}
                    ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {rozigrashBazhanPageT('to_share_links')}
                    <br />
                    <br />
                    {rozigrashBazhanPageT('your_account_is')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton
                        href={`/auth${utmParams ? `?${utmParams}` : ''}`}
                        variant="outline"
                    >
                        {mainPageT('sign-in')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>
        </>
    );
};

export default Cta;

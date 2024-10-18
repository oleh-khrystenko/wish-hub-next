import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ECurrency, IGuestWish } from '@/models/Wish';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UiButton from '@/components/ui/UiButton';
import UiAvatar from '@/components/ui/UiAvatar';
import UiModal from '@/components/ui/modal/UiModal';
import ShareIcon from '@/components/icons/ShareIcon';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon';

interface IProps {
    wish: IGuestWish;
}

const GuestWish: FC<IProps> = ({ wish }) => {
    const [showAttentionProfile, setShowAttentionProfile] =
        useState<boolean>(false);
    const [showAttentionShare, setShowAttentionShare] =
        useState<boolean>(false);

    const router = useRouter();

    const mainPageT = useTranslations('main-page');
    const wishPageT = useTranslations('wish-page');

    const utmParams = UseUTMParams();

    const isURL = (str: string) => {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <div className="mt-8 flex grow flex-col px-4 pb-5 desktop-sm:px-0">
            <div className="flex flex-col gap-6">
                <div className="relative -ml-4 flex items-center gap-4 tablet-md:ml-0">
                    <UiButton
                        classesWrap="p-2.5"
                        variant="clear-styles"
                        onBtnClick={() => router.back()}
                    >
                        <ArrowBackIcon />
                    </UiButton>

                    <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-2xl">
                        {wishPageT('your_unsaved_wish')}:
                    </h1>
                </div>

                <UiButton
                    variant="clear-styles"
                    classesWrap="flex items-center gap-3 tablet-sm:gap-4"
                    onBtnClick={() => setShowAttentionProfile(true)}
                >
                    <UiAvatar
                        avatar={undefined}
                        alt={wishPageT('guest')}
                        size={64}
                        sizeTailwind="w-16 min-w-16 h-16 min-h-16"
                        sizeIcon="w-12 h-12"
                    />

                    <p
                        className="text-2xl font-bold text-zinc-700 dark:text-zinc-300"
                        title={wishPageT('guest')}
                    >
                        {wishPageT('guest')}
                    </p>
                </UiButton>
            </div>

            <div className="mt-6 flex flex-col gap-3 tablet-md:flex-row-reverse tablet-md:items-center tablet-md:gap-5">
                <UiButton
                    classesWrap="flex item-center gap-2 text-zinc-700 dark:text-zinc-300 ml-auto whitespace-nowrap"
                    variant="clear-styles"
                    onBtnClick={() => setShowAttentionShare(true)}
                >
                    {wishPageT('share')}
                    <ShareIcon />
                </UiButton>

                <p className="truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:min-h-11 tablet-md:text-4xl">
                    {wish.name}
                </p>
            </div>

            <div className="mt-6 flex w-full flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <p className="text-zinc-600 dark:text-zinc-400">
                        {wishPageT('show_nobody_1')}{' '}
                        <span className="text-zinc-700 dark:text-zinc-300">
                            {wishPageT('show_nobody_2')}
                        </span>{' '}
                        {wishPageT('show_nobody_3')}
                    </p>

                    {wish.price && (
                        <div className="flex items-center gap-2 whitespace-nowrap">
                            <span className="text-zinc-600 dark:text-zinc-400">
                                {wishPageT('price')}
                            </span>
                            <span className="text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-xl">
                                {wish.price} {wish.currency || ECurrency.UAH}
                            </span>
                        </div>
                    )}
                </div>

                {wish.addresses && wish.addresses.length > 0 && (
                    <p className="flex w-full flex-col">
                        <span className="text-sm leading-6 text-zinc-600 dark:text-zinc-400 tablet-md:text-base tablet-md:leading-7">
                            {wishPageT('address')}
                        </span>
                        {wish.addresses.map((address, idx) => {
                            if (isURL(address.value)) {
                                return (
                                    <a
                                        className="truncate py-1.5 text-base text-cyan-500 dark:text-cyan-300 tablet-md:text-xl"
                                        href={address.value}
                                        key={address.id}
                                        title={address.value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {address.value}
                                    </a>
                                );
                            }

                            return (
                                <span
                                    key={address.id}
                                    className="truncate py-1.5 text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-xl"
                                >
                                    {address.value}
                                </span>
                            );
                        })}
                    </p>
                )}

                {wish.description && (
                    <p className="w-full">
                        <span className="float-left mr-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400 tablet-md:text-base tablet-md:leading-7">
                            {wishPageT('description')}
                        </span>
                        <span className="whitespace-pre-wrap text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-lg">
                            {wish.description}
                        </span>
                    </p>
                )}
            </div>

            <UiModal
                show={showAttentionProfile}
                hide={() => setShowAttentionProfile(false)}
            >
                <p className="text-center text-2xl font-bold text-amber-400">
                    ⚠️ {mainPageT('only_registered_users')} ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('you_trying_profile')}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    <UiButton
                        variant="outline"
                        onBtnClick={() => setShowAttentionProfile(false)}
                    >
                        {mainPageT('i_see')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('create')}
                    </UiButton>
                </div>
            </UiModal>

            <UiModal
                show={showAttentionShare}
                hide={() => setShowAttentionShare(false)}
            >
                <p className="text-center text-2xl font-bold text-amber-400">
                    ⚠️ {mainPageT('only_registered_users')} ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {mainPageT('trying_share_wish')}
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
        </div>
    );
};

export default GuestWish;

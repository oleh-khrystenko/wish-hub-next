import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ECurrency, IGuestWish } from '@/models/Wish';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import UiButton from '@/components/ui/UiButton';
import UiAvatar from '@/components/ui/UiAvatar';
import UiModal from '@/components/ui/modal/UiModal';
import ShareIcon from '@/components/icons/ShareIcon';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon';
import LikeIcon from '@/components/icons/LikeIcon';

interface IProps {
    wish: IGuestWish;
}

const GuestWish: FC<IProps> = ({ wish }) => {
    const [showAttention, setShowAttention] = useState<
        '' | 'profile' | 'share' | 'like' | 'dislike' | 'book' | 'done'
    >('');

    const router = useRouter();
    const { userId } = useParams<{ userId: string }>();

    const mainPageT = useTranslations('main-page');
    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const utmParams = UseUTMParams();

    let attentionActionText = mainPageT('i_see');
    showAttention === 'profile' && (attentionActionText = mainPageT('i_see'));
    showAttention === 'share' && (attentionActionText = mainPageT('sign-in'));
    showAttention === 'like' && (attentionActionText = mainPageT('i_see'));
    showAttention === 'dislike' && (attentionActionText = mainPageT('i_see'));
    showAttention === 'book' && (attentionActionText = mainPageT('i_see'));
    showAttention === 'done' && (attentionActionText = mainPageT('i_see'));

    let attentionBodyText = mainPageT('only_registered_users');
    showAttention === 'profile' &&
        (attentionBodyText = mainPageT('you_trying_profile'));
    showAttention === 'share' &&
        (attentionBodyText = mainPageT('trying_share_wish'));
    showAttention === 'like' &&
        (attentionBodyText = mainPageT('you_trying_like'));
    showAttention === 'dislike' &&
        (attentionBodyText = mainPageT('you_trying_dislike'));
    showAttention === 'book' &&
        (attentionBodyText = mainPageT('you_trying_book'));
    showAttention === 'done' &&
        (attentionBodyText = mainPageT('you_trying_done'));

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

                    <p className="text-xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:text-2xl">
                        {wishPageT('your_unsaved_wish')}:
                    </p>
                </div>

                <UiButton
                    variant="clear-styles"
                    classesWrap="flex items-center gap-3 tablet-sm:gap-4"
                    onBtnClick={() => setShowAttention('profile')}
                >
                    <UiAvatar
                        avatar={undefined}
                        alt={allPagesT('guest')}
                        size={64}
                        sizeTailwind="w-16 min-w-16 h-16 min-h-16"
                        sizeIcon="w-12 h-12"
                    />

                    <p
                        className="text-2xl font-bold text-zinc-700 dark:text-zinc-300"
                        title={allPagesT('guest')}
                    >
                        {allPagesT('guest')}
                    </p>
                </UiButton>
            </div>

            <div className="mt-6 flex flex-col gap-3 tablet-md:flex-row-reverse tablet-md:items-center tablet-md:gap-5">
                <UiButton
                    classesWrap="flex item-center gap-2 text-zinc-700 dark:text-zinc-300 ml-auto whitespace-nowrap"
                    variant="clear-styles"
                    onBtnClick={() => setShowAttention('share')}
                >
                    {wishPageT('share')}
                    <ShareIcon />
                </UiButton>

                <h1 className="truncate text-2xl font-bold text-zinc-700 dark:text-zinc-300 tablet-md:min-h-11 tablet-md:text-4xl">
                    {wish.name}
                </h1>
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
                                        rel="noopener noreferrer external nofollow"
                                    >
                                        {address.value}
                                    </a>
                                );
                            }

                            return (
                                <span
                                    key={address.id}
                                    className="truncate py-1.5 text-base text-zinc-700 dark:text-zinc-300 tablet-md:text-xl"
                                    title={address.value}
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

            <div className="mt-5 flex flex-col items-end justify-between gap-5 mobile-sm:flex-row">
                <div className="flex items-center justify-center gap-1">
                    <UiButton
                        variant="clear-styles"
                        classesWrap="p-1 tablet-md:p-2"
                        onBtnClick={() => setShowAttention('like')}
                    >
                        <LikeIcon classes="fill-zinc-800 dark:fill-zinc-300 w-5 h-5 tablet-md:w-6 tablet-md:h-6" />
                    </UiButton>

                    <UiButton
                        variant="clear-styles"
                        classesWrap="-scale-100 p-1 tablet-md:p-2"
                        onBtnClick={() => setShowAttention('dislike')}
                    >
                        <LikeIcon classes="fill-zinc-800 dark:fill-zinc-300 w-5 h-5 tablet-md:w-6 tablet-md:h-6" />
                    </UiButton>
                </div>

                <div className="flex flex-col gap-1 tablet-md:flex-row tablet-md:items-center tablet-md:gap-5">
                    {/* Book */}
                    <div className="ml-auto">
                        <UiButton
                            variant="text-btn"
                            onBtnClick={() => setShowAttention('book')}
                        >
                            {wishPageT('will_fulfill')}
                        </UiButton>
                    </div>

                    {/* Done */}
                    <div className="ml-auto">
                        <UiButton
                            variant="text-btn"
                            onBtnClick={() => setShowAttention('done')}
                        >
                            {wishPageT('wish_fulfilled')}
                        </UiButton>
                    </div>

                    {/* Edit Wish */}
                    <div className="ml-auto mt-3 w-fit tablet-md:mt-0">
                        <UiButton
                            href={`user/${userId}/wish/editor?wishId=${wish.id}`}
                        >
                            {wishPageT('edit_wish')}
                        </UiButton>
                    </div>
                </div>
            </div>

            <UiModal
                show={showAttention.length > 0}
                hide={() => setShowAttention('')}
            >
                <p className="text-center text-2xl font-bold text-amber-400">
                    ⚠️ {mainPageT('only_registered_users')} ⚠️
                </p>

                <p className="mt-4 text-zinc-700 dark:text-zinc-300">
                    {attentionBodyText}
                </p>

                <div className="mt-6 flex items-center justify-end gap-5">
                    {showAttention === 'share' ? (
                        <UiButton
                            href={`/auth${utmParams ? `?${utmParams}` : ''}`}
                            variant="outline"
                        >
                            {mainPageT('sign-in')}
                        </UiButton>
                    ) : (
                        <UiButton
                            variant="outline"
                            onBtnClick={() => setShowAttention('')}
                        >
                            {attentionActionText}
                        </UiButton>
                    )}

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT(
                            showAttention === 'profile' ? 'create' : 'sign-up'
                        )}
                    </UiButton>
                </div>
            </UiModal>
        </div>
    );
};

export default GuestWish;

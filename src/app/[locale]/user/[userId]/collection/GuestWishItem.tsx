'use client';

import { FC, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { ECurrency, IGuestWish } from '@/models/Wish';
import { useSettingsStore } from '@/stores/settings';
import UseUTMParams from '@/helpers/hooks/UseUTMParams';
import { addingWhiteSpaces } from '@/helpers/utils/formating-number';
import UiButton from '@/components/ui/UiButton';
import UiModal from '@/components/ui/modal/UiModal';
import LogoIcon from '@/components/icons/LogoIcon';
import EditIcon from '@/components/icons/EditIcon';
import LikeIcon from '@/components/icons/LikeIcon';

interface IProps {
    wish: IGuestWish;
    idx: number;
    currentPage: string;
}

const GuestWishItem: FC<IProps> = ({ wish, idx, currentPage }) => {
    const [showAttention, setShowAttention] = useState<'' | 'like' | 'dislike'>(
        ''
    );

    const { userId } = useParams<{ userId: string }>();

    const mainPageT = useTranslations('main-page');

    const utmParams = UseUTMParams();

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    let attentionBodyText = mainPageT('only_registered_users');
    showAttention === 'like' &&
        (attentionBodyText = mainPageT('you_trying_like'));
    showAttention === 'dislike' &&
        (attentionBodyText = mainPageT('you_trying_dislike'));

    return (
        <li className="relative flex h-fit w-full cursor-pointer rounded-md border-2 border-dashed border-zinc-300 dark:border-zinc-700">
            <UiButton
                href={`/user/${wish.userId}/wish?wishId=${wish.id}&fromPage=${currentPage}`}
                variant="clear-styles"
                classesWrap="flex h-full w-full flex-col items-center px-4 pb-2 pt-4"
                onLinkClick={() => setShowGlobalLoading(true)}
            >
                <div className="relative w-full pt-[100%]">
                    <LogoIcon
                        classes="absolute inset-0 h-full w-full grayscale opacity-50 dark:opacity-20"
                        id={idx.toString()}
                    />
                </div>

                <div className="mt-1 flex w-full flex-col items-center justify-evenly">
                    <div className="w-full truncate text-center text-base font-bold text-zinc-800 dark:text-zinc-300 tablet-md:text-lg">
                        {wish.name}
                    </div>

                    {wish.price && (
                        <div className="text-center text-sm text-zinc-700 dark:text-zinc-400 tablet-md:text-base">
                            {addingWhiteSpaces(wish.price)}{' '}
                            {wish.currency || ECurrency.UAH}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 tablet-md:gap-3">
                    <UiButton
                        variant="clear-styles"
                        classesWrap="p-1 tablet-md:p-2"
                        onBtnClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            setShowAttention('like');
                        }}
                    >
                        <LikeIcon classes="fill-zinc-800 dark:fill-zinc-300 w-5 h-5 tablet-md:w-6 tablet-md:h-6" />
                    </UiButton>

                    <UiButton
                        variant="clear-styles"
                        classesWrap="-scale-100 p-1 tablet-md:p-2"
                        onBtnClick={(event) => {
                            event.stopPropagation();
                            event.preventDefault();
                            setShowAttention('dislike');
                        }}
                    >
                        <LikeIcon classes="fill-zinc-800 dark:fill-zinc-300 w-5 h-5 tablet-md:w-6 tablet-md:h-6" />
                    </UiButton>
                </div>
            </UiButton>

            <UiButton
                href={`/user/${userId}/wish/editor?wishId=${wish.id}&fromPage=${currentPage}`}
                variant="clear-styles"
                classesWrap="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-300 transition-all duration-300 ease-in-out hover:bg-zinc-400 dark:bg-zinc-700 hover:dark:bg-zinc-600"
            >
                <EditIcon />
            </UiButton>

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
                    <UiButton
                        variant="outline"
                        onBtnClick={() => setShowAttention('')}
                    >
                        {mainPageT('i_see')}
                    </UiButton>

                    <UiButton
                        href={`/auth?register${utmParams ? `&${utmParams}` : ''}`}
                    >
                        {mainPageT('sign-up')}
                    </UiButton>
                </div>
            </UiModal>
        </li>
    );
};

export default GuestWishItem;

'use client';

import { FC, useEffect, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { IGuestWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import { useSettingsStore } from '@/stores/settings';
import Breadcrumbs from '@/components/layouts/Breadcrumbs';
import CreateWish from '@/app/[locale]/user/[userId]/wish/editor/CreateWish';
import EditWish from '@/app/[locale]/user/[userId]/wish/editor/EditWish';
import ConfirmModal from '@/components/layouts/ConfirmModal';
import UiButton from '@/components/ui/UiButton';
import MainIcon from '@/components/icons/MainIcon';
import EditIcon from '@/components/icons/EditIcon';
import LogoIcon from '@/components/icons/LogoIcon';
import CollectionIcon from '@/components/icons/CollectionIcon';
import ArrowBackIcon from '@/components/icons/ArrowBackIcon';

const Body: FC = () => {
    const [guestWish, setGuestWish] = useState<IGuestWish | undefined>(
        undefined
    );
    const [showConfirmLeave, setShowConfirmLeave] = useState<boolean>(false);

    const { userId } = useParams<{ userId: string }>();
    const router = useRouter();
    const searchParams = useSearchParams();

    const wishPageT = useTranslations('wish-page');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const wish = useWishesStore((state) => state.wish);
    const getWish = useWishesStore((state) => state.getWish);

    const isDirtyForm = useSettingsStore((state) => state.isDirtyForm);

    const fromPage = searchParams.get('fromPage');
    const wishId = searchParams.get('wishId');

    const seoPages = [
        {
            href: 'main',
            name: allPagesT('main'),
        },
        {
            href: `user/${userId}/wish`,
            name: allPagesT('wish'),
        },
        {
            href: `user/${userId}/wish/editor`,
            name: allPagesT('wish_editor'),
        },
    ];

    const visualPages = [
        {
            href: 'main',
            icon: (
                <MainIcon classes="w-3.5 h-3.5 fill-zinc-500 dark:fill-zinc-400 group-hover:dark:fill-zinc-600" />
            ),
            name: allPagesT('main'),
        },
        {
            href: `user/${userId}/collection`,
            icon: (
                <CollectionIcon classes="w-4 h-4 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('collection'),
        },
        {
            href: `user/${userId}/wish?wishId=${wishId}`,
            icon: <LogoIcon classes="w-4 h-4" />,
            name: allPagesT('wish'),
        },
        {
            href: `user/${userId}/wish/editor`,
            icon: (
                <EditIcon classes="w-3.5 h-3.5 fill-zinc-200 dark:fill-zinc-400" />
            ),
            name: allPagesT('wish_editor'),
        },
    ];

    if (fromPage && fromPage === 'main') {
        delete visualPages[1];
    }

    if (!wishId) {
        delete visualPages[2];
    }

    const confirmLeave = () => {
        router.back();
    };

    const handleLinkClick = () => {
        if (isDirtyForm) {
            setShowConfirmLeave(true);
        } else {
            router.back();
        }
    };

    useEffect(() => {
        if (userId.includes('guest')) {
            if (myUser) return;

            const guestWishes = localStorage.getItem('guestWishes') || '';

            const parsedGuestWishes: IGuestWish[] =
                guestWishes.length > 0
                    ? (JSON.parse(guestWishes) as IGuestWish[])
                    : [];

            const wishId = searchParams.get('wishId');

            const currentGuestWish = parsedGuestWishes.find(
                (wish) => wish.id === wishId
            );
            setGuestWish(currentGuestWish);
        } else {
            if (!wishId) return;

            getWish(
                { wishId, userId: myUser?.id },
                false,
                allPagesT('wishes-api.get-wish.error')
            ).finally();
        }
    }, [myUser, userId, searchParams]);

    return (
        <main className="flex grow flex-col pt-3">
            <Breadcrumbs seoPages={seoPages} visualPages={visualPages} />

            <div className="mt-3 flex grow flex-col px-3 pb-5 desktop-sm:px-0">
                <div className="flex items-center gap-4">
                    <UiButton
                        variant="clear-styles"
                        classesWrap="p-2.5"
                        onBtnClick={handleLinkClick}
                    >
                        <ArrowBackIcon />
                    </UiButton>

                    <h1 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mobile-xs:text-2xl">
                        {wishPageT(wishId ? 'editing_wish' : 'creating_wish')}
                    </h1>
                </div>

                {wishId ? (
                    <>
                        {wish && <EditWish wish={wish} />}
                        {guestWish && <EditWish wish={guestWish} />}
                    </>
                ) : (
                    <CreateWish />
                )}
            </div>

            <ConfirmModal
                show={showConfirmLeave}
                confirm={confirmLeave}
                hide={() => setShowConfirmLeave(false)}
                confirmModalT={allPagesT('leave_with_changes.confirm')}
                closeModalT={allPagesT('leave_with_changes.close')}
            >
                <span className="text-zinc-700 dark:text-zinc-300">
                    {allPagesT('leave_with_changes.text')}
                </span>
            </ConfirmModal>
        </main>
    );
};

export default Body;

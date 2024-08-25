'use client';

import { FC, MouseEvent, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { IUser } from '@/models/User';
import { IWish } from '@/models/Wish';
import { useMyUserStore } from '@/stores/my-user';
import { useWishesStore } from '@/stores/wishes';
import UseInitialWishes from '@/helpers/hooks/UseInitialWishes';
import UiPopup from '@/components/ui/UiPopup';
import UiAvatar from '@/components/ui/UiAvatar';
import LikeIcon from '@/components/icons/LikeIcon';

interface IProps {
    wish: IWish;
    type: 'likes' | 'dislikes';
    hide?: () => void;
}

const LikeAction: FC<IProps> = ({ wish, type, hide }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const alertsT = useTranslations('alerts');

    const myUser = useMyUserStore((state) => state.myUser);
    const likeWish = useWishesStore((state) => state.likeWish);
    const dislikeWish = useWishesStore((state) => state.dislikeWish);

    const { getInitialWishList } = UseInitialWishes();

    const iLiked = useMemo(
        () => wish[type]?.some((like) => like.userId === myUser?.id),
        [wish, type, myUser]
    );

    const iconColor = useMemo(() => {
        if (iLiked) {
            if (type === 'likes') return 'fill-cyan-500 dark:fill-cyan-300';

            return 'fill-rose-500';
        }

        return 'fill-zinc-800 dark:fill-zinc-300';
    }, [type, iLiked]);

    const handleAction = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!myUser) return;
        type === 'likes' &&
            likeWish(
                { userId: myUser.id, wishId: wish.id },
                alertsT('wishes-api.like-wish.error')
            );
        type === 'dislikes' &&
            dislikeWish(
                { userId: myUser.id, wishId: wish.id },
                alertsT('wishes-api.dislike-wish.error')
            );
    };

    const handleSelectWish = async (
        e: MouseEvent<HTMLButtonElement>,
        userId: IUser['id']
    ) => {
        e.stopPropagation();
        if (!myUser) return;

        await getInitialWishList(myUser.id, userId);
        setShowPopup(false);
        hide && hide();
    };

    return (
        <div className="flex items-center">
            <button
                className={`${type === 'dislikes' ? '-scale-100' : ''} p-1 tablet-md:p-2`}
                type="button"
                onClick={handleAction}
            >
                <LikeIcon
                    classes={`${iconColor} w-5 h-5 tablet-md:w-6 tablet-md:h-6`}
                    solid={iLiked}
                />
            </button>

            <div className="relative">
                <button
                    className="min-w-8 items-center p-1 text-base text-zinc-700 dark:text-zinc-400 tablet-md:min-w-10 tablet-md:p-2"
                    type="button"
                    onClick={() => setShowPopup(true)}
                >
                    {wish[type]?.length}
                </button>

                {wish[type]?.length > 0 && (
                    <UiPopup
                        classes="pb-10"
                        showPopupUp
                        showPopupCenter
                        show={showPopup}
                        hide={() => setShowPopup(false)}
                    >
                        <div className="p-2">
                            <ul className="popup-scrollbar flex max-h-32 flex-col overflow-y-auto">
                                {wish[type].map((like) => (
                                    <li key={like.userId}>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-md px-2 py-1 transition-all duration-300 ease-in-out hover:bg-zinc-300 hover:dark:bg-zinc-800"
                                            type="button"
                                            title={like.userFullName}
                                            onClick={(e) =>
                                                handleSelectWish(e, like.userId)
                                            }
                                        >
                                            <UiAvatar
                                                avatar={like.userAvatar}
                                                alt={like.userFullName}
                                                size={24}
                                            />

                                            <span className="w-full max-w-36 truncate text-left text-xs text-zinc-800 dark:text-zinc-300">
                                                {like.userFullName}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </UiPopup>
                )}
            </div>
        </div>
    );
};

export default LikeAction;

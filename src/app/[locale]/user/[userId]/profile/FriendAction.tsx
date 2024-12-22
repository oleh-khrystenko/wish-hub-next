import { FC, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IUser } from '@/models/user';
import { EWhereRemove, IRemoveFriend } from '@/stores/my-user/types';
import { useMyUserStore } from '@/stores/my-user';
import { useSettingsStore } from '@/stores/settings';
import UiButton from '@/components/ui/UiButton';
import UiPopup from '@/components/ui/UiPopup';
import PersonsIcon from '@/components/icons/PersonsIcon';
import PersonAddIcon from '@/components/icons/PersonAddIcon';
import PersonRemoveIcon from '@/components/icons/PersonRemoveIcon';

interface IProps {
    myUser: IUser;
    user: IUser;
}

const FriendAction: FC<IProps> = ({ myUser, user }) => {
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const mainPageT = useTranslations('main-page');
    const profilePageT = useTranslations('profile-page');
    const allPagesT = useTranslations('all-pages');

    const addFriend = useMyUserStore((state) => state.addFriend);
    const removeFriend = useMyUserStore((state) => state.removeFriend);

    const setShowGlobalLoading = useSettingsStore(
        (state) => state.setShowGlobalLoading
    );

    let friendColor = '';
    let friendText = '';

    if (myUser.followTo.includes(user.id)) {
        friendColor = 'fill-zinc-400 dark:fill-zinc-500';
        friendText = profilePageT('follow_to');
    }
    if (myUser.followFrom.includes(user.id)) {
        friendColor = 'fill-zinc-600 dark:fill-zinc-200';
        friendText = profilePageT('follow_from');
    }
    if (myUser.friends.includes(user.id)) {
        friendColor = 'fill-cyan-400 dark:fill-cyan-300';
        friendText = profilePageT('friends');
    }

    const showAddFriend =
        myUser.followFrom.includes(user.id) ||
        (!myUser.friends.includes(user.id) &&
            !myUser.followTo.includes(user.id));

    const handleAddFriend = async () => {
        setShowGlobalLoading(true);

        await addFriend(
            { myId: myUser.id, friendId: user.id },
            allPagesT('my-user-api.add-friend.error')
        );

        setShowGlobalLoading(false);
        setShowPopup(false);
    };

    const handleRemoveFriend = async (
        whereRemove: IRemoveFriend['whereRemove']
    ) => {
        setShowGlobalLoading(true);

        await removeFriend(
            {
                myId: myUser.id,
                friendId: user.id,
                whereRemove,
            },
            allPagesT('my-user-api.remove-friend.error')
        );

        setShowGlobalLoading(false);
        setShowPopup(false);
    };

    return friendColor.length > 0 ? (
        <div className="absolute bottom-0 left-3/4 flex items-end gap-2">
            <UiButton variant="text" onBtnClick={() => setShowPopup(true)}>
                <div className="rounded-full bg-zinc-300 p-1.5 dark:bg-zinc-800 tablet-md:p-2.5">
                    <PersonsIcon
                        classes={`${friendColor} w-5 h-5 tablet-md:w-8 tablet-md:h-8`}
                    />
                </div>

                <p className="whitespace-nowrap text-sm text-zinc-600 dark:text-zinc-400 tablet-md:text-base">
                    {friendText}
                </p>
            </UiButton>

            <UiPopup
                classes="pt-10"
                showPopupCenter
                show={showPopup}
                hide={() => setShowPopup(false)}
            >
                <div className="flex flex-col p-2">
                    {showAddFriend && (
                        <UiButton
                            classesWrap="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                            variant="clear-styles"
                            onBtnClick={handleAddFriend}
                        >
                            <PersonAddIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />

                            {myUser.followFrom.includes(user.id)
                                ? mainPageT('confirm-friendship')
                                : mainPageT('add-friend')}
                        </UiButton>
                    )}
                    {myUser?.followTo.includes(user.id) && (
                        <UiButton
                            classesWrap="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                            variant="clear-styles"
                            onBtnClick={() =>
                                handleRemoveFriend(EWhereRemove.FOLLOW_TO)
                            }
                        >
                            <PersonRemoveIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />
                            {mainPageT('delete-your')} <br />{' '}
                            {mainPageT('delete-request')}
                        </UiButton>
                    )}
                    {myUser?.followFrom.includes(user.id) && (
                        <UiButton
                            classesWrap="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                            variant="clear-styles"
                            onBtnClick={() =>
                                handleRemoveFriend(EWhereRemove.FOLLOW_FROM)
                            }
                        >
                            <PersonRemoveIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />
                            {mainPageT('delete-user_s')} <br />{' '}
                            {mainPageT('delete-request')}
                        </UiButton>
                    )}
                    {myUser?.friends.includes(user.id) && (
                        <UiButton
                            classesWrap="relative flex items-center gap-2 whitespace-nowrap rounded-md px-2 py-2.5 text-left text-sm font-bold text-zinc-500 transition-all duration-300 ease-in-out hover:bg-zinc-300 dark:text-zinc-300 hover:dark:bg-zinc-800"
                            variant="clear-styles"
                            onBtnClick={() =>
                                handleRemoveFriend(EWhereRemove.FRIENDS)
                            }
                        >
                            <PersonRemoveIcon classes="w-5 min-w-5 h-5 fill-zinc-500 dark:fill-zinc-300" />

                            {mainPageT('remove-friend')}
                        </UiButton>
                    )}
                </div>
            </UiPopup>
        </div>
    ) : null;
};

export default FriendAction;

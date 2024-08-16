'use client';

import { FC, useRef, useMemo } from 'react';
import { useMyUserStore } from '@/stores/my-user';
import { useUsersStore } from '@/stores/users';
import getFullName from '@/helpers/utils/get-full-name';
import WishList from '@/components/layouts/wish-list/WishList';
import { IUiShareButtonTranslations } from '@/components/ui/UiShareButton';

interface IProps {
    titlePersonalT: string;
    titleWishesT: string;
    TitleWishesT: string;
    ofUserT: string;
    userNotFoundT: string;
    allT: string;
    unfulfilledT: string;
    fulfilledT: string;
    wishesSearchT: string;
    uiShareButtonTranslations: IUiShareButtonTranslations;
    shareWishesT: string;
    canSeeInactiveShareTooltipT: string;
    canSeeShareTooltipT: string;
    sortByPopularityT: string;
    sortByPriceDownT: string;
    sortByPriceUpT: string;
    sortByCreatedUpT: string;
    sortByCreatedDownT: string;
    wishExampleFirstT: string;
    wishExampleSecondT: string;
    wishExampleThirdT: string;
    wishExampleFourthT: string;
    atUserT: string;
    doesNotHaveAllT: string;
    doesNotHaveFulfilledT: string;
    doesNotHaveUnfulfilledT: string;
    noWishesFoundT: string;
}

const MainContent: FC<IProps> = ({
    titlePersonalT,
    titleWishesT,
    TitleWishesT,
    ofUserT,
    userNotFoundT,
    allT,
    unfulfilledT,
    fulfilledT,
    wishesSearchT,
    uiShareButtonTranslations,
    shareWishesT,
    canSeeInactiveShareTooltipT,
    canSeeShareTooltipT,
    sortByPopularityT,
    sortByPriceDownT,
    sortByPriceUpT,
    sortByCreatedUpT,
    sortByCreatedDownT,
    wishExampleFirstT,
    wishExampleSecondT,
    wishExampleThirdT,
    wishExampleFourthT,
    atUserT,
    doesNotHaveAllT,
    doesNotHaveFulfilledT,
    doesNotHaveUnfulfilledT,
    noWishesFoundT,
}) => {
    const myUser = useMyUserStore((state) => state.myUser);
    const users = useUsersStore((state) => state.list);
    const selectedUserId = useUsersStore((state) => state.selectedUserId);

    const selectedUserFullName = useMemo(() => {
        const selectedUser = users.find((user) => user.id === selectedUserId);
        return getFullName(selectedUser, userNotFoundT);
    }, [users, selectedUserId]);

    return (
        <div className="grow overflow-y-auto px-5 pb-5 pt-2">
            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-300">
                {myUser?.id === selectedUserId ? (
                    <>
                        {titlePersonalT} {titleWishesT}
                    </>
                ) : (
                    <>
                        {TitleWishesT} {ofUserT} {selectedUserFullName}
                    </>
                )}
            </span>

            <WishList
                allT={allT}
                unfulfilledT={unfulfilledT}
                fulfilledT={fulfilledT}
                wishesSearchT={wishesSearchT}
                uiShareButtonTranslations={uiShareButtonTranslations}
                shareWishesT={shareWishesT}
                canSeeShareTooltipT={canSeeShareTooltipT}
                canSeeInactiveShareTooltipT={canSeeInactiveShareTooltipT}
                sortByPopularityT={sortByPopularityT}
                sortByPriceDownT={sortByPriceDownT}
                sortByPriceUpT={sortByPriceUpT}
                sortByCreatedUpT={sortByCreatedUpT}
                sortByCreatedDownT={sortByCreatedDownT}
                wishExampleFirstT={wishExampleFirstT}
                wishExampleSecondT={wishExampleSecondT}
                wishExampleThirdT={wishExampleThirdT}
                wishExampleFourthT={wishExampleFourthT}
                atUserT={atUserT}
                selectedUserFullName={selectedUserFullName}
                doesNotHaveAllT={doesNotHaveAllT}
                doesNotHaveFulfilledT={doesNotHaveFulfilledT}
                doesNotHaveUnfulfilledT={doesNotHaveUnfulfilledT}
                noWishesFoundT={noWishesFoundT}
            />
        </div>
    );
};

export default MainContent;

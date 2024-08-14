'use client';

import { FC } from 'react';
import { useMyUserStore } from '@/stores/my-user';

interface IProps {
    titlePersonalT: string;
    titleWishesT: string;
}

const MainContent: FC<IProps> = ({ titlePersonalT, titleWishesT }) => {
    const myUser = useMyUserStore((state) => state.myUser);

    return (
        <div className="grow overflow-y-auto">
            <span className="text-xl font-bold text-zinc-800 dark:text-zinc-300">
                {titlePersonalT} {titleWishesT}
            </span>
        </div>
    );
};

export default MainContent;

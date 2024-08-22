'use client';

import { FC } from 'react';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';
import { useTranslations } from 'next-intl';
import WishSwiper from '@/components/layouts/detail-wish/WishSwiper';
import WishContent from '@/components/layouts/detail-wish/WishContent';

interface IProps {
    wish: IWish;
    selectedUser?: IUser;
    editWish?: () => void;
    hide: () => void;
}

const DetailWish: FC<IProps> = ({ wish, selectedUser, editWish, hide }) => {
    const mainPageT = useTranslations('main-page');

    return (
        <div className="custom-max-height -mr-1.5 grid h-auto w-full grid-cols-1 overflow-y-auto pr-1.5 tablet-md:max-h-[88svh] desktop-xs:mr-0 desktop-xs:max-h-fit desktop-xs:grid-cols-8 desktop-xs:gap-6 desktop-xs:pr-0">
            <WishSwiper wish={wish} />

            <div
                className={`${wish.images.length > 1 ? 'mt-[100px] tablet-md:mt-[120px] desktop-xs:mt-0' : ''} flex w-full flex-col gap-4 desktop-xs:col-span-5 desktop-xs:gap-6`}
            >
                <WishContent wish={wish} />
            </div>
        </div>
    );
};

export default DetailWish;

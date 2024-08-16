'use client';

import { FC } from 'react';
import { IWish } from '@/models/Wish';

interface IProps {
    wish: IWish;
    showWish: () => void;
    editWish?: () => void;
}

const WishItem: FC<IProps> = ({ wish, showWish, editWish }) => {
    return <div>WishItem</div>;
};

export default WishItem;

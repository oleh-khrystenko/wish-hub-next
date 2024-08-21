'use client';

import { FC } from 'react';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';

interface IProps {
    wish: IWish;
    selectedUser?: IUser;
    editWish?: () => void;
    hide: () => void;
}

const DetailWish: FC<IProps> = ({ wish, selectedUser, editWish, hide }) => {
    return <div>DetailWish</div>;
};

export default DetailWish;

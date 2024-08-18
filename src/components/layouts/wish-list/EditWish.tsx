'use client';

import { FC } from 'react';
import { IWish } from '@/models/Wish';

interface IProps {
    idOfSelectedWish: IWish['id'] | null;
    hide: () => void;
}

const EditWish: FC<IProps> = ({ idOfSelectedWish, hide }) => {
    return <div>EditWish</div>;
};

export default EditWish;

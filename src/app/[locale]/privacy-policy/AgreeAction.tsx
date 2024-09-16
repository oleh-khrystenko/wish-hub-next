'use client';

import { FC } from 'react';
import { useMyUserStore } from '@/stores/my-user';
import UiButton from '@/components/ui/UiButton';

interface IProps {
    text: string;
}

const AgreeAction: FC<IProps> = ({ text }) => {
    const myUser = useMyUserStore((state) => state.myUser);

    return (
        !myUser && (
            <div className="ml-auto w-fit">
                <UiButton href="/auth?agree">{text}</UiButton>
            </div>
        )
    );
};

export default AgreeAction;

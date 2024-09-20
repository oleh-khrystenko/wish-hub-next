'use client';

import { FC, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import { useMyUserStore } from '@/stores/my-user';
import myUserApi from '@/stores/my-user/api';
import { WAITING_TIME } from '@/helpers/utils/constants';

const Inactivated: FC = () => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    const inactivatedT = useTranslations('inactivated');
    const allPagesT = useTranslations('all-pages');

    const myUser = useMyUserStore((state) => state.myUser);

    const handleSendActivationLink = async () => {
        if (!myUser) return;

        try {
            await myUserApi.sendActivationLink(myUser.id);

            toast(
                allPagesT('my-user-api.send-activation-link.success', {
                    email: myUser.email,
                }),
                {
                    type: 'success',
                }
            );
        } catch (error: any) {
            toast(
                error.response?.data?.message ||
                    allPagesT('my-user-api.send-activation-link.error', {
                        email: myUser.email,
                    }),
                { type: 'error' }
            );
        }

        setTimeLeft(WAITING_TIME);
        localStorage.setItem('timeLeft', String(WAITING_TIME));

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === null || prevTime === 0) {
                    clearInterval(timer);
                    localStorage.removeItem('timeLeft');
                    return null;
                }

                const newTimeLeft = prevTime - 1;
                localStorage.setItem('timeLeft', String(newTimeLeft));
                return newTimeLeft;
            });
        }, 1000);
    };

    useEffect(() => {
        const localTimeLeft = localStorage.getItem('timeLeft');
        if (!localTimeLeft) return;

        setTimeLeft(Number(localTimeLeft));

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime === null || prevTime === 0) {
                    clearInterval(timer);
                    localStorage.removeItem('timeLeft');
                    return null;
                }
                const newTimeLeft = prevTime - 1;
                localStorage.setItem('timeLeft', String(newTimeLeft));
                return newTimeLeft;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 w-full bg-rose-600 p-4 tablet-md:px-5">
            <p className="text-center text-sm text-zinc-800 tablet-md:text-base">
                {inactivatedT('aim')}
                <br />
                {inactivatedT('check')}{' '}
                <span className="font-bold">{myUser?.email}</span>{' '}
                {inactivatedT('activate')}
                <br />
                {inactivatedT('spam')} <br className="tablet-md:hidden" />
                {timeLeft === null ? (
                    <>
                        {inactivatedT('click')}
                        <button
                            className="font-bold text-zinc-950 underline"
                            type="button"
                            onClick={handleSendActivationLink}
                        >
                            {inactivatedT('here')}
                        </button>
                    </>
                ) : (
                    <>
                        {inactivatedT('resend')}
                        <span className="ml-1 w-10 font-bold text-cyan-300">
                            {Math.floor(timeLeft / 60)}:
                            {timeLeft % 60 > 9
                                ? timeLeft % 60
                                : `0${timeLeft % 60}`}
                        </span>
                    </>
                )}
                <br />
                <span className="text-base font-bold text-zinc-950 tablet-md:text-lg">
                    {inactivatedT('day')}
                </span>
            </p>
        </div>
    );
};

export default Inactivated;

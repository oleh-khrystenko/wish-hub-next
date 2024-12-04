'use client';

import { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { GIVEAWAY_DATE_AND_TIME_END } from '@/helpers/utils/constants';

interface IProps {
    labelEnd: string;
    label: string;
}

const CountdownTimer: FC<IProps> = ({ labelEnd, label }) => {
    const calculateTimeLeft = () => {
        const endDate = dayjs(GIVEAWAY_DATE_AND_TIME_END);
        const now = dayjs();
        const difference = endDate.diff(now);

        if (difference <= 0) return null;

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [mounted, setMounted] = useState(false); // Стан, який показує, що компонент змонтований

    const allPagesT = useTranslations('all-pages');

    useEffect(() => {
        setMounted(true); // Встановлюємо, що компонент змонтовано

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) {
        // Показуємо порожній div або початковий стан на сервері
        return <div style={{ visibility: 'hidden' }}>—</div>;
    }

    if (!timeLeft) {
        return <p className="text-2xl font-bold text-rose-500">{labelEnd}</p>;
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-bold text-cyan-500 dark:text-cyan-300">
                {label}
            </p>

            <div className="flex items-center justify-center gap-0.5">
                <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {allPagesT('days')}
                    </span>
                    <span className="rounded-md bg-cyan-400 px-2 py-6 text-4xl font-bold text-zinc-700 dark:bg-cyan-300">
                        {timeLeft.days.toString().padStart(2, '0')}
                    </span>
                </div>

                <span className="mt-auto block pb-7 text-4xl font-bold text-cyan-500 dark:text-cyan-300">
                    :
                </span>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {allPagesT('hours')}
                    </span>
                    <span className="rounded-md bg-cyan-400 px-2 py-6 text-4xl font-bold text-zinc-700 dark:bg-cyan-300">
                        {timeLeft.hours.toString().padStart(2, '0')}
                    </span>
                </div>

                <span className="mt-auto block pb-7 text-4xl font-bold text-cyan-500 dark:text-cyan-300">
                    :
                </span>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {allPagesT('minutes')}
                    </span>
                    <span className="rounded-md bg-cyan-400 px-2 py-6 text-4xl font-bold text-zinc-700 dark:bg-cyan-300">
                        {timeLeft.minutes.toString().padStart(2, '0')}
                    </span>
                </div>

                <span className="mt-auto block pb-7 text-4xl font-bold text-cyan-500 dark:text-cyan-300">
                    :
                </span>

                <div className="flex flex-col items-center gap-2">
                    <span className="text-zinc-700 dark:text-zinc-300">
                        {allPagesT('seconds')}
                    </span>
                    <span className="rounded-md bg-cyan-400 px-2 py-6 text-4xl font-bold text-zinc-700 dark:bg-cyan-300">
                        {timeLeft.seconds.toString().padStart(2, '0')}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;

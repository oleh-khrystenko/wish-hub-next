'use client';

import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import {
    GIVEAWAY_DATE_AND_TIME_START,
    GIVEAWAY_DATE_AND_TIME_END,
} from '@/helpers/utils/constants';

const Duration: FC = () => {
    const rozigrashBazhanTermsPageT = useTranslations(
        'rozigrash-bazhan-terms-page'
    );

    const activeLocale = useLocale();

    const { getFullDate, getTime } = UseLocaleFormats();

    const formatedStartDate = dayjs(GIVEAWAY_DATE_AND_TIME_START)
        .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
        .format(getFullDate());
    const formatedStartTime = dayjs(GIVEAWAY_DATE_AND_TIME_START)
        .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
        .format(getTime());
    const formatedEndDate = dayjs(GIVEAWAY_DATE_AND_TIME_END)
        .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
        .format(getFullDate());
    const formatedEndTime = dayjs(GIVEAWAY_DATE_AND_TIME_END)
        .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
        .format(getTime());

    return (
        <p className="text-justify text-zinc-700 dark:text-zinc-300">
            {rozigrashBazhanTermsPageT('start_on', { date: formatedStartDate })}
            {rozigrashBazhanTermsPageT('start_at', {
                time: formatedStartTime,
            })}
            <br />
            {rozigrashBazhanTermsPageT('end_on', { date: formatedEndDate })}
            {rozigrashBazhanTermsPageT('end_at', { time: formatedEndTime })}
        </p>
    );
};

export default Duration;

'use client';

import { FC } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/ru';
import UseLocaleFormats from '@/helpers/hooks/UseLocaleFormats';
import { GIVEAWAY_DATE_AND_TIME_END } from '@/helpers/utils/constants';

const FormatedTime: FC = () => {
    const rozigrashBazhanPageT = useTranslations('rozigrash-bazhan-page');

    const activeLocale = useLocale();

    const { getFullDate, getTime } = UseLocaleFormats();

    const formatedPromotionDate = dayjs(GIVEAWAY_DATE_AND_TIME_END)
        .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
        .format(getFullDate());
    const formatedPromotionTime = dayjs(GIVEAWAY_DATE_AND_TIME_END)
        .locale(activeLocale === 'ua' ? 'uk' : activeLocale)
        .format(getTime());

    return (
        <>
            {formatedPromotionDate}
            {rozigrashBazhanPageT('at', {
                time: formatedPromotionTime,
            })}
        </>
    );
};

export default FormatedTime;

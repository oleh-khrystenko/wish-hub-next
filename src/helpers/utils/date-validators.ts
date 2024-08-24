import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const isBefore = (date: Date | Dayjs, days: number) =>
    dayjs(date).isSameOrBefore(dayjs().add(days, 'day'));

export const isAfter = (date: Date | Dayjs, years: number) =>
    dayjs(date).isSameOrAfter(dayjs().add(years, 'year'));

export const isBookingExpired = (
    wish: IWish,
    myUserId: IUser['id'] | undefined
): boolean => {
    // бажання заброньовано та належить користувачу та не виконано
    return (
        !!wish.booking?.userId &&
        (myUserId === wish.userId || myUserId === wish.booking?.userId) &&
        isBefore(wish.booking?.end, 0)
    );
};

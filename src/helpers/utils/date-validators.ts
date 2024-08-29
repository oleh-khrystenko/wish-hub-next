import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const isBefore = (
    checkingDate: Date | Dayjs,
    number: number,
    numberType: 'day' | 'year'
) => dayjs(checkingDate).isSameOrBefore(dayjs().add(number, numberType));

export const isAfter = (
    checkingDate: Date | Dayjs,
    number: number,
    numberType: 'day' | 'year'
) => dayjs(checkingDate).isSameOrAfter(dayjs().add(number, numberType));

export const isBookingExpired = (
    wish: IWish,
    myUserId: IUser['id'] | undefined
): boolean => {
    // бажання заброньовано та належить користувачу та не виконано
    return (
        !!wish.booking?.userId &&
        (myUserId === wish.userId || myUserId === wish.booking?.userId) &&
        isBefore(wish.booking?.end, 0, 'day')
    );
};

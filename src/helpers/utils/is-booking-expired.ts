import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { IWish } from '@/models/Wish';
import { IUser } from '@/models/User';

dayjs.extend(isSameOrBefore);

const isBookingExpired = (
    wish: IWish,
    myUserId: IUser['id'] | undefined
): boolean => {
    // бажання заброньовано та належить користувачу та не виконано
    return (
        !!wish.booking?.userId &&
        (myUserId === wish.userId || myUserId === wish.booking?.userId) &&
        dayjs(wish.booking?.end).isSameOrBefore(dayjs())
    );
};

export default isBookingExpired;

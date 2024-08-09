import { IUser } from '@/models/User';

const getFullName = (user: IUser | null, text: string): string => {
    if (!user) return text;
    return user?.firstName + (user?.lastName ? ` ${user?.lastName}` : '');
};

export default getFullName;

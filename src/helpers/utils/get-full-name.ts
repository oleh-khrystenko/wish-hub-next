import { IUser } from '@/models/User';

const getFullName = (user: IUser | null) => {
    if (!user) return 'user not found (need translate)';
    return user?.firstName + (user?.lastName ? ` ${user?.lastName}` : '');
};

export default getFullName;

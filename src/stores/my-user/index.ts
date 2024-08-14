import { create } from 'zustand';
import { toast } from 'react-toastify';
import { ICandidate, IUser } from '@/models/User';
import {
    IAddFriend,
    IChangeLang,
    IChangePassword,
    IDeleteMyUser,
    IGoogleAuth,
    ILogin,
    IRegistration,
    IRemoveFriend,
    IUpdateMyUser,
    IUserId,
} from '@/stores/my-user/types';
import myUserApi from '@/stores/my-user/api';

interface IMyUserStore {
    myUser: IUser | null;
    candidate: ICandidate | null;
    isLoading: boolean;
    registration: (data: IRegistration, errorT: string) => Promise<void>;
    googleAuthorization: (data: IGoogleAuth, errorT: string) => Promise<void>;
    login: (data: ILogin, errorT: string) => Promise<void>;
    logout: (errorT: string) => Promise<void>;
    refresh: (errorT: string) => Promise<void>;
    changePassword: (data: IChangePassword) => Promise<void>;
    changeLang: (data: IChangeLang) => Promise<void>;
    changeShowedInfo: (data: IUserId) => Promise<void>;
    changeFirsLoaded: (data: IUserId) => Promise<void>;
    updateMyUser: (data: IUpdateMyUser) => Promise<void>;
    addFriend: (data: IAddFriend, errorT: string) => Promise<void>;
    removeFriend: (data: IRemoveFriend, errorT: string) => Promise<void>;
    deleteMyUser: (data: IDeleteMyUser) => Promise<void>;
}

export const useMyUserStore = create<IMyUserStore>((set) => ({
    myUser: null,
    candidate: null,
    isLoading: false,
    registration: async (data, errorT) => {
        set((state) => ({
            ...state,
            myUser: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.registration(data);

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
            set((state) => ({
                ...state,
                myUser: null,
            }));
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    googleAuthorization: async (data, errorT) => {
        set((state) => ({
            ...state,
            myUser: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.googleAuthorization(data);

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
            set((state) => ({
                ...state,
                myUser: null,
            }));
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    login: async (data, errorT) => {
        set((state) => ({
            ...state,
            myUser: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.login(data);

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
            set((state) => ({
                ...state,
                myUser: null,
            }));
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    logout: async (errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            await myUserApi.logout();

            localStorage.removeItem('token');
            localStorage.removeItem('selectedUserId');

            set((state) => ({
                ...state,
                myUser: null,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    refresh: async (errorT) => {
        set((state) => ({
            ...state,
            myUser: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.refresh();

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));
        } catch (error: any) {
            console.log(
                'my-user refresh error: ',
                error.response?.data?.message || errorT
            );

            localStorage.removeItem('token');
            localStorage.removeItem('selectedUserId');

            set((state) => ({
                ...state,
                myUser: null,
            }));
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    changePassword: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            await myUserApi.changePassword(data);

            localStorage.removeItem('token');

            // toast(
            //     t('alerts.my-user-api.change-password.success'),
            //     { type: 'success' },
            // );

            set((state) => ({
                ...state,
                myUser: null,
            }));
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message || t('alerts.my-user-api.change-password.error'),
            //     { type: 'error' },
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    changeLang: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.changeLang(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message || t('alerts.my-user-api.change-lang.error'),
            //     { type: 'error' },
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    changeShowedInfo: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.changeShowedInfo(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            // console.log('my-user changeShowedInfo error: ', error.response?.data?.message || t('alerts.my-user-api.update-data.error'));
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    changeFirsLoaded: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.changeFirsLoaded(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            // console.log('my-user changeFirsLoaded error: ', error.response?.data?.message || t('alerts.my-user-api.update-data.error'));
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    updateMyUser: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.updateMyUser(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message || t('alerts.my-user-api.update-my-user.error'),
            //     { type: 'error' },
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    addFriend: async (data, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.addFriend(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    removeFriend: async (data, errorT) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.removeFriend(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
    deleteMyUser: async (data) => {
        set((state) => ({
            ...state,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.deleteMyUser(data);

            localStorage.removeItem('token');
            localStorage.removeItem('selectedUserId');

            set((state) => {
                if (state.myUser?.id === response.data) {
                    return {
                        ...state,
                        myUser: null,
                    };
                }

                return {
                    ...state,
                };
            });
        } catch (error: any) {
            // toast(
            //     error.response?.data?.message || t('alerts.my-user-api.delete-my-user.error'),
            //     { type: 'error' },
            // );
        } finally {
            set((state) => ({
                ...state,
                isLoading: false,
            }));
        }
    },
}));

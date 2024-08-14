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
    error: string | null;
    isLoading: boolean;
    registration: (data: IRegistration) => Promise<void>;
    googleAuthorization: (data: IGoogleAuth) => Promise<void>;
    login: (data: ILogin) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
    changePassword: (data: IChangePassword) => Promise<void>;
    changeLang: (data: IChangeLang) => Promise<void>;
    changeShowedInfo: (data: IUserId) => Promise<void>;
    changeFirsLoaded: (data: IUserId) => Promise<void>;
    updateMyUser: (data: IUpdateMyUser) => Promise<void>;
    addFriend: (data: IAddFriend) => Promise<void>;
    removeFriend: (data: IRemoveFriend) => Promise<void>;
    deleteMyUser: (data: IDeleteMyUser) => Promise<void>;
}

export const useMyUserStore = create<IMyUserStore>((set) => ({
    myUser: null,
    candidate: null,
    error: null,
    isLoading: false,
    registration: async (data) => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.registration(data);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    googleAuthorization: async (data) => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.googleAuthorization(data);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    login: async (data) => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.login(data);

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            toast('googleErrorT', { type: 'error' });
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    logout: async () => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            await myUserApi.logout();

            set((state) => ({
                ...state,
                myUser: null,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error:
                    error instanceof Error
                        ? error.message
                        : 'Failed to log out.',
                isLoading: false,
            }));
        }
    },
    refresh: async () => {
        set((state) => ({
            ...state,
            myUser: null,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.refresh();

            set((state) => ({
                ...state,
                myUser: response.data.user,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    changePassword: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            await myUserApi.changePassword(data);

            set((state) => ({
                ...state,
                myUser: null,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    changeLang: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.changeLang(data);

            set((state) => ({
                ...state,
                myUser: response.data,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    changeShowedInfo: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.changeShowedInfo(data);

            set((state) => ({
                ...state,
                myUser: response.data,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    changeFirsLoaded: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.changeFirsLoaded(data);

            set((state) => ({
                ...state,
                myUser: response.data,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    updateMyUser: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.updateMyUser(data);

            set((state) => ({
                ...state,
                myUser: response.data,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    addFriend: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.addFriend(data);

            set((state) => ({
                ...state,
                myUser: response.data,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    removeFriend: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.removeFriend(data);

            set((state) => ({
                ...state,
                myUser: response.data,
                error: null,
                isLoading: false,
            }));
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
    deleteMyUser: async (data) => {
        set((state) => ({
            ...state,
            error: null,
            isLoading: true,
        }));

        try {
            const response = await myUserApi.deleteMyUser(data);

            set((state) => {
                if (state.myUser?.id === response.data) {
                    return {
                        ...state,
                        myUser: null,
                        error: null,
                        isLoading: false,
                    };
                }

                return {
                    ...state,
                    error: 'user not deleted',
                    isLoading: false,
                };
            });
        } catch (error) {
            set((state) => ({
                ...state,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
}));

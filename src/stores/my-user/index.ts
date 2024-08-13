import { create } from 'zustand';
import { toast } from 'react-toastify';
import { ICandidate, IUser } from '@/models/User';
import {
    IAddFriend,
    IGoogleAuth,
    ILogin,
    IRegistration,
    IRemoveFriend,
} from '@/stores/my-user/types';
import myUserApi from '@/stores/my-user/api';

interface IMyUserStore {
    myUser: IUser | null;
    candidate: ICandidate | null;
    isLoading: boolean;
    error: string | null;
    registration: (data: IRegistration) => void;
    googleAuthorization: (data: IGoogleAuth) => void;
    login: (data: ILogin) => void;
    logout: () => void;
    refresh: () => Promise<void>;
    addFriend: (data: IAddFriend) => Promise<void>;
    removeFriend: (data: IRemoveFriend) => Promise<void>;
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
                myUser: null,
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
                myUser: null,
                error: error instanceof Error ? error.message : 'error',
                isLoading: false,
            }));
        }
    },
}));

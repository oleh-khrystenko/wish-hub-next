import { create } from 'zustand';
import { toast } from 'react-toastify';
import { ICandidate, IUser } from '@/models/User';
import {
    IAddFriend,
    IChangeLang,
    IChangePassword,
    ICreateCollection,
    IDeleteMyUser,
    IGoogleAuth,
    ILogin,
    IRegistration,
    IRemoveFriend,
    IUpdateMyUser,
    IUserId,
} from '@/stores/my-user/types';
import { ICollection } from '@/models/Collection';
import myUserApi from '@/stores/my-user/api';
import { useSettingsStore } from '@/stores/settings';

const { setShowGlobalLoading } = useSettingsStore.getState();

interface IMyUserStore {
    myUser: IUser | null;
    collections: ICollection[];
    candidate: ICandidate | null;
    isLoading: boolean;
    setCandidate: (data: ICandidate) => void;
    registration: (data: IRegistration, errorT: string) => Promise<void>;
    googleAuthorization: (data: IGoogleAuth, errorT: string) => Promise<void>;
    login: (data: ILogin, errorT: string) => Promise<void>;
    logout: (errorT: string) => Promise<void>;
    refresh: (errorT: string) => Promise<IUser | void>;
    changePassword: (data: IChangePassword) => Promise<void>;
    changeLang: (data: IChangeLang, errorT: string) => Promise<void>;
    updateMyUser: (data: IUpdateMyUser, errorT: string) => Promise<void>;
    addFriend: (data: IAddFriend, errorT: string) => Promise<void>;
    removeFriend: (data: IRemoveFriend, errorT: string) => Promise<void>;
    deleteMyUser: (data: IDeleteMyUser) => Promise<void>;
    createCollection: (
        data: ICreateCollection,
        errorT: string
    ) => Promise<ICollection | void>;
    getCollections: (params: IUserId, errorT: string) => Promise<void>;
}

export const useMyUserStore = create<IMyUserStore>((set) => ({
    myUser: null,
    collections: [],
    candidate: null,
    isLoading: false,
    setCandidate: (data) => {
        set((state) => ({
            ...state,
            candidate: data,
        }));
    },
    registration: async (data, errorT) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            myUser: null,
        }));

        try {
            const response = await myUserApi.registration(data);

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                myUser: null,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    googleAuthorization: async (data, errorT) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            myUser: null,
        }));

        try {
            const response = await myUserApi.googleAuthorization(data);

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                myUser: null,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    login: async (data, errorT) => {
        setShowGlobalLoading(true);

        set((state) => ({
            ...state,
            myUser: null,
        }));

        try {
            const response = await myUserApi.login(data);

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));
        } catch (error: any) {
            set((state) => ({
                ...state,
                myUser: null,
            }));

            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    logout: async (errorT) => {
        setShowGlobalLoading(true);

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
            setShowGlobalLoading(false);
        }
    },
    refresh: async (errorT) => {
        set((state) => ({
            ...state,
            myUser: null,
        }));

        try {
            const response = await myUserApi.refresh();

            localStorage.setItem('token', response.data.accessToken);

            set((state) => ({
                ...state,
                myUser: response.data.user,
            }));

            return response.data.user;
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
        }
    },
    changePassword: async (data) => {
        setShowGlobalLoading(true);

        try {
            await myUserApi.changePassword(data);

            localStorage.removeItem('token');

            set((state) => ({
                ...state,
                myUser: null,
            }));
        } catch (error: any) {
            throw error;
        } finally {
            setShowGlobalLoading(false);
        }
    },
    changeLang: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await myUserApi.changeLang(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    updateMyUser: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await myUserApi.updateMyUser(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    addFriend: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await myUserApi.addFriend(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    removeFriend: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await myUserApi.removeFriend(data);

            set((state) => ({
                ...state,
                myUser: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    deleteMyUser: async (data) => {
        setShowGlobalLoading(true);

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
            throw error;
        } finally {
            setShowGlobalLoading(false);
        }
    },
    createCollection: async (data, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await myUserApi.createCollection(data);

            set((state) => ({
                ...state,
                collections: [response.data, ...state.collections],
            }));

            return response.data;
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
    getCollections: async (params, errorT) => {
        setShowGlobalLoading(true);

        try {
            const response = await myUserApi.getCollections(params);

            set((state) => ({
                ...state,
                collections: response.data,
            }));
        } catch (error: any) {
            toast(error.response?.data?.message || errorT, { type: 'error' });
        } finally {
            setShowGlobalLoading(false);
        }
    },
}));

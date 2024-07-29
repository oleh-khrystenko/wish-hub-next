import { configureStore } from '@reduxjs/toolkit';
import usersSliceReducer from '@/store/users/slice';
import wishesSliceReducer from '@/store/wishes/slice';

const store = configureStore({
    reducer: {
        users: usersSliceReducer,
        wishes: wishesSliceReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

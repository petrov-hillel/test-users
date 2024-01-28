import { configureStore } from '@reduxjs/toolkit';
import users from './slices/users';
import posts from './slices/posts';
import albums from './slices/albums';

const store = configureStore({
    reducer: { users, posts, albums },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;

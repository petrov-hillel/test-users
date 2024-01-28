import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {MAIN_API, useHttp} from "../../hooks/http.hook";


const initialState = {
    userPosts: [],
    postsFetchStatus: 'pending',
};

export const fetchUserPosts = createAsyncThunk(
    'posts/fetchUserPosts',
    async (id) => {
        const { request } = useHttp()
        return await request(`${MAIN_API}users/${id}/posts`)
    },
);

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserPosts.pending, (state) => {
                state.postsFetchStatus = 'loading';
            })
            .addCase(fetchUserPosts.rejected, (state) => {
                state.postsFetchStatus = 'error';
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.postsFetchStatus = 'pending';
                state.userPosts = action.payload;
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = postsSlice;
export default reducer;

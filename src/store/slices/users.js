import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {MAIN_API, useHttp} from "../../hooks/http.hook";


const initialState = {
    allUsers: [],
    usersFetchStatus: 'pending',
    user: null,
    userFetchStatus: 'pending',
    searchUserText: '',
};


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        const { request } = useHttp()
        return await request(`${MAIN_API}users`)
    },
);

export const fetchUser = createAsyncThunk(
    'users/fetchUser',
    async (id) => {
        const { request } = useHttp()
        return await request(`${MAIN_API}users/${id}`)
    },
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        searchUser: (state, action) => {
            state.searchUserText = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.usersFetchStatus = 'loading';
            })
            .addCase(fetchUsers.rejected, (state) => {
                state.usersFetchStatus = 'error';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.usersFetchStatus = 'pending';
                state.allUsers = action.payload;
            })

            .addCase(fetchUser.pending, (state) => {
                state.userFetchStatus = 'loading';
            })
            .addCase(fetchUser.rejected, (state) => {
                state.userFetchStatus = 'error';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userFetchStatus = 'pending';
                state.user = action.payload;
            })
            .addDefaultCase(() => {});
    },
});

const { actions, reducer } = usersSlice;
export const { searchUser } = actions
export default reducer;

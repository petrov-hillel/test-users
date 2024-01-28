import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {MAIN_API, useHttp} from "../../hooks/http.hook";


const initialState = {
    userAlbums: [],
    albumsFetchStatus: 'pending',
};

export const fetchUserAlbums = createAsyncThunk(
  'albums/fetchUserAlbums',
  async (id) => {
      const { request } = useHttp()
      return await request(`${MAIN_API}users/${id}/albums`)
  },
);

const albumsSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAlbums.pending, (state) => {
                state.albumsFetchStatus = 'loading';
            })
            .addCase(fetchUserAlbums.rejected, (state) => {
                state.albumsFetchStatus = 'error';
            })
            .addCase(fetchUserAlbums.fulfilled, (state, action) => {
                state.albumsFetchStatus = 'pending';
                state.userAlbums = action.payload;
            })
            .addDefaultCase(() => {});
    },
});

const { reducer } = albumsSlice;
export default reducer;

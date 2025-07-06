import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../services/userService';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        searchResults: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearUsers: (state) => {
            state.searchResults = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.searchResults = [];
                state.status = 'loading';
                state.error = null;
            })
            // .addCase(langUpdate.pending, (state) => {
            //     state.searchResults = [];
            //     state.status = 'loading';
            //     state.error = null;
            // })

            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.searchResults = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })

            // .addCase(langUpdate.fulfilled, (state, action) => {
            //     state.searchResults = action.payload;
            //     state.status = 'succeeded';
            //     state.error = null;
            // })

            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // .addCase(langUpdate.rejected, (state, action) => {
            //     state.status = 'failed';
            //     state.error = action.payload;
            // });
    },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;

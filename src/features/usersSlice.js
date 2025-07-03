import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, langUpdate } from '../services/userService';

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
                state.status = 'loading';
                state.error = null;
            })
            .addCase(langUpdate.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })

            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchResults = action.payload;
            })

            .addCase(langUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.searchResults = action.payload;
            })

            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            .addCase(langUpdate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;

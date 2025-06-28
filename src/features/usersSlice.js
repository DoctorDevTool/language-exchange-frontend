import { createSlice } from '@reduxjs/toolkit';
import {
    fetchUsers,
    getAllLanguages,
    langUpdate,
} from '../services/userService';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        status: 'idle',
        allLang: [],
        error: null,
    },
    reducers: {
        clearUsers: (state) => {
            state.list = [];
            state.status = 'idle';
            state.allLang = [];
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
            
            .addCase(getAllLanguages.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })

            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
           
            .addCase(langUpdate.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(getAllLanguages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allLang = action.payload;
            })

            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
           
            .addCase(langUpdate.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getAllLanguages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;

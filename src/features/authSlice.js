import { createSlice } from '@reduxjs/toolkit';
import { login, register, getMe } from '../services/authService';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        status: 'idle',
        error: null,
    },

    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

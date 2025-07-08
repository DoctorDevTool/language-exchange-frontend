import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/api';

export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const res = await axiosInstance.post(`/auth/register`, userData);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Registration failed'
            );
        }
    }
);
export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const res = await axiosInstance.post(`/auth/login`, credentials);
            localStorage.setItem('token', res.data.token);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Login failed'
            );
        }
    }
);
export const getMe = createAsyncThunk('users/me', async (thunkAPI) => {
    try {
        const res = await axiosInstance.get(`/users/me`);

        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(
            err.response.data.message || 'Login failed'
        );
    }
});
export const langUpdate = createAsyncThunk(
    'languages/update',
    async (data, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/users/me/languages`, data);
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Update failed!'
            );
        }
    }
);

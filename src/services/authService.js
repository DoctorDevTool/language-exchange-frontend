import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = createAsyncThunk(
    'auth/register',
    async (userData, thunkAPI) => {
        try {
            const res = await axios.post(`${API_URL}/auth/register`, userData);

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
            const res = await axios.post(`${API_URL}/auth/login`, credentials);
            localStorage.setItem('token', res.data.token);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Login failed'
            );
        }
    }
);
export const getMe = createAsyncThunk('users/me', async (token, thunkAPI) => {
    try {
        const res = await axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

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
            const res = await axios.put(`${API_URL}/users/me/languages`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Update failed!'
            );
        }
    }
);
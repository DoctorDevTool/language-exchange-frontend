import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/api';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ native, target }, thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/users`, {
                params: { native, target },
            });

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message || err.message);
        }
    }
);

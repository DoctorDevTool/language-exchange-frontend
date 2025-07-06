import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({ native, target }, thunkAPI) => {
        try {
            const res = await axios.get(`${API_URL}/users`, {
                params: { native, target },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.message || err.message);
        }
    }
);

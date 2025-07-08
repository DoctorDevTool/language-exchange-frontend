import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/api';

export const createReq = createAsyncThunk(
    'requests',
    async (userId, thunkAPI) => {
        try {
            const res = await axiosInstance.post(`/requests`, {
                to_user_id: userId,
            });

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);

export const deleteReq = createAsyncThunk(
    'requests/del',
    async (reqId, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(`/requests/${reqId}`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);

export const fetchIncoming = createAsyncThunk(
    'requests/incoming',
    async (thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/requests/incoming`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);

export const fetchOutgoing = createAsyncThunk(
    'requests/outgoing',
    async (thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/requests/outgoing`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);

export const acceptReq = createAsyncThunk(
    'requests/:id/accept',
    async (reqId, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/requests/${reqId}/accept`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);

export const declineReq = createAsyncThunk(
    'requests/:id/decline',
    async (reqId, thunkAPI) => {
        try {
            const res = await axiosInstance.put(`/requests/${reqId}/decline`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);

export const fetchMatches = createAsyncThunk(
    'requests/matches',
    async (thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/requests/matches`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);
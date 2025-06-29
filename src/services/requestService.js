import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createReq = createAsyncThunk(
    'requests',
    async (userId, thunkAPI) => {
        try {
            const res = await axios.post(
                `${API_URL}/requests`,
                {
                    to_user_id: userId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

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
            const res = await axios.delete(`${API_URL}/requests/${reqId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

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
            const res = await axios.get(`${API_URL}/requests/incoming`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

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
            const res = await axios.get(`${API_URL}/requests/outgoing`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

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
        console.log(reqId);
        try {
            const res = await axios.put(
                `${API_URL}/requests/${reqId}/accept`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

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
            const res = await axios.put(
                `${API_URL}/requests/${reqId}/decline`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                }
            );

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || err.message
            );
        }
    }
);

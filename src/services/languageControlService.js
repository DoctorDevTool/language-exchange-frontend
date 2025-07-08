import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../api/api';

export const addLanguage = createAsyncThunk(
    'languages/add',
    async (languageName, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/languages`,
                { language_name: languageName }
            );

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Could not add language'
            );
        }
    }
);


export const getAllLanguages = createAsyncThunk(
    'languages',
    async (thunkAPI) => {
        try {
            const res = await axiosInstance.get(`/languages`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Could not get throuph'
            );
        }
    }
);

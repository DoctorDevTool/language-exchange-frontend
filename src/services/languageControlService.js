import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const addLanguage = createAsyncThunk(
    'languages/add',
    async (languageName, thunkAPI) => {
        try {
            const res = await axios.post(
                `${API_URL}/languages`,
                { language_name: languageName },
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
                err.response.data.message || 'Could not add language'
            );
        }
    }
);


export const getAllLanguages = createAsyncThunk(
    'languages',
    async (thunkAPI) => {
        try {
            const res = await axios.get(`${API_URL}/languages`);

            return res.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(
                err.response.data.message || 'Could not get throuph'
            );
        }
    }
);

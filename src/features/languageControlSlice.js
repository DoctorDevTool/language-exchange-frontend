import { createSlice } from '@reduxjs/toolkit';
import { getAllLanguages } from '../services/languageControlService';

const languageControlSlice = createSlice({
    name: 'languageControl',
    initialState: {
        languages: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setLanguages: (state) => {
            state.languages = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLanguages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllLanguages.fulfilled, (state, action) => {
                state.languages = action.payload;
                state.status = 'succeeded';
            })
    }
});

export const { setLanguages } = languageControlSlice.actions;
export default languageControlSlice.reducer;
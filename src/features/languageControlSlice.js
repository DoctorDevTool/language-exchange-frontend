import { createSlice } from '@reduxjs/toolkit';
import {
    getAllLanguages,
    addLanguage,
} from '../services/languageControlService';

const languageControlSlice = createSlice({
    name: 'languageControl',
    initialState: {
        languages: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearLanguages: (state) => {
            state.languages = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLanguages.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(addLanguage.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getAllLanguages.fulfilled, (state, action) => {
                state.languages = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(addLanguage.fulfilled, (state, action) => {
                state.languages.push(action.payload);
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(getAllLanguages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addLanguage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearLanguages } = languageControlSlice.actions;
export default languageControlSlice.reducer;

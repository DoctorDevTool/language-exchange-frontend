import { createSlice } from '@reduxjs/toolkit';
import { createReq, deleteReq } from '../services/requestService';

const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        pending: [],
        accepted: [],
        declined: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearReqs: (state) => {
            state.pending = [];
            state.accepted = [];
            state.declined = [];
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createReq.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(createReq.fulfilled, (state, action) => {
                state.pending.push(action.payload);
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteReq.fulfilled, (state, action) => {
                state.pending = state.pending.filter(req => req.id !== Number(action.payload))
                state.status = 'succeeded';
                state.error = null;
            });
    },
});

export const { clearReqs } = requestsSlice.actions;
export default requestsSlice.reducer;

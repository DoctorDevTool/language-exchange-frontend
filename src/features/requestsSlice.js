import { createSlice } from '@reduxjs/toolkit';
import {
    createReq,
    deleteReq,
    fetchIncoming,
    fetchOutgoing,
} from '../services/requestService';

const requestsSlice = createSlice({
    name: 'requests',
    initialState: {
        incoming: [],
        outgoing: [],
        matches: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearReqs: (state) => {
            state.incoming = [];
            state.outgoing = [];
            state.matches = [];
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
                state.outgoing.push(action.payload);
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchIncoming.fulfilled, (state, action) => {
                state.incoming = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchOutgoing.fulfilled, (state, action) => {
                state.outgoing.push(action.payload);
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteReq.fulfilled, (state, action) => {
                state.outgoing = state.outgoing.filter(
                    (req) => req.id !== Number(action.payload)
                );
                state.status = 'succeeded';
                state.error = null;
            });
    },
});

export const { clearReqs } = requestsSlice.actions;
export default requestsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
    createReq,
    deleteReq,
    fetchIncoming,
    fetchOutgoing,
    fetchMatches,
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
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchIncoming.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchOutgoing.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMatches.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(deleteReq.pending, (state) => {
                state.status = 'loading';
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
                state.outgoing = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(fetchMatches.fulfilled, (state, action) => {
                state.matches = action.payload;
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(deleteReq.fulfilled, (state, action) => {
                state.outgoing = state.outgoing.filter(
                    (req) => req.id !== Number(action.payload.reqId)
                );
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(createReq.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchIncoming.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchOutgoing.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchMatches.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(deleteReq.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { clearReqs } = requestsSlice.actions;
export default requestsSlice.reducer;

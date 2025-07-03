import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import usersReducer from '../features/usersSlice';
import requestsReducer from '../features/requestsSlice'
import languageControlReducer from '../features/languageControlSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        reqs: requestsReducer,
        langControl: languageControlReducer,
    },
});

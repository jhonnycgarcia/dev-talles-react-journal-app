
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'checking', 'not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
        providerId: null,
    },
    reducers: {
        login: (state, { payload }) => {
            const { uid, email, displayName, photoURL, providerId } = payload;
            state.status = 'authenticated';
            state.uid = uid;
            state.email = email;
            state.displayName = displayName;
            state.photoURL = photoURL;
            state.errorMessage = null;
            state.providerId = providerId;
        },
        logout: (state, { payload }) => {
            const { error = null } = payload;
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = error;
            state.providerId = null;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
    }
});


// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;
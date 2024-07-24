import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: {
        user_id: null,
        username: '',
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loggedInUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = {
                user_id: null,
                username: '',
            }
        },
    },
});

export const { loggedInUser, logout } = authSlice.actions;
export default authSlice.reducer;

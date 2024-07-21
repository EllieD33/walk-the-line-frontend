import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/themeSlice";
import walksReducer from "./slices/walksSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        walks: walksReducer
    },
});

export default store;

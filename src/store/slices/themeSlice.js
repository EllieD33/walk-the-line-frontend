import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        fontLoaded: false
    }, reducers: {
        setFontLoaded: (state, action) => {
            state.fontLoaded = action.payload;
        },
    },
});

export const { setFontLoaded } = themeSlice.actions;
export default themeSlice.reducer;
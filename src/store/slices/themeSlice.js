import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        fontsLoaded: {
            satisfy: false,
            montserrat: false,
            montserratBold: false,
            montserratMedium: false,
        }
    }, reducers: {
        setFontsLoaded: (state, action) => {
            const { fontName, loaded } = action.payload;
            state.fontsLoaded[fontName] = loaded;
        },
    },
});

export const { setFontsLoaded } = themeSlice.actions;
export default themeSlice.reducer;
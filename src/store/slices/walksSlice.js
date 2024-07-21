import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getWalks } from "../../api";

export const fetchWalks = createAsyncThunk(
    'walks/fetchWalks',
    async () => {
        const data = await getWalks();
        return data;
    }
);

const initialState = {
    walks: [],
    status: 'idle', 
    error: null
}

const walksSlice = createSlice({
    name: "walks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWalks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchWalks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.walks = action.payload; 
            })
            .addCase(fetchWalks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default walksSlice.reducer;
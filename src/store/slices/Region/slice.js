import {createSlice} from "@reduxjs/toolkit";
import { regionAction } from "./actions";

export const regionSlice = createSlice({
    name: "region",
    initialState: {
        content: null,
        isLoading: true,
        error: null,
        pending: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(regionAction.pending, (state ) => {
                state.isLoading = true;
            })
            .addCase(regionAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(regionAction.fulfilled, (state, action ) => {
                state.content = action.payload;
                state.isLoading = false;
            })
    },

})

export default regionSlice.reducer;

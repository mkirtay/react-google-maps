import {createSlice} from "@reduxjs/toolkit";
import { regionDetailAction } from "./actions";

export const regionDetailSlice = createSlice({
    name: "regionDetail",
    initialState: {
        content: null,
        isLoading: true,
        error: null,
        pending: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(regionDetailAction.pending, (state ) => {
                state.isLoading = true;
            })
            .addCase(regionDetailAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(regionDetailAction.fulfilled, (state, action ) => {
                state.content = action.payload;
                state.isLoading = false;
            })
    },

})

export default regionDetailSlice.reducer;

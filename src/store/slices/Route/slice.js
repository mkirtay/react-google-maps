import {createSlice} from "@reduxjs/toolkit";
import { routeAction } from "./actions";

export const routeSlice = createSlice({
    name: "route",
    initialState: {
        content: null,
        isLoading: true,
        error: null,
        pending: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(routeAction.pending, (state ) => {
                state.isLoading = true;
            })
            .addCase(routeAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(routeAction.fulfilled, (state, action ) => {
                state.content = action.payload;
                state.isLoading = false;
            })
    },

})

export default routeSlice.reducer;

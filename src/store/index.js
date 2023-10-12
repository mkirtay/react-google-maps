import { configureStore } from '@reduxjs/toolkit'
import {regionSlice, regionDetailSlice, routeSlice} from "./slices";

const store = configureStore({
    reducer: {
        region: regionSlice,
        regionDetail: regionDetailSlice,
        route: routeSlice,
    }
})

export default store

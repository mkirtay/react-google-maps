import {createAsyncThunk} from "@reduxjs/toolkit";
import {http} from "../../../utilities/http";
import {decodePolyline} from "../../../utilities/functions";

export const routeAction = createAsyncThunk(
    "route",
    async (regionId) => {
        const check = await http('get', '/health/check');


        if (check.message === 'OK') {
            const request = await http('get', `/route/${regionId}`)
            return decodePolyline(request?.data?.encodedPolyline);
        } else {
            return false
        }
    }
);

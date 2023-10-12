import {createAsyncThunk} from "@reduxjs/toolkit";
import {http} from "../../../utilities/http";

export const routeAction = createAsyncThunk(
    "route",
    async (regionId) => {
        const check = await http('get', '/health/check');


        if (check.message === 'OK') {
            const request = await http('get', `/route/${regionId}`)

            const decodePolyline = (encoded) => {
                console.log(encoded, 'encdored')

                return window?.google?.maps?.geometry?.encoding?.decodePath(encoded);
            };

            console.log(request?.data, 'rwewe')


            const decodedPath = decodePolyline(request?.data);
            console.log(decodedPath, 'decaoded peathh')
            return request?.data;
        } else {
            return false
        }
    }
);

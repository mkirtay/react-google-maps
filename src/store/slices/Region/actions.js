import {createAsyncThunk} from "@reduxjs/toolkit";
import {http} from "../../../utilities/http";

export const regionAction = createAsyncThunk(
    "region",
    async () => {
        const check = await http('get', '/health/check');

        if ( check.message === 'OK' ) {
            const request = await http('get', '/region')
            return request?.list.map((item) => ({
                value: item.id,
                label: item.name,
            }));
        } else {
            return false
        }

    }
);



import {createAsyncThunk} from "@reduxjs/toolkit";
import {http} from "../../../utilities/http";

export const regionDetailAction = createAsyncThunk(
    "regionDetail",
    async (regionId) => {
        const check = await http('get', '/health/check');


        if (check.message === 'OK') {
            const request = await http('get', `/region/${regionId}`)
            const polygon = request?.data?.polygon?.coordinates?.map((item) => {
                return item.map((detailItem) => {
                    return {
                        lat: detailItem[1],
                        lng: detailItem[0],
                    }
                })
            })

            return {
                ...request?.data,
                center: {
                    coordinates: {
                        lat: request?.data?.center?.coordinates[1],
                        lng: request?.data?.center?.coordinates[0],
                    }
                },
                polygon: {
                    coordinates: [
                        ...polygon
                    ]
                }

            }


        } else {
            return false
        }
    }
);



/*
{
    lat: item[0],
        lng: item[1]
}*/

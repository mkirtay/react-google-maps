import axios from "axios";

export const http = async (type, endpoint, data) => {
    try {
        const req = await axios({
            method: type,
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
                "withCredentials": true,
                "x-api-key" : "Y2FuZGlkYXRlOkNFODIyN0xEOGFLODJiMWY1ODc2NzNSMEdmMw==",
                "x-force-correct": '0',
            },
            ...data
        })

        return await req.data;
    } catch (error) {
        return error
    }
}

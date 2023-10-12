export const decodePolyline = (encoded) => {
    const len = encoded.length;
    let index = 0;
    const path = [];
    let lat = 0;
    let lng = 0;

    while (index < len) {
        let shift = 0;
        let result = 0;
        let byte;

        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        lat += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

        shift = 0;
        result = 0;

        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        lng += (result & 1) !== 0 ? ~(result >> 1) : result >> 1;

        path.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }

    return path;
};

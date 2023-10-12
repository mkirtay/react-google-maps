import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import Select from 'react-select';
import {GoogleMap, useJsApiLoader, Polygon, LoadScript, Polyline} from '@react-google-maps/api';
import { Box } from "../../components";

/*import { Select } from "../../components";*/
import {regionAction} from "../../store/slices/Region/actions";
import {regionDetailAction} from "../../store/slices/RegionDetail/actions";
import {routeAction} from "../../store/slices/Route/actions";


const containerStyle = {
    width: '400px',
    height: '400px'
};

const Home = () => {
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState({value: 'region1', label: 'Davutpaşa'});
    const regions = useSelector((state) => state?.region?.content)
    const regionDetailCenter = useSelector((state) => state?.regionDetail?.content?.center?.coordinates)
    const regionPolygon = useSelector((state) => state?.regionDetail?.content?.polygon?.coordinates[0])
    const routePolyline = useSelector((state) => state?.route?.content)

    const onChangeSelect = (e) => {
        setSelectedOption(e)
        dispatch(regionDetailAction(e.value))
    }

    useEffect(() => {
        dispatch(regionAction())
        dispatch(regionDetailAction('region1'))
        dispatch(routeAction('region1'))
    }, [])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAptssTzy1Zua_KojTUo0xuaoaxFj58aBI"
    })

    /*const decodePolyline = (encoded) => {
        console.log(encoded, 'encdored')

        return window?.google?.maps?.geometry?.encoding?.decodePath(encoded);
    };


    const decodedPath = decodePolyline(routePolyline?.encodedPolyline);


    console.log(decodedPath, 'decodedPath')*/

    return <div className="home">
        <div className="container">
            <Box title="Bölge">
                <Select
                    value={selectedOption}
                    onChange={onChangeSelect}
                    options={regions}
                />
            </Box>

            { isLoaded && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={ regionDetailCenter }
                    zoom={12}
                >
                    <Polygon
                        paths={regionPolygon}
                        options={{
                            fillColor: "#FF0000",
                            fillOpacity: 0.35,
                            strokeColor: "#FF0000",
                            strokeOpacity: 1,
                            strokeWeight: 2,
                        }}
                    />
                    {/*<Polyline
                        path={decodedPath}
                        options={{
                            strokeColor: '#FF0000',
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: '#FF0000',
                            fillOpacity: 0.35,
                            clickable: false,
                            draggable: false,
                            editable: false,
                            visible: true,
                            radius: 30000,
                            zIndex: 1
                        }}
                    />*/}
                </GoogleMap>
            )  }
        </div>
    </div>
}

export default Home;

import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import Select from 'react-select';
import {GoogleMap, useJsApiLoader, Polygon, Polyline, Marker} from '@react-google-maps/api';
import {Box} from "../../components";

import {regionAction} from "../../store/slices/Region/actions";
import {regionDetailAction} from "../../store/slices/RegionDetail/actions";
import {routeAction} from "../../store/slices/Route/actions";

import './home.scss';
import {polygonOptions, polylineOptions} from "../../utilities/options";


const containerStyle = {
    width: '100%',
    minHeight: '100vh',
    height: '100%'
};

const Home = () => {
    const dispatch = useDispatch();
    const markerRef = useRef(null);
    const [selectedOption, setSelectedOption] = useState(JSON.parse(localStorage.getItem("region")));

    const regions = useSelector((state) => state?.region?.content)
    const regionDetailCenter = useSelector((state) => state?.regionDetail?.content?.center?.coordinates)
    const regionPolygon = useSelector((state) => state?.regionDetail?.content?.polygon?.coordinates[0])
    const routePolyline = useSelector((state) => state?.route?.content)

    const [index, setIndex] = useState(localStorage.getItem("selectedPlace") ? localStorage.getItem("selectedPlace") : 0);

    const onChangeSelect = (e) => {
        setSelectedOption(e)
        setIndex(0)
        localStorage.setItem('selectedPlace', 0)
        localStorage.setItem("region", JSON.stringify(e))

        dispatch(regionDetailAction(e.value))
        dispatch(routeAction(e.value))
    }

    useEffect(() => {
        dispatch(regionAction())
        const firstRegion = {value: 'region1', label: 'Davutpaşa'}

        if (!localStorage.getItem("region")) {
            const objectString = JSON.stringify(firstRegion);
            localStorage.setItem("region", objectString)
            dispatch(regionDetailAction(firstRegion.value))
            dispatch(routeAction(firstRegion.value))
        } else {
            const regionOnStorage = JSON.parse(localStorage.getItem("region"))
            dispatch(regionDetailAction(regionOnStorage?.value))
            dispatch(routeAction(regionOnStorage?.value))
        }

    }, [])

    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyAptssTzy1Zua_KojTUo0xuaoaxFj58aBI"
    })


    useEffect(() => {
        const timer = setInterval(() => {
            setIndex(prevIndex => {
                const nextIndex = Number(prevIndex) + 1;
                localStorage.setItem('selectedPlace', nextIndex)
                if (nextIndex === routePolyline?.length) {
                    clearInterval(timer);
                    localStorage.setItem('selectedPlace', 0)
                    return routePolyline?.length - 1
                }
                return nextIndex;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [routePolyline]);

    return <div className="home">
        <Box title="Bölge">
            <Select value={selectedOption}
                    onChange={onChangeSelect}
                    options={regions}
            />
        </Box>
        {isLoaded ? (
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={regionDetailCenter}
                zoom={15}
            >
                <Polygon
                    paths={regionPolygon}
                    options={polygonOptions}
                />
                <Marker position={routePolyline?.at(index)}
                        ref={markerRef}
                        icon='./images/courier-marker.png'
                />
                <Marker position={routePolyline?.at(-1)}
                        icon='./images/home-marker.png'
                />
                <Polyline
                    path={routePolyline}
                    options={polylineOptions}
                />
            </GoogleMap>
        ) : <h1>...Loading</h1>}
    </div>
}

export default Home;

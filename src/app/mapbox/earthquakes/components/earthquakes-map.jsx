"use client";

import { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import Map, { Source, Layer } from 'react-map-gl';
import { heatmapLayer } from './map-style';
import ControlPanel from "../components/control-panel";
import "mapbox-gl/dist/mapbox-gl.css";


// const mapboxToken = process.env.MAPBOX_TOKEN;
const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

function filterFeaturesByDay(featureCollection, time) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const features = featureCollection.features.filter(feature => {
        const featureDate = new Date(feature.properties.time);

        return (
            featureDate.getFullYear() === year &&
            featureDate.getMonth() === month &&
            featureDate.getDate() === day
        );
    });

    return { type: 'FeatureCollection', features };
};

export default function EarthquakesMap() {
    // The following values can be changed to control rotation speed:

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 120;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
        const zoom = Map.getZoom();

        if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
            let distancePerSecond = 360 / secondsPerRevolution;

            if (zoom > slowSpinZoom) {
                // Slow spinning at higher zooms
                const zoomDif =
                    (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
                distancePerSecond *= zoomDif;
            }

            const center = Map.getCenter();

            center.lng -= distancePerSecond;
            // Smoothly animate the map over one second.
            // When this animation is complete, it calls a 'moveend' event.
            Map.easeTo({ center, duration: 1000, easing: (n) => n });
        };
    };

    const [allDays, useAllDays] = useState(true);
    const [timeRange, setTimeRange] = useState([0, 0]);
    const [selectedTime, selectTime] = useState(0);
    const [earthquakes, setEarthQuakes] = useState(null);

    useEffect(() => {

        /* global fetch */
        fetch('https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson')
            .then(resp => resp.json())
            .then(json => {
                // Note: In a real application you would do a validation of JSON data before doing anything with it,
                // but for demonstration purposes we ingore this part here and just trying to select needed data...
                const features = json.features;
                const endTime = features[0].properties.time;
                const startTime = features[features.length - 1].properties.time;

                setTimeRange([startTime, endTime]);
                setEarthQuakes(json);
                selectTime(endTime);
            })
            .catch(err => console.error('Could not load data', err)); // eslint-disable-line
    }, []);

    const data = useMemo(() => {
        return allDays ? earthquakes : filterFeaturesByDay(earthquakes, selectedTime);
    }, [earthquakes, allDays, selectedTime]);


    return (
        <>
            <Map
                mapboxAccessToken={mapboxToken}
                initialViewState={{
                    longitude: -98.5556,
                    latitude: 39.8097,
                    bearing: 0,
                    pitch: 0,
                    zoom: 2,
                }}
                mapStyle="mapbox://styles/mapbox/satellite-v9"
                // mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
                // mapStyle="mapbox://styles/mapbox/streets-v12"
                // mapStyle="mapbox://styles/celestialcoyote/clni9lajn084401qbahu19g4g"
                projection="globe"
                style={{
                    borderRadius: 10,
                    background: "black",
                }}
            >
                {data && (
                    <Source type="geojson" data={data}>
                        <Layer {...heatmapLayer} />
                    </Source>
                )}

                {/* <GeolocateControl position="top-left" /> */}
                {/* <FullscreenControl position="top-left" /> */}
                {/* <NavigationControl position="top-left" /> */}
            </Map>

            <ControlPanel
                startTime={timeRange[0]}
                endTime={timeRange[1]}
                selectedTime={selectedTime}
                allDays={allDays}
                onChangeTime={selectTime}
                onChangeAllDays={useAllDays}
            />
        </>
    );
};

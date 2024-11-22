"use client";

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function BasicMap() {
    const mapContainerRef = useRef(null);

    const [lng, setLng] = useState(-98.583333);
    const [lat, setLat] = useState(39.833333);
    const [zoom, setZoom] = useState(3.5);

    // Initialize map when component mounts
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/satellite-v9",
            center: [lng, lat],
            zoom: zoom
        });

        // Add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        map.on('move', () => {
            setLng(map.getCenter().lng.toFixed(4));
            setLat(map.getCenter().lat.toFixed(4));
            setZoom(map.getZoom().toFixed(2));
        });

        // Clean up on unmount
        return () => map.remove();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="w-full h-screen pb-16">
            <div className="flex justify-center bg-slate-200 text-xl gap-x-12 rounded-xl mb-8 p-2">
                <div className="">
                    Longitude: {lng} |
                </div>

                <div className="">
                    Latitude: {lat} |
                </div>

                <div className="">
                    Zoom: {zoom}
                </div>
            </div>

            <div
                ref={mapContainerRef}
                className="w-full h-full object-contain rounded-2xl"
            />
        </div>
    );
};

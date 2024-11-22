"use client";

import { useRef, useState } from "react";
import Map, { Layer, Source, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import { stateFillLayer, countyFillLayer, zipFillLayer } from "./map-styles";
import Details from "./details";
import SelectMapStyle from "@/components/maps/select-map-style";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import "mapbox-gl/dist/mapbox-gl.css";


const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const initialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "mercator",
    zoom: 3.5,
    minZoom: 1.0,
    maxZoom: 22
};


export default function ZipCodeMap() {
    const mapRef = useRef();
    const [mapStyle] = useState("mapbox://styles/mapbox/streets-v12");
    const [state, setState] = useState(false);
    const [county, setCounty] = useState(false);
    const [zip, setZip] = useState(false);
    const [stateZoom, setStateZoom] = useState([2, 9]);
    const [countyZoom, setCountyZoom] = useState([6, 10]);
    const [zipZoom, setZipZoom] = useState([9, 14]);


    return (
        <div className="flex w-full h-full gap-x-4">
            <div className="bg-slate-200 text-black w-[45%] rounded-lg px-4">
                <h2 className="text-center mb-6">Set Scale Levels</h2>

                <Details
                    state={state} setState={setState} stateZoom={stateZoom} setStateZoom={setStateZoom}
                    county={county} setCounty={setCounty} countyZoom={countyZoom} setCountyZoom={setCountyZoom}
                    zip={zip} setZip={setZip} zipZoom={zipZoom} setZipZoom={setZipZoom}
                />
            </div>

            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxToken}
                ref={mapRef}
                style={{ borderRadius: 8 }}
            >
                <Source
                    type="vector"
                    url="mapbox://celestialcoyote.98li4t0s"
                >
                    {state &&
                        <Layer beforeId="waterway-label" {...stateFillLayer(stateZoom)} />
                    }

                    {county &&
                        <Layer beforeId="waterway-label" {...countyFillLayer(countyZoom)} />
                    }
                    {zip &&
                        <Layer beforeId="waterway-label" {...zipFillLayer(zipZoom)} />
                    }
                </Source>

                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl />

                <div className="absolute top-6 left-6">
                    <SelectMapStyle mapRef={mapRef} />
                </div>

                <div className="absolute top-6 left-0 right-0">
                    <ZoomLevelDisplay mapRef={mapRef} />
                </div>
            </Map>
        </div>
    );
};

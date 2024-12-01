"use client";

import { useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import { useZipCodeHandlers } from "./components/zip-code-handlers";
import BAH from "./components/bah";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import BaseMarkersDropdown from "@/components/military-base-markers/base-markers-dropdown";
import ZipCodeLayers from "./components/layers-zip-code";
import { basesFill } from "@/components/military-base-markers/base-fill-style";
import "mapbox-gl/dist/mapbox-gl.css";


const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const initialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "mercator",
    zoom: 3.5,
    minZoom: 2.5,
    maxZoom: 18
};

export default function MHAMap() {
    const mapRef = useRef();
    const [selectedZip, setSelectedZip] = useState(null);
    const [bah, setBah] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);


    // useState, filter and functions for zip code selections
    const [zipHoverInfo, setZipHoverInfo] = useState(null);
    const [selectedZipCodes, setSelectedZipCodes] = useState([]);
    const hoverZip = (zipHoverInfo && zipHoverInfo.GEOID) || '';

    const { onZipHover, onZipClick, zipFilter, filteredZipData } =
        useZipCodeHandlers({
            setZipHoverInfo,
            setSelectedZipCodes,
            selectedZipCodes,
            selectedArea,
            hoverZip,
            mapRef, // Pass mapRef here
            setBah, // Pass setBah if needed
            setSelectedZip, // Pass setSelectedZip if needed
        });


    return (
        <div className="flex flex-row w-full h-full max-h-full gap-x-4">
            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={mapboxToken}
                interactiveLayerIds={['zip']}
                onMouseMove={onZipHover}
                onClick={onZipClick}
                ref={mapRef}
                style={{ borderRadius: 8 }}
            >
                {/* Zip code layers */}
                <ZipCodeLayers
                    zipFilter={zipFilter}
                    filteredZipData={filteredZipData}
                    selectedArea={selectedArea}
                />

                <Source type="vector" url="mapbox://celestialcoyote.2xl084fl">
                    <Layer {...basesFill} />
                </Source>

                {hoverZip && (
                    <Popup
                        offset={25}
                        anchor="bottom"
                        latitude={zipHoverInfo.latitude}
                        longitude={zipHoverInfo.longitude}
                        closeButton={false}
                        closeOnClick={false}
                    >
                        <div className="flex bg-blue-400 text-black justify-center p-2">
                            <p className="font-bold">Zip:</p>
                            <p className="ml-2">{hoverZip}</p>
                        </div>
                    </Popup>
                )}


                {/* Native Mapbox controls. */}
                <ScaleControl position={"bottom-right"} />
                <GeolocateControl position={"bottom-right"} />
                <NavigationControl position={"bottom-right"} />

                {/* Custom controls. */}
                <div className="absolute top-2 left-0 right-0 hidden lg:block">
                    <ZoomLevelDisplay
                        mapRef={mapRef}
                        initialView={initialViewState}
                    />
                </div>

                <div className="absolute top-2 right-2">
                    <BaseMarkersDropdown
                        mapRef={mapRef}
                        setSelectedArea={setSelectedArea}
                    />
                </div>

                <div className="absolute bottom-8 left-2 flex flex-col bg-slate-100 text-black w-[300px] h-[300px] rounded-lg gap-y-2 px-2 py-1">
                    <h4 className="text-center mb-2">
                        Military Housing Allowance
                    </h4>

                    <div className="flex flex-col w-full h-full gap-y-4 overflow-y-hidden">
                        {selectedArea &&
                            <div className="flex flex-col items-center">
                                <h4 className="text-center font-bold">
                                    Installation:
                                </h4>

                                <p className="text-center">
                                    {selectedArea.properties.installation}
                                </p>
                            </div>
                        }

                        {selectedZip &&
                            <BAH data={bah} />
                        }
                    </div>
                </div>
            </Map>
        </div>
    );
};

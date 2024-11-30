"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import { GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import BAH from "./bah";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import BaseMarkersDropdown from "@/components/military-base-markers/base-markers-dropdown";
import { zipLayer, zipHighlightLayer, createZipLayer } from "./map-style";
import { basesFill } from "@/components/military-base-markers/base-fill-style";
import mhaData from "./mha-data-2024.json";
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
    const [zipHoverInfo, setZipHoverInfo] = useState(null);
    const [selectedZip, setSelectedZip] = useState(null);
    const [bah, setBah] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);


    // Filter zipData based on selectedArea's zip codes
    const filteredZipData = useMemo(() => {
        if (selectedArea && selectedArea.properties["zip_codes"]) {
            return selectedArea.properties["zip_codes"];
        }

        return [];
    }, [selectedArea]);

    const onZipHover = useCallback(event => {
        const zip = event.features && event.features[0];
        const zipNumber = zip && zip.properties.ZCTA5CE20;

        if (zip) {
            setZipHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                GEOID: zipNumber,
            });
        } else {
            setZipHoverInfo(null);
        }
    }, []);

    const hoverZip = (zipHoverInfo && zipHoverInfo.GEOID) || '';
    const zipFilter = useMemo(() => {
        if (hoverZip) {
            return ['in', 'GEOID20', hoverZip];
        } else {
            return ['==', 'GEOID20', '']; // Provide a default filter value when selectedZip is null
        }
    }, [hoverZip]);

    // Handle when user clicks on highlighted zip code.
    const handleZipClick = useCallback(event => {
        const layerIds = mapRef.current.getStyle().layers.map(layer => layer.id);

        // Ensure 'zip' is in the list
        if (!layerIds.includes('zip')) {
            console.error("Layer 'zip' does not exist.");
        }

        const features = mapRef.current.queryRenderedFeatures(event.point, {
            layers: ['zip', 'zip']
        });

        const getBAHByZipCode = (zipCode) => {
            const mhaArea = mhaData.find(item => item.zip_codes.includes(zipCode));
            const bahRates = mhaArea ? mhaArea.bah : null;

            setBah(bahRates);
        };

        if (features.length > 0) {
            const zipNumber = features[0].properties.GEOID20; // Extract zip code from GEOID20 property

            setSelectedZip(zipNumber);
            getBAHByZipCode(zipNumber);
        } else {
            setSelectedZip(null);
        };
    }, [mhaData]);

    return (
        <div className="flex flex-row w-full h-full max-h-full gap-x-4">
            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={mapboxToken}
                interactiveLayerIds={['zip']}
                onMouseMove={onZipHover}
                onClick={handleZipClick}
                ref={mapRef}
                style={{ borderRadius: 8 }}
            >
                <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
                    {selectedArea &&
                        <Layer
                            beforeId="waterway-label"
                            {...createZipLayer(filteredZipData)}
                        />
                    }

                    <Layer
                        beforeId="waterway-label"
                        {...zipLayer}
                    />

                    <Layer
                        beforeId="waterway-label"
                        {...zipHighlightLayer} filter={zipFilter}
                    />
                </Source>

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

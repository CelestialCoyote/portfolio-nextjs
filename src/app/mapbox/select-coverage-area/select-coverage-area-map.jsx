"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Map, { Layer, Source, FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import { stateFillLayer, stateHighlightLayer, countyFillLayer, countyHighlightLayer, zipFillLayer, zipHighlightLayer } from "./map-styles";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import SelectionAreaType from "./selection-area-type";
import DraggablePopup from "./draggable-popup";
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

export default function SelectCoverageAreaMap() {
    const mapRef = useRef();
    const [mapStyle] = useState("mapbox://styles/mapbox/light-v11");
    const [selectAreaType, setSelectAreaType] = useState("state");

    const [stateHoverInfo, setStateHoverInfo] = useState(null);
    const [selectedStates, setSelectedStates] = useState([]);

    const [countyHoverInfo, setCountyHoverInfo] = useState(null);
    const [selectedCounty, setSelectedCounty] = useState([]);

    const [zipHoverInfo, setZipHoverInfo] = useState(null);
    const [selectedZip, setSelectedZip] = useState([]);


    // Handle hover effect for states
    const onStateHover = useCallback(
        (event) => {
            const state = event.features && event.features[0];
            const stateName = state && state.properties.STATEFP;

            if (state) {
                setStateHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    STATE: stateName,
                });
            } else {
                setStateHoverInfo(null);
            }
        },
        []
    );

    // Handle hover effect for counties
    const onCountyHover = useCallback(
        (event) => {
            const county = event.features && event.features[0];
            const countyName = county && county.properties.GEOID;

            if (county) {
                setCountyHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    COUNTY: countyName,
                });
            } else {
                setCountyHoverInfo(null);
            }
        },
        []
    );

    // Handle hover effect for ZIP codes
    const onZipHover = useCallback(
        (event) => {
            const zip = event.features && event.features[0];
            const zipNumber = zip && zip.properties.ZCTA5CE20; // Use ZCTA5CE20 for ZIP codes

            if (zip) {
                setZipHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    ZIP: zipNumber, // Store ZIP code
                });
            } else {
                setZipHoverInfo(null);
            }
        },
        []
    );

    // Decide hover behavior based on selectAreaType
    const onHover = useCallback(
        (event) => {
            if (selectAreaType === "state") {
                onStateHover(event);
            } else if (selectAreaType === "county") {
                onCountyHover(event);
            } else if (selectAreaType === "zip") {
                onZipHover(event);
            };
        },
        [selectAreaType, onStateHover, onCountyHover, onZipHover]
    );

    // Filters for hover effect
    const hoverState = (stateHoverInfo && stateHoverInfo.STATE) || '';
    const hoverCounty = (countyHoverInfo && countyHoverInfo.COUNTY) || '';
    const hoverZip = (zipHoverInfo && zipHoverInfo.ZIP) || '';

    const stateFilter = useMemo(() => {
        if (hoverState) {
            return ['in', 'STATEFP', hoverState]; // Filter based on STATEFP (state code)
        } else {
            return ['==', 'STATEFP', '']; // Default filter for no state hover
        }
    }, [hoverState]);

    const countyFilter = useMemo(() => {
        if (hoverCounty) {
            return ['in', 'GEOID', hoverCounty]; // Filter based on STATEFP (state code)
        } else {
            return ['==', 'GEOID', '']; // Default filter for no state hover
        }
    }, [hoverCounty]);

    const zipFilter = useMemo(() => {
        if (hoverZip) {
            return ['in', 'ZCTA5CE20', hoverZip]; // Filter based on ZCTA5CE20 (ZIP code)
        } else {
            return ['==', 'ZCTA5CE20', '']; // Default filter for no ZIP hover
        }
    }, [hoverZip]);

    return (
        <div className="flex w-full h-full">
            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxToken}
                interactiveLayerIds={["state-fill", "county-fill", "zip-fill"]}
                onMouseMove={onHover}
                ref={mapRef}
                style={{ borderRadius: 8 }}
            >
                {selectAreaType == "state" && (
                    <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
                        <Layer
                            beforeId="waterway-label"
                            {...stateFillLayer}
                        />

                        <Layer
                            beforeId="waterway-label"
                            {...stateHighlightLayer}
                            filter={stateFilter}
                        />
                    </Source>
                )}

                {selectAreaType == "county" && (
                    <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
                        <Layer
                            beforeId="waterway-label"
                            {...countyFillLayer}
                        />

                        <Layer
                            beforeId="waterway-label"
                            {...countyHighlightLayer}
                            filter={countyFilter}
                        />
                    </Source>
                )}

                {selectAreaType == "zip" && (
                    <Source type="vector" url="mapbox://celestialcoyote.98li4t0s">
                        <Layer
                            id="zip-fill"
                            beforeId="waterway-label"
                            {...zipFillLayer}
                        />

                        <Layer
                            id="zip-highlight"
                            beforeId="waterway-label"
                            {...zipHighlightLayer}
                            filter={zipFilter}
                        />
                    </Source>
                )}

                {/* Native Mapbox controls. */}
                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl />

                {/* Custom controls. */}
                <div className="absolute top-6 left-0 right-0">
                    <ZoomLevelDisplay mapRef={mapRef} />
                </div>

                <div className="absolute top-6 left-6">
                    <SelectionAreaType
                        selectAreaType={selectAreaType}
                        setSelectAreaType={setSelectAreaType}
                    />
                </div>

                {/* Draggable window for selected states */}
                {selectAreaType == "state" &&
                    <DraggablePopup>
                        <div
                            className="absolute bg-white text-black w-48 rounded p-2 cursor-move"
                            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                        >
                            <h4 className="text-center font-bold mb-2">
                                Selected States
                            </h4>

                            <div className="h-48 text-sm overflow-auto">
                                {selectedStates.length > 0 ? (
                                    // Sort states when rendering
                                    selectedStates
                                        .slice() // create a copy to avoid mutating original state
                                        .sort()
                                        .map((state, index) => (
                                            <p key={index}>{state}</p>
                                        ))
                                ) : (
                                    <p className="text-center text-mw_red">
                                        No states selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </DraggablePopup>
                }

                {/* Draggable window for selected counties */}
                {selectAreaType == "county" &&
                    <DraggablePopup>
                        <div
                            className="absolute bg-white text-black w-48 rounded p-2 cursor-move"
                            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                        >
                            <h4 className="text-center font-bold mb-2">
                                Selected Counties
                            </h4>

                            <div className="h-48 text-sm overflow-auto">
                                {selectedCounty.length > 0 ? (
                                    // Sort states when rendering
                                    selectedCounty
                                        .slice() // create a copy to avoid mutating original state
                                        .sort()
                                        .map((county, index) => (
                                            <p key={index}>{county}</p>
                                        ))
                                ) : (
                                    <p className="text-center text-mw_red">
                                        No counties selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </DraggablePopup>
                }

                {/* Draggable window for selected zip codes */}
                {selectAreaType == "zip" &&
                    <DraggablePopup>
                        <div
                            className="absolute bg-white text-black w-48 rounded p-2 cursor-move"
                            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                        >
                            <h4 className="text-center font-bold mb-2">
                                Selected Zip Codes
                            </h4>

                            <div className="h-48 text-sm overflow-auto">
                                {selectedZip.length > 0 ? (
                                    // Sort states when rendering
                                    selectedZip
                                        .slice() // create a copy to avoid mutating original state
                                        .sort()
                                        .map((zip, index) => (
                                            <p key={index}>{zip}</p>
                                        ))
                                ) : (
                                    <p className="text-center text-mw_red">
                                        No zip codes selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </DraggablePopup>
                }
            </Map>
        </div>
    );
};

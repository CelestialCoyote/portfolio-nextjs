"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import { stateFillLayer, stateHighlightLayer, stateSelectedLayer } from "./map-styles-state";
import { countyFillLayer, countyHighlightLayer, countySelectedLayer } from "./map-styles-county";
import { zipFillLayer, zipHighlightLayer, zipSelectedLayer } from "./map-styles-zip-code";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import SelectionAreaType from "./selection-area-type";
import DraggablePopup from "./draggable-popup";
import { stateFipsCodes } from "./state-fips-codes";
import styles from "./map-popup.module.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { useStateHandlers } from "./state-selection-handlers";
import { StateHoverPopup, SelectedStatesPopup } from "./state-selection-handlers";

// import { useCountyHandlers } from "./county-selection-handlers";
// import { CountyHoverPopup, SelectedCountyPopup } from "./county-selection-handlers";


const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const initialViewState = {
    longitude: -98.583333,
    latitude: 39.833333,
    projection: "mercator",
    zoom: 3.5,
    minZoom: 1.0,
    maxZoom: 22
};

// Helper function to get the USPS code from STATEFP
const getStateUSPS = (stateFP) => {
    const state = stateFipsCodes.find((state) => state.STATEFP === stateFP);
    return state ? state.STUSPS : stateFP;  // Fallback to STATEFP if not found
};

export default function SelectCoverageAreaMap() {
    const mapRef = useRef();
    const [mapStyle] = useState("mapbox://styles/mapbox/light-v11");
    const [selectAreaType, setSelectAreaType] = useState("state");

    const [stateHoverInfo, setStateHoverInfo] = useState(null);
    const [selectedStates, setSelectedStates] = useState([]);

    const [countyHoverInfo, setCountyHoverInfo] = useState(null);
    const [selectedCounties, setSelectedCounties] = useState([]);

    const [zipHoverInfo, setZipHoverInfo] = useState(null);
    const [selectedZip, setSelectedZip] = useState([]);

    // Filters for hover effect
    const hoverState = (stateHoverInfo && stateHoverInfo.STATE) || '';

    const { onStateHover, onStateClick, stateFilter, selectedStateFilter } =
        useStateHandlers({ setStateHoverInfo, setSelectedStates, selectedStates, hoverState });

    // const hoverCounty = (stateHoverInfo && stateHoverInfo.STATE) || '';

    // const { onCountyHover, onCountyClick, countyFilter, selectedCountyFilter } =
    //     useCountyHandlers({ setCountyHoverInfo, setSelectedCounty, selectedCounty, hoverCounty });


    // Handle hover effect for counties
    const onCountyHover = useCallback(
        (event) => {
            const county = event.features && event.features[0];
            const countyID = county && county.properties.GEOID;
            const countyName = county && county.properties.NAME;
            const countyState = county && county.properties.STATEFP;

            if (county) {
                setCountyHoverInfo({
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    ID: countyID,
                    COUNTY: countyName,
                    STATE: countyState
                });
            } else {
                setCountyHoverInfo(null);
            }
        },
        []
    );

    // Handle state click for selecting/deselecting
    const onCountyClick = useCallback(
        (event) => {
            const county = event.features && event.features[0];
            const id = county && county.properties.GEOID;
            const name = county && county.properties.NAME;
            const state = county && county.properties.STATEFP;

            if (id) {
                setSelectedCounties((prevSelected) => {
                    const alreadySelected = prevSelected.find(c => c.id === id);

                    if (alreadySelected) {
                        return prevSelected.filter((c) => c.id !== id);
                    } else {
                        return [...prevSelected, { id, name, state }];
                    }
                });
            };
        },
        []
    );

    // Filters for hover effect
    const hoverCountyID = (countyHoverInfo && countyHoverInfo.ID) || '';
    const hoverCountyName = (countyHoverInfo && countyHoverInfo.COUNTY) || '';
    const hoverCountyState = (countyHoverInfo && countyHoverInfo.STATEFP) || '';

    const countyFilter = useMemo(() => {
        if (hoverCountyID) {
            return ['in', 'GEOID', hoverCountyID]; // Filter based on NAME
        } else {
            return ['==', 'GEOID', '']; // Default filter for no county hover
        }
    }, [hoverCountyID]);

    // Filter for selected counties
    const selectedCountyFilter = useMemo(() => {
        const countyIds = selectedCounties.map(county => county.id);

        return ['in', 'GEOID', ...countyIds];
    }, [selectedCounties]);


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

    // Handle state click for selecting/deselecting
    const onZipClick = useCallback(
        (event) => {
            const zip = event.features && event.features[0];
            const zipNumber = zip && zip.properties.ZCTA5CE20;

            if (zipNumber) {
                setSelectedZip((prevSelected) => {
                    // Toggle the state in the selected array
                    if (prevSelected.includes(zipNumber)) {
                        return prevSelected.filter((s) => s !== zipNumber);
                    } else {
                        return [...prevSelected, zipNumber];
                    }
                });
            }
        },
        []
    );

    // Filters for hover effect
    const hoverZip = (zipHoverInfo && zipHoverInfo.ZIP) || '';

    // Filter for highlighted zip (on hover)
    const zipFilter = useMemo(() => {
        if (hoverZip) {
            return ['in', 'ZCTA5CE20', hoverZip]; // Filter based on ZCTA5CE20 (ZIP code)
        } else {
            return ['==', 'ZCTA5CE20', '']; // Default filter for no ZIP hover
        }
    }, [hoverZip]);

    // Filter for selected states
    const selectedZipFilter = useMemo(() => {
        return ['in', 'ZCTA5CE20', ...selectedZip];
    }, [selectedZip]);


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

    // Decide hover behavior based on selectAreaType
    const onClickArea = useCallback(
        (event) => {
            if (selectAreaType === "state") {
                onStateClick(event);
            } else if (selectAreaType === "county") {
                onCountyClick(event);
            } else if (selectAreaType === "zip") {
                onZipHover(event);
            };
        },
        [selectAreaType, onStateHover, onCountyHover, onZipHover]
    );

    return (
        <div className="flex w-full h-full">
            <Map
                initialViewState={initialViewState}
                minZoom={2}
                mapStyle={mapStyle}
                mapboxAccessToken={mapboxToken}
                interactiveLayerIds={["state-fill", "county-fill", "zip-fill"]}
                onMouseMove={onHover}
                onClick={onClickArea}
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

                        <Layer
                            beforeId="waterway-label"
                            {...stateSelectedLayer}
                            filter={selectedStateFilter}
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

                        <Layer
                            beforeId="waterway-label"
                            {...countySelectedLayer}
                            filter={selectedCountyFilter}
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

                        <Layer
                            id="zip-highlight"
                            beforeId="waterway-label"
                            {...zipSelectedLayer}
                            filter={selectedZipFilter}
                        />
                    </Source>
                )}

                {/* Native Mapbox controls. */}
                <FullscreenControl />
                <GeolocateControl />
                <NavigationControl />
                <ScaleControl position="bottom-right" />

                {/* Custom controls - shows current zoom level */}
                <div className="absolute top-6 left-0 right-0">
                    <ZoomLevelDisplay mapRef={mapRef} />
                </div>

                {/* Custom controls - choose which area type to select state, county, or zip */}
                <div className="absolute top-6 left-6">
                    <SelectionAreaType
                        selectAreaType={selectAreaType}
                        setSelectAreaType={setSelectAreaType}
                    />
                </div>

                {/* Popup for hovered state */}
                <StateHoverPopup
                    hoverState={hoverState}
                    stateHoverInfo={stateHoverInfo}
                />

                {/* Draggable window for selected states */}
                <SelectedStatesPopup
                    selectAreaType={selectAreaType}
                    selectedStates={selectedStates}
                />

                {hoverCountyID && (
                    <Popup
                        offset={25}
                        anchor="bottom"
                        latitude={countyHoverInfo.latitude}
                        longitude={countyHoverInfo.longitude}
                        closeButton={false}
                        closeOnClick={false}
                    >
                        <div className="flex bg-blue-400 text-black justify-center p-2">
                            <p className="font-bold">County:</p>
                            <p className="ml-2">{hoverCountyName}</p>
                        </div>
                    </Popup>
                )}

                {selectAreaType === "county" && (
                    <DraggablePopup>
                        <div
                            className="absolute bg-white text-black w-48 rounded p-2 cursor-move"
                            style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
                        >
                            <h4 className="text-center font-bold mb-2">
                                Selected Counties
                            </h4>

                            <div className="h-48 text-sm overflow-auto">
                                {selectedCounties.length > 0 ? (
                                    selectedCounties
                                        .slice()
                                        .sort((a, b) => a.name.localeCompare(b.name)) // Optional: sort by county name
                                        .map((county, index) => (
                                            <p key={index}>
                                                {county.name}, {getStateUSPS(county.state)}
                                            </p>
                                        ))
                                ) : (
                                    <p className="text-center text-mw_red">
                                        No counties selected
                                    </p>
                                )}
                            </div>
                        </div>
                    </DraggablePopup>
                )}

                {hoverZip && (
                    <Popup
                        offset={25}
                        anchor="bottom"
                        latitude={zipHoverInfo.latitude}
                        longitude={zipHoverInfo.longitude}
                        closeButton={false}
                        closeOnClick={false}
                    >
                        <h3
                            className={styles.popupTitle}
                            style={{ backgroundColor: "#0000FF" }}
                        >
                            Zip Code:
                        </h3>

                        <div className="flex flex-col bg-slate-200 text-black rounded-b-lg px-2 py-1">
                            <p className="text-center font-bold">
                                {hoverZip}
                            </p>
                        </div>
                    </Popup>
                )}

                {selectAreaType === "zip" && (
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
                                    selectedZip
                                        .slice()
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
                )}
            </Map>
        </div>
    );
};

"use client";

import { useCallback, useRef, useState } from "react";
import Map, { Layer, Source } from "react-map-gl";
import { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import SelectionAreaType from "./components/selection-area-type";
import "mapbox-gl/dist/mapbox-gl.css";

import { useStateHandlers } from "./state/selection-handlers-state";
import { StateHoverPopup, SelectedStatesPopup } from "./state/selection-handlers-state";
import { stateFillLayer, stateHighlightLayer, stateSelectedLayer } from "./state/map-styles-state";

import { useCountyHandlers } from "./county/selection-handlers-county";
import { CountyHoverPopup, SelectedCountyPopup } from "./county/selection-handlers-county";
import { countyFillLayer, countyHighlightLayer, countySelectedLayer } from "./county/map-styles-county";

import { useZipCodeHandlers } from "./zip-code/selection-handlers-zip-code";
import { ZipHoverPopup, SelectedZipCodesPopup } from "./zip-code/selection-handlers-zip-code";
import { zipFillLayer, zipHighlightLayer, zipSelectedLayer } from "./zip-code/map-styles-zip-code";


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
    const [selectedCounties, setSelectedCounties] = useState([]);

    const [zipHoverInfo, setZipHoverInfo] = useState(null);
    const [selectedZipCodes, setSelectedZipCodes] = useState([]);

    // Filter and functions for state hover effect
    const hoverState = (stateHoverInfo && stateHoverInfo.STATE) || '';

    const { onStateHover, onStateClick, stateFilter, selectedStateFilter } =
        useStateHandlers({ setStateHoverInfo, setSelectedStates, selectedStates, hoverState });


    // Filters and functions for county hover effect
    const hoverCounty = (countyHoverInfo && countyHoverInfo.ID) || '';
    const hoverCountyName = (countyHoverInfo && countyHoverInfo.COUNTY) || '';

    const { onCountyHover, onCountyClick, countyFilter, selectedCountyFilter } =
        useCountyHandlers({ setCountyHoverInfo, setSelectedCounties, selectedCounties, hoverCounty, hoverCountyName });


    // Filter and functions for zip code hover effect
    const hoverZip = (zipHoverInfo && zipHoverInfo.ZIP) || '';

    const { onZipHover, onZipClick, zipFilter, selectedZipFilter } =
        useZipCodeHandlers({ setZipHoverInfo, setSelectedZipCodes, selectedZipCodes, hoverZip });


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
                onZipClick(event);
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
                            id="zip-selected"
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

                {/* Custom control - choose which area type to select state, county, or zip */}
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

                {/* Popup for hovered county */}
                <CountyHoverPopup
                    hoverCounty={hoverCounty}
                    countyHoverInfo={countyHoverInfo}
                />

                {/* Draggable window for selected counties */}
                <SelectedCountyPopup
                    selectAreaType={selectAreaType}
                    selectedCounties={selectedCounties}
                />

                {/* Popup for hovered zip code */}
                <ZipHoverPopup
                    hoverZip={hoverZip}
                    zipHoverInfo={zipHoverInfo}
                />

                {/* Draggable window for selected zip codes */}
                <SelectedZipCodesPopup
                    selectAreaType={selectAreaType}
                    selectedZipCodes={selectedZipCodes}
                />
            </Map>
        </div>
    );
};

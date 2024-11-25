"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Map, { Layer, Popup, Source } from "react-map-gl";
import { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import { stateFillLayer, stateHighlightLayer, stateSelectedLayer } from "./map-styles-state";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import SelectionAreaType from "./selection-area-type";
import DraggablePopup from "./draggable-popup";
import "mapbox-gl/dist/mapbox-gl.css";

import { useStateHandlers } from "./state-selection-handlers";
import { StateHoverPopup, SelectedStatesPopup } from "./state-selection-handlers";


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

    // Filters for hover effect
    const hoverState = (stateHoverInfo && stateHoverInfo.STATE) || '';

    const { onStateHover, onStateClick, stateFilter, selectedStateFilter } =
        useStateHandlers({ setStateHoverInfo, setSelectedStates, selectedStates, hoverState });


    // Decide hover behavior based on selectAreaType
    const onHover = useCallback(
        (event) => {
            if (selectAreaType === "state") {
                onStateHover(event);
            } else if (selectAreaType === "county") {
                // onCountyHover(event);
            } else if (selectAreaType === "zip") {
                // onZipHover(event);
            };
        },
        [selectAreaType, onStateHover]
    );

    // Decide hover behavior based on selectAreaType
    const onClickArea = useCallback(
        (event) => {
            if (selectAreaType === "state") {
                onStateClick(event);
            } else if (selectAreaType === "county") {
                // onCountyHover(event);
            } else if (selectAreaType === "zip") {
                // onZipHover(event);
            };
        },
        [selectAreaType, onStateHover]
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



            </Map>
        </div>
    );
};

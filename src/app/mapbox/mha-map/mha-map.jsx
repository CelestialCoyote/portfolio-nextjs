"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import Map, { Layer, Popup, Source, GeolocateControl, NavigationControl, ScaleControl } from "react-map-gl";
import AreaDetails from "./area-details";
import BaseDetails from "./base-details";
import BAH from "./bah";
import ZoomLevelDisplay from "@/components/maps/zoom-level-display";
import BaseMarkersDropdown from "@/components/military-base-markers/base-markers-dropdown";
import { zipLayer, zipHighlightLayer, createZipLayer, createMhaZipLayer, basesFill } from "./map-style";
import zipData from "./zcta-data.json";
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

// export default function MHAMap({ mhaData }) {
export default function MHAMap() {
    const mapRef = useRef();
    const [zipHoverInfo, setZipHoverInfo] = useState(null);
    const [selectedZip, setSelectedZip] = useState(null);
    const [additionalData, setAdditionalData] = useState(null);
    const [bah, setBah] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);


    // Pull data for zip code from additional json file.
    const getDataByZipCode = (zipCode) => {
        const data = zipData.find(item => item.ZCTA5CE20 === zipCode);

        return data || null;
    };

    // const getBAHByZipCode = (zipCode) => {
    //     // Find the relevant MHA data in bahData
    //     const mhaData = bahData.find(item => item.zip_codes.includes(zipCode));
    //     const bahRates = mhaData ? mhaData.bah : null;

    //     // const mhaArea = mhaData.find(item => item.zip_codes.includes(zipCode));
    //     // const bahRates = mhaArea ? mhaArea.bah : null;

    //     setBah(bahRates);
    // };

    // Check if a zip code from MattsData matches the GEOID20 properties
    const isMatchingZip = (zipCode) => {
        return zipData.some(data => data.ZCTA5CE20 === zipCode);
    };

    // Filter zipData based on selectedArea's zip codes
    const filteredZipData = useMemo(() => {
        if (selectedArea && selectedArea.properties["zip_codes"]) {
            const zipCodes = selectedArea.properties["zip_codes"];

            return zipData.filter(item => zipCodes.includes(item.ZCTA5CE20));
        }
        return [];
    }, [selectedArea]);

    const onZipHover = useCallback(event => {
        const zip = event.features && event.features[0];
        const zipNumber = zip && zip.properties.ZCTA5CE20;

        // Fetch additional data based on the zip code
        const data = getDataByZipCode(zipNumber);

        if (zip && isMatchingZip(zip.properties.GEOID20)) {
            setZipHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                GEOID: zip && zip.properties.GEOID20,
                data: data
            });
        } else if (zip && !isMatchingZip(zip.properties.GEOID20)) {
            setZipHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                GEOID: zip && zip.properties.GEOID20,
                data: null
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
        // console.log(layerIds); // Log available layer IDs

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
            const data = getDataByZipCode(zipNumber);

            setSelectedZip(zipNumber);
            getBAHByZipCode(zipNumber);

            if (data) {
                setAdditionalData(data);
            } else {
                setAdditionalData({
                    ZCTA5CE20: zipNumber,
                    installation: ["No Data"],
                    active_listing_count: null,
                    median_listing_price: null,
                    median_household_income: null,
                    area_median_home_value: null,
                    area_wealth_percentile: null
                });
            };
        } else {
            setSelectedZip(null);
            setAdditionalData(null);
        };
    }, [mhaData]);

    return (
        <div className="flex flex-row w-full h-full max-h-full gap-x-4">
            <div className="flex flex-col bg-slate-200 text-black w-[40%] h-full rounded-lg gap-y-2 px-2 py-1">
                <h2 className="text-center mb-4">Area Details</h2>

                <div className="flex flex-col w-full h-full gap-y-2 overflow-y-hidden">
                    <div className="w-full h-[15%]">
                        {selectedArea && <BaseDetails data={selectedArea.properties} />}
                    </div>

                    <div className="w-full h-[40%] max-h-[40%]">
                        {additionalData && <AreaDetails data={additionalData} />}
                    </div>

                    <div className="w-full h-[40%] max-h-[40%] pr-2">
                        {selectedZip && <BAH data={bah} />}
                    </div>
                </div>
            </div>

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

                        {zipHoverInfo.data != null &&
                            <p className="text-red-500 p-1">
                                Click for more info.
                            </p>
                        }
                    </Popup>
                )}


                {/* Native Mapbox controls. */}
                <GeolocateControl position={"bottom-right"} />
                <NavigationControl position={"bottom-right"} />
                <ScaleControl />

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
            </Map>
        </div>
    );
};

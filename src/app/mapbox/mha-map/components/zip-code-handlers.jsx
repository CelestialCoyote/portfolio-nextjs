import { useCallback, useMemo } from "react";
import { Popup } from "react-map-gl";
import mhaData from "./mha-data-2024.json";


export const useZipCodeHandlers = ({
    setZipHoverInfo,
    setSelectedZipCodes,
    selectedZipCodes,
    hoverZip,
    mapRef, // Accept mapRef here
    setBah, // Accept setBah
    setSelectedZip, // Accept setSelectedZip
    selectedArea
}) => {
    // Handle hover effect for ZIP codes
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
    }, [setZipHoverInfo]);

    // Handle click for selecting a ZIP code
    const onZipClick = useCallback(event => {
        const layerIds = mapRef.current.getStyle().layers.map(layer => layer.id);

        // Ensure 'zip' is in the list
        if (!layerIds.includes('zip')) {
            console.error("Layer 'zip' does not exist.");
        }

        const features = mapRef.current.queryRenderedFeatures(event.point, {
            layers: ['zip']
        });

        const getBAHByZipCode = (zipCode) => {
            const mhaArea = mhaData.find(item => item.zip_codes.includes(zipCode));
            const bahRates = mhaArea ? mhaArea.bah : null;

            setBah(bahRates);
        };

        if (features.length > 0) {
            const zipNumber = features[0].properties.GEOID20; // Extract ZIP code from GEOID20 property

            setSelectedZip(zipNumber);
            getBAHByZipCode(zipNumber);
        } else {
            setSelectedZip(null);
        }
    }, [mapRef, setBah, setSelectedZip]);

    // Filter for highlighted zip (on hover)
    const zipFilter = useMemo(() => {
        if (hoverZip) {
            return ['in', 'GEOID20', hoverZip];
        } else {
            return ['==', 'GEOID20', '']; // Provide a default filter value when selectedZip is null
        }
    }, [hoverZip]);

    // Filter for selected ZIP codes
    const selectedZipFilter = useMemo(() => {
        return ['in', 'ZCTA5CE20', ...selectedZipCodes];
    }, [selectedZipCodes]);

    // Filter zipData based on selectedArea's zip codes
    const filteredZipData = useMemo(() => {
        if (selectedArea && selectedArea.properties["zip_codes"]) {
            return selectedArea.properties["zip_codes"];
        }

        return [];
    }, [selectedArea]);

    return { onZipHover, onZipClick, zipFilter, selectedZipFilter, filteredZipData };
};

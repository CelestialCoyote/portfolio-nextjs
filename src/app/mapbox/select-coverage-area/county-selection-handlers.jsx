import { useCallback, useMemo } from "react";
import { Popup } from "react-map-gl";
import DraggablePopup from "./draggable-popup";


// Handle hover effect for counties
export const useCountyHandlers = ({
    setCountyHoverInfo,
    setSelectedCounty,
    selectedCounty,
    hoverCounty
}) => {
    const onCountyHover = useCallback((event) => {
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
    }, [setCountyHoverInfo]);

    // Handle state click for selecting/deselecting
    const onCountyClick = useCallback(
        (event) => {
            const county = event.features && event.features[0];
            const id = county && county.properties.GEOID;
            const name = county && county.properties.NAME;
            const state = county && county.properties.STATEFP;

            if (id) {
                setSelectedCounty((prevSelected) => {
                    const alreadySelected = prevSelected.find(c => c.id === id);

                    if (alreadySelected) {
                        return prevSelected.filter((c) => c.id !== id);
                    } else {
                        return [...prevSelected, { id, name, state }];
                    }
                });
            }
        }, [setSelectedCounty]);

    const countyFilter = useMemo(() => {
        if (hoverCounty) {
            return ['in', 'GEOID', hoverCounty]; // Filter based on NAME
        } else {
            return ['==', 'GEOID', '']; // Default filter for no county hover
        }
    }, [hoverCounty]);

    // Filter for selected counties
    const selectedCountyFilter = useMemo(() => {
        const countyIds = selectedCounty.map(county => county.id);

        return ['in', 'GEOID', ...countyIds];
    }, [selectedCounty]);

    return { onCountyHover, onCountyClick, countyFilter, selectedCountyFilter };
};



// County hover popup and draggable window.
export const CountyHoverPopup = ({ hoverCounty, countyHoverInfo }) => (
    hoverCounty && (
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
                <p className="ml-2">{hoverCounty}</p>
            </div>
        </Popup>
    )
);


export const SelectedCountyPopup = ({ selectAreaType, selectedCounty }) => (
    selectAreaType == "county" && (
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
    )
);
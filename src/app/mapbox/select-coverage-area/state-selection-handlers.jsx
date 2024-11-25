import { useCallback, useMemo } from "react";
import { Popup } from "react-map-gl";
import DraggablePopup from "./draggable-popup";


export const useStateHandlers = ({
    setStateHoverInfo,
    setSelectedStates,
    selectedStates,
    hoverState
}) => {
    // Handle hover effect for states
    const onStateHover = useCallback((event) => {
        const state = event.features && event.features[0];
        const stateName = state && state.properties.NAME;

        if (state) {
            setStateHoverInfo({
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
                STATE: stateName,
            });
        } else {
            setStateHoverInfo(null);
        }
    }, [setStateHoverInfo]);

    // Handle state click for selecting/deselecting
    const onStateClick = useCallback((event) => {
        const state = event.features && event.features[0];
        const name = state && state.properties.NAME;

        if (name) {
            setSelectedStates((prevSelected) => {
                if (prevSelected.includes(name)) {
                    return prevSelected.filter((s) => s !== name);
                } else {
                    return [...prevSelected, name];
                }
            });
        }
    }, [setSelectedStates]);

    // Filter state for hover effect
    const stateFilter = useMemo(() => {
        if (hoverState) {
            return ["in", "NAME", hoverState];
        } else {
            return ["==", "NAME", ""];
        }
    }, [hoverState]);

    // Filter for selected states
    const selectedStateFilter = useMemo(() => {
        return ["in", "NAME", ...selectedStates];
    }, [selectedStates]);

    return { onStateHover, onStateClick, stateFilter, selectedStateFilter };
};



// State hover popup and draggable window.
export const StateHoverPopup = ({ hoverState, stateHoverInfo }) => (
    hoverState && (
        <Popup
            offset={25}
            anchor="bottom"
            latitude={stateHoverInfo.latitude}
            longitude={stateHoverInfo.longitude}
            closeButton={false}
            closeOnClick={false}
        >
            <div className="flex bg-blue-400 text-black justify-center p-2">
                <p className="font-bold">State:</p>
                <p className="ml-2">{hoverState}</p>
            </div>
        </Popup>
    )
);

export const SelectedStatesPopup = ({ selectAreaType, selectedStates }) => (
    selectAreaType === "state" && (
        <DraggablePopup>
            <div
                className="absolute bg-white text-black w-48 rounded p-2 cursor-move"
                style={{ boxShadow: `20px 20px 15px rgb(0 0 0 / 0.5)` }}
            >
                <h4 className="text-center font-bold mb-2">Selected States</h4>
                <div className="h-48 text-sm overflow-auto">
                    {selectedStates.length > 0 ? (
                        selectedStates
                            .slice() // create a copy to avoid mutating original state
                            .sort()
                            .map((state, index) => <p key={index}>{state}</p>)
                    ) : (
                        <p className="text-center text-mw_red">No states selected</p>
                    )}
                </div>
            </div>
        </DraggablePopup>
    )
);

import { useCallback, useMemo } from "react";

export const useStateHandlers = ({
    setStateHoverInfo,
    setSelectedStates,
    selectedStates,
    hoverState // Accept hoverState as a parameter
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

    // Use hoverState directly for hover effect
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







// import { useCallback, useMemo } from "react";


// export const useStateHandlers = ({
//     setStateHoverInfo,
//     setSelectedStates,
//     stateHoverInfo,
//     selectedStates
// }) => {
//     // Handle hover effect for states
//     const onStateHover = useCallback((event) => {
//         const state = event.features && event.features[0];
//         const stateName = state && state.properties.NAME;

//         if (state) {
//             setStateHoverInfo({
//                 longitude: event.lngLat.lng,
//                 latitude: event.lngLat.lat,
//                 STATE: stateName,
//             });
//         } else {
//             setStateHoverInfo(null);
//         }
//     }, [setStateHoverInfo]);

//     // Handle state click for selecting/deselecting
//     const onStateClick = useCallback((event) => {
//         const state = event.features && event.features[0];
//         const name = state && state.properties.NAME;

//         if (name) {
//             setSelectedStates((prevSelected) => {
//                 if (prevSelected.includes(name)) {
//                     return prevSelected.filter((s) => s !== name);
//                 } else {
//                     return [...prevSelected, name];
//                 }
//             });
//         }
//     }, [setSelectedStates]);

//     // Filters for hover effect
//     const hoverState = (stateHoverInfo && stateHoverInfo.STATE) || "";
//     const stateFilter = useMemo(() => {
//         if (hoverState) {
//             return ["in", "NAME", hoverState];
//         } else {
//             return ["==", "NAME", ""];
//         }
//     }, [hoverState]);

//     // Filter for selected states
//     const selectedStateFilter = useMemo(() => {
//         return ["in", "NAME", ...selectedStates];
//     }, [selectedStates]);

//     return { onStateHover, onStateClick, stateFilter, selectedStateFilter };
// };

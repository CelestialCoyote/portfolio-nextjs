import { useState, useEffect } from "react";
import { Popup } from "react-map-gl";
import BaseMarker from "./base-marker";
import styles from "./map-popup.module.css";
import markers from "./us-military-base-markers.json";


const branchImages = {
    "air-force": "/images/us-military-branch-seals/air-force.png",
    "army": "/images/us-military-branch-seals/army.png",
    "coast-guard": "/images/us-military-branch-seals/coast-guard.png",
    "dod": "/images/us-military-branch-seals/department-of-defense.png",
    "marine-corps": "/images/us-military-branch-seals/marine-corps.png",
    "navy": "/images/us-military-branch-seals/navy.png",
    "space-force": "/images/us-military-branch-seals/space-force.png",
};

//USAF  #00308F 
//USA   #4B5320
//USCG  #223C70
//USMC  #A6192E
//NAVY  #000080
//USSF  #009EE0
const branchData = [
    { id: "air-force", branch: "Air Force", color: "#00308F" },
    { id: "army", branch: "Army", color: "#4B5320" },
    { id: "coast-guard", branch: "Coast Guard", color: "#223C70" },
    { id: "marine-corps", branch: "Marine Corps", color: "#A6192E" },
    { id: "navy", branch: "Navy", color: "#000080" },
    { id: "space-force", branch: "Space Force", color: "#009EE0" },
];


export default function BaseMarkersCombo({ mapRef, baseMarkerVisibility }) {
    const [selectedBase, setSelectedBase] = useState(null);
    const [selectedArea, setSelectedArea] = useState(null);
    const [hoveredBase, setHoveredBase] = useState(null);
    const [branchMarkers, setBranchMarkers] = useState({
        "air-force": [],
        "army": [],
        "coast-guard": [],
        "dod": [],
        "marine-corps": [],
        "navy": [],
        "space-force": [],
    });


    useEffect(() => {
        const groupedMarkers = markers.features.reduce((acc, marker) => {
            const branch = marker.properties.branch;

            if (acc[branch]) {
                acc[branch].push(marker);
            } else {
                acc[branch] = [marker];
            };

            return acc;
        }, {
            "air-force": [],
            "army": [],
            "coast-guard": [],
            "dod": [],
            "marine-corps": [],
            "navy": [],
            "space-force": [],
        });

        setBranchMarkers(groupedMarkers);
    }, []);


    return (
        <>
            {Object.entries(baseMarkerVisibility).map(([branchKey, isVisible]) => {
                if (!isVisible) return null;

                const branchMarkerArray = branchMarkers[branchKey] || [];

                return (
                    <BaseMarker
                        key={branchKey}
                        mapRef={mapRef}
                        data={{ features: branchMarkerArray }}
                        imagePath={branchImages[branchKey]}
                        setSelectedBase={setSelectedBase}
                        setHoveredBase={setHoveredBase}
                        setSelectedArea={setSelectedArea}
                    />
                );
            })}

            {hoveredBase && (
                <Popup
                    offset={25}
                    anchor="bottom"
                    latitude={hoveredBase.geometry.coordinates[1]}
                    longitude={hoveredBase.geometry.coordinates[0]}
                    onClose={() => setSelectedBase(null)}
                    closeButton={false}
                >
                    <h3
                        className={styles.popupTitle}
                        style={{
                            backgroundColor: branchData.find(branch =>
                                branch.id === hoveredBase.properties.branch)?.color || "#0000FF"
                        }}
                    >
                        Selected Base
                    </h3>

                    <div className="flex flex-col bg-slate-200 text-black px-2 py-1">
                        <div className="flex">
                            <p className="font-bold mr-2">
                                Name:
                            </p>

                            {hoveredBase.properties.installation}
                        </div>

                        <div className="flex">
                            <p className="font-bold mr-2">
                                Branch:
                            </p>

                            {
                                branchData.find(branch =>
                                    branch.id === hoveredBase.properties.branch)?.branch || "Unknown"
                            }
                        </div>
                    </div>
                </Popup>
            )}
        </>
    );
};

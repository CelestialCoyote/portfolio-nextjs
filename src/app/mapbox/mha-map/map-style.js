// Zip code polygons.
export const zipLayer = {
    id: "zip",
    type: "fill",
    "source-layer": "zcta",
    minzoom: 5,
    maxzoom: 18,
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 0.5)",
        "fill-color": "transparent"
    }
};

// Highlighted zip code polygons.
export const zipHighlightLayer = {
    id: 'zip-highlighted',
    type: 'fill',
    "source-layer": "zcta",
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        'fill-color': '#459f9f',
        'fill-opacity': 0.9
    }
};


export const createZipLayer = (zipData) => {
    const zipCodes = zipData.map(item => item.ZCTA5CE20);

    // console.log("zipData: ", zipData);

    return {
        id: 'mattZip',
        type: 'fill',
        // "source-layer": "zipCode",
        "source-layer": "zcta",
        minzoom: 5,
        maxzoom: 18,
        paint: {
            "fill-outline-color": "rgba(0, 0, 0, 1.0)",
            'fill-color': 'green',
            'fill-opacity': 0.5
        },
        filter: ['in', 'GEOID20', ...zipCodes]
    };
};


export const createMhaZipLayer = (mhaZipCodes) => ({
    id: 'mha-zip',
    type: 'fill',
    // "source-layer": "zipCode",
    "source-layer": "zcta",
    minzoom: 5,
    maxzoom: 18,
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        'fill-color': 'blue',
        'fill-opacity': 0.5
    },
    filter: ['in', 'GEOID20', ...mhaZipCodes]
});


export const basesFill = {
    id: "bases-fill",
    type: "fill",
    "source-layer": "us-military-bases-73wtm7",
    minzoom: 2,
    maxzoom: 16,
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        "fill-color": "rgba(0, 255, 255, 0.5)"
    }
};


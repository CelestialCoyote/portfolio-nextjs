export const stateFillLayer = {
    id: "state-fill",
    type: "fill",
    "source-layer": "state",
    paint: {
        'fill-outline-color': 'rgba(255, 0, 0, 1.0)',
        'fill-color': 'rgba(255, 0, 0, 0.1)'
    }
};

export const stateHighlightLayer = {
    id: 'state-highlighted',
    type: 'fill',
    "source-layer": "state",
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        'fill-color': '#459f9f',
        'fill-opacity': 0.9
    }
};



export const countyFillLayer = {
    id: "county-fill",
    type: "fill",
    "source-layer": "county",
    paint: {
        'fill-outline-color': 'rgba(0, 255, 0, 1.0)',
        'fill-color': 'rgba(0, 255, 0, 0.05)'
    }
};

export const countyHighlightLayer = {
    id: 'county-highlighted',
    type: 'fill',
    "source-layer": "county",
    paint: {
        "fill-outline-color": "rgba(0, 0, 0, 1.0)",
        'fill-color': '#459f9f',
        'fill-opacity': 0.9
    }
};



export const zipFillLayer = {
    id: "zip-fill",
    type: "fill",
    "source-layer": "zcta",
    paint: {
        'fill-outline-color': 'rgba(0, 0, 255, 1.0)',
        'fill-color': 'rgba(0, 0, 255, 0.1)'
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



// Outline only layers.
export const stateLayer = {
    id: "state",
    type: "line",
    "source-layer": "state",
    paint: {
        "line-color": "rgba(255, 0, 0, 1.0)",
        "line-width": 1
    }
};

export const countyLayer = {
    id: "county",
    type: "line",
    "source-layer": "county",
    paint: {
        "line-color": "rgba(0, 255, 0, 1.0)",
        "line-width": 1
    }
};

export const zipLayer = {
    id: "zip",
    type: "line",
    "source-layer": "zcta",
    paint: {
        "line-color": "rgba(0, 0, 255, 1.0)",
        "line-width": 1
    }
};
// Base county fill color
export const countyFillLayer = {
    id: "county-fill",
    type: "fill",
    "source-layer": "county",
    paint: {
        'fill-outline-color': 'rgba(0, 255, 0, 1.0)',
        'fill-color': 'rgba(0, 255, 0, 0.05)'
    }
};

// Hovered county fill color
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

// Selected county fill color



// Outline county only layer
export const countyLayer = {
    id: "county",
    type: "line",
    "source-layer": "county",
    paint: {
        "line-color": "rgba(0, 255, 0, 1.0)",
        "line-width": 1
    }
};

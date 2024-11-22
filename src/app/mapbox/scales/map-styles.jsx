export const stateLayer = (stateZoom) => ({
    id: "state",
    type: "line",
    "source-layer": "state",
    minzoom: stateZoom[0],
    maxzoom: stateZoom[1],
    paint: {
        "line-color": "rgba(255, 0, 0, 1.0)",
        "line-width": 1
    }
});

export const stateFillLayer = (stateZoom) => ({
    id: "state-fill",
    type: "fill",
    "source-layer": "state",
    minzoom: stateZoom[0],
    maxzoom: stateZoom[1],
    paint: {
        'fill-outline-color': 'rgba(0, 0, 0, 1.0)',
        'fill-color': 'rgba(255, 0, 0, 0.2)'
    }
});

export const countyLayer = (countyZoom) => ({
    id: "county",
    type: "line",
    "source-layer": "county",
    minzoom: countyZoom[0],
    maxzoom: countyZoom[1],
    paint: {
        "line-color": "rgba(0, 0, 0, 1.0)",
        "line-width": 1
    }
});

export const countyFillLayer = (countyZoom) => ({
    id: "county-fill",
    type: "fill",
    "source-layer": "county",
    minzoom: countyZoom[0],
    maxzoom: countyZoom[1],
    paint: {
        'fill-outline-color': 'rgba(64, 64, 64, 1.0)',
        'fill-color': 'rgba(255, 255, 0, 0.2)'
    }
});

export const zipLayer = (zipZoom) => ({
    id: "zip",
    type: "line",
    "source-layer": "zcta",
    minzoom: zipZoom[0],
    maxzoom: zipZoom[1],
    paint: {
        "line-color": "rgba(0, 0, 0, 1.0)",
        "line-width": 1
    }
});

export const zipFillLayer = (zipZoom) => ({
    id: "zip-fill",
    type: "fill",
    "source-layer": "zcta",
    minzoom: zipZoom[0],
    maxzoom: zipZoom[1],
    paint: {
        'fill-outline-color': 'rgba(0, 0, 0, 1.0)',
        'fill-color': 'rgba(0, 0, 255, 0.2)'
    }
});

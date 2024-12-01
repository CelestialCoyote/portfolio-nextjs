import { Source, Layer } from "react-map-gl";
import { zipLayer, zipHighlightLayer, createZipLayer } from "./map-styles-zip-code";


export default function ZipCodeLayers({ zipFilter, filteredZipData, selectedArea }) {
    return (
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
    );
}

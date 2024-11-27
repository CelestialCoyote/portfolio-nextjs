import { Source, Layer } from "react-map-gl";
import { stateFillLayer, stateHighlightLayer, stateSelectedLayer } from "./map-styles-state";


export default function StateLayers({ stateFilter, selectedStateFilter }) {
    return (
        <Source
            type="vector"
            url="mapbox://celestialcoyote.98li4t0s"
        >
            <Layer
                beforeId="waterway-label"
                {...stateFillLayer}
            />

            <Layer
                beforeId="waterway-label"
                {...stateHighlightLayer}
                filter={stateFilter}
            />

            <Layer
                beforeId="waterway-label"
                {...stateSelectedLayer}
                filter={selectedStateFilter}
            />
        </Source>
    );
}

import Slider from '@mui/material/Slider';


export default function Details({ 
    state, setState, stateZoom, setStateZoom,
    county, setCounty, countyZoom, setCountyZoom,
    zip, setZip, zipZoom, setZipZoom,
    privateSchools, setPrivateSchools, privateSchoolZoom, setPrivateSchoolZoom,
    publicSchools, setPublicSchools, publicSchoolZoom, setPublicSchoolZoom
}) {

    const handleStateEnable = () => {
        setState(!state)
    };

    const handleCountyEnable = () => {
        setCounty(!county)
    };

    const handleZipEnable = () => {
        setZip(!zip)
    };

    const handleStateZoom = (event, newZoom) => {
        setStateZoom(newZoom);
    };

    const handleCountyZoom = (event, newZoom) => {
        setCountyZoom(newZoom);
    };

    const handleZipZoom = (event, newZoom) => {
        setZipZoom(newZoom);
    };


    const checkboxStyle = "border-transparent focus:border-transparent focus:ring-0"

    return (
        <div className="flex flex-col w-full gap-y-12">
            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input type="checkbox" className={checkboxStyle} checked={state} onChange={handleStateEnable} />
                    <h3 className="text-lg">Set state fill visiblity</h3>

                    <h3 className="text-lg">Min: {stateZoom[0]}</h3>
                    <h3 className="text-lg">Max: {stateZoom[1]}</h3>
                </div>

                <Slider
                    getAriaLabel={() => 'zoom range'}
                    value={stateZoom}
                    onChange={handleStateZoom}
                    valueLabelDisplay="auto"
                    min={2}
                    max={22}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input type="checkbox" className={checkboxStyle} checked={county} onChange={handleCountyEnable} />
                    <h3 className="text-lg">Set county fill visiblity</h3>

                    <h3 className="text-lg">Min: {countyZoom[0]}</h3>
                    <h3 className="text-lg">Max: {countyZoom[1]}</h3>
                </div>

                <Slider
                    getAriaLabel={() => 'zoom range'}
                    value={countyZoom}
                    onChange={handleCountyZoom}
                    valueLabelDisplay="auto"
                    min={2}
                    max={22}
                />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-x-3 mb-2">
                    <input type="checkbox" className={checkboxStyle} checked={zip} onChange={handleZipEnable} />
                    <h3 className="text-lg">Set zcta fill visiblity</h3>

                    <h3 className="text-lg">Min: {zipZoom[0]}</h3>
                    <h3 className="text-lg">Max: {zipZoom[1]}</h3>
                </div>

                <Slider
                    getAriaLabel={() => 'zoom range'}
                    value={zipZoom}
                    onChange={handleZipZoom}
                    valueLabelDisplay="auto"
                    min={2}
                    max={22}
                />
            </div>
        </div>
    );
};

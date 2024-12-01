import { useState, useEffect } from "react";
import Dropdown from "./dropdown";


export default function BAH({ data }) {
    const [payGrade, setPayGrade] = useState("");
    const [options, setOptions] = useState([]);

    // Extract keys from the data to create options
    useEffect(() => {
        const keys = data.map(item => Object.keys(item)[0]);
        
        setOptions(keys);
        setPayGrade(keys[4]); // Set the initial pay grade to the first key
    }, [data]);

    // Find the data for the selected pay grade
    const selectedData = data.find(item => item[payGrade]);

    const withDep = selectedData ? selectedData[payGrade][0] : "N/A";
    const withoutDep = selectedData ? selectedData[payGrade][1] : "N/A";

    return (
        <div className="flex flex-col w-full h-full">
            <h4 className="text-center font-bold">
                BAH Rates:
            </h4>

            <div className="flex justify-between text-sm font-bold mb-2">
                <p className="text-center w-1/3">
                    Pay Grade:
                </p>

                <p className="text-center w-1/3">
                    W/ Dependent:
                </p>
                
                <p className="text-center w-1/3">
                    WO/ Dependent:
                </p>
            </div>

            <div className="flex justify-between items-center">
                <div className="flex justify-center w-1/3">
                    <Dropdown
                        options={options}
                        selectedOption={payGrade}
                        setSelectedOption={setPayGrade}
                    />
                </div>

                <p className="text-center w-1/3">
                    ${withDep}
                </p>

                <p className="text-center w-1/3">
                    ${withoutDep}
                </p>
            </div>
        </div>
    );
};

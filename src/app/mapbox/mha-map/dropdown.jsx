import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";


export default function Dropdown({ options, selectedOption, setSelectedOption }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-sm w-24">
            <div
                className="flex bg-white items-center justify-between px-4 py-2 rounded-lg cursor-pointer"
                onClick={toggleDropdown}
            >
                <span>{selectedOption}</span>
                <FaChevronDown
                    className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>
            {isOpen && (
                <div className="absolute left-0 bg-white w-full mt-1 max-h-[65px] rounded-lg shadow-lg overflow-auto z-10">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

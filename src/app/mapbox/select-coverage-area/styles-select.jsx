const mapStyles = {
    streets: "streets-v12",
    satellite: "satellite-streets-v12",
    light: "light-v11",
    dark: "dark-v11",
    streets: "streets-v12",
    outdoors: "outdoors-v12"
};


export default function RadioGroup({ style, setStyle }) {
    function RadioButton({ checked, onChange, children }) {
        return (
            <label>
                <input
                    type="radio"
                    value={style}
                    checked={checked}
                    onChange={onChange}
                />
                {children}
            </label>
        );
    }

    return (
        <>
            {/* {mapStyles = Object.keys(style => (
                <RadioButton
                    key={style.key}
                    value={style.value}
                    checked={option === value}
                    onChange={() => setStyle(option)}
                >
                    {option}
                </RadioButton>
            ))} */}
        </>
    );
}
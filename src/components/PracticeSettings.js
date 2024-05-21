import React from 'react';

const PracticeSettings = ({label, options, selectedValue, onChange }) => {
    return (
        <div className="">
            <label>{label}</label>
            <select value={selectedValue} onChange={onChange}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default PracticeSettings;

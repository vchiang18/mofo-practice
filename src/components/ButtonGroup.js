import React , { useState } from 'react';

const ButtonGroup = ({ fieldName, options, onSelectionChange } ) => {
    const [ selectedValue, setSelectedValue ] = useState(null);

    const handleSelection = (value) => {
        setSelectedValue(value);
        onSelectionChange(fieldName, value);
    }

    return (
        <div className='mb-4'>
            <h2 className='text-lg font-semibold mb-2'>{fieldName}</h2>
            <div className='flex flex-wrap space-x-2'>
                {options.map((option, index) => (
                    <button key={index}
                        className={`py-2 px-4 rounded ${selectedValue === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-700`}
                        onClick={ () => handleSelection(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    )
};



export default ButtonGroup;

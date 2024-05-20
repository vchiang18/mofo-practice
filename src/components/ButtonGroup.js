import React, { useState } from 'react';

const ButtonGroup = ({ fieldName, displayName, options, onSelectionChange, value }) => {

  const handleSelection = (option) => {
    // setSelectedValue(option);
    onSelectionChange(fieldName, option);
  };

  return (
    <div className="mb-4 w-full md:w-1/5 ">
      <h2 className="text-lg text-center font-semibold mb-2">{displayName}</h2>
      <div className="flex flex-col space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded mx-2 ${value === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-700`}
            onClick={() => handleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;

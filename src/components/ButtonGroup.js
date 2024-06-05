import React from "react";

const ButtonGroup = ({
  fieldName,
  displayName,
  options,
  onSelectionChange,
  value,
}) => {
  const handleSelection = (option) => {
    // setSelectedValue(option);
    onSelectionChange(fieldName, option);
  };

  return (
    <div className="mb-2">
      <h2 className="text-lg text-center mb-2">{displayName}</h2>
      <div className="flex flex-col space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded mx-2 ${
              value === option
                ? "bg-red-400 text-white"
                : "bg-blue-700 text-white"
            } hover:bg-red-200`}
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

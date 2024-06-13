import React from "react";

const ButtonGroup = ({
  fieldName,
  displayName,
  options,
  onSelectionChange,
  value,
}) => {
  const handleSelection = (option) => {
    const newValue = value === option ? null : option;
    onSelectionChange(fieldName, newValue);
  };

  return (
    <div className="mb-2">
      <h2 className="text-lg text-center mb-2 pl-2">{displayName}</h2>
      <div className="flex flex-col mb-2 space-y-2 font-bold">
        {options.map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded mx-2  h-[73.72px] ${
              value === option
                ? "bg-gold-gradient"
                : "bg-blue-gradient text-white"
            } hover:bg-gold-gradient hover:text-black`}
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

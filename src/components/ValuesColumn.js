import React, { useState, useEffect } from "react";
import { useValues } from "../context/ValuesContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ValuesColumn = ({ column, columnKey, updateValues2, deleteValue2 }) => {
  const [newValue, setNewValue] = useState("");
  const { values, addValue } = useValues();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && newValue.trim() !== "") {
      addValue(columnKey, newValue);
      setNewValue("");
    }
  };

  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-gray-500 text-xs">{column}</h3>
      {values[columnKey]?.map((value, index) => (
        <div key={index} className="flex items-center mb-2 text-sm">
          <input
            type="text"
            value={value}
            onChange={(e) => updateValues2(columnKey, index, e.target.value)}
            className="border p-2 mr-2 w-32"
          />
          <button
            onClick={() => deleteValue2(columnKey, index)}
            className="text-red-500"
          >
            <XMarkIcon className="w-4 h-4 mr-2" />
          </button>
        </div>
      ))}
      <div className="flex items-center mb-2 text-sm">
        <input
          type="text"
          placeholder="Add"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border p-2 mr-2 w-32"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default ValuesColumn;

import React, { useState } from "react";
import { useValues } from "../context/ValuesContext";

const ColumnValues = ({
  column,
  values,
  updateValues,
  deleteValue,
  addValue,
}) => {
  const [newValue, setNewValue] = useState("");

  const handleAddValue = () => {
    if (newValue.trim() !== "") {
      addValue(column, newValue);
      setNewValue("");
    }
  };

  return (
    <div>
      <h3 className="font-bold text-lg">{column}</h3>
      {values.map((value, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={value}
            onChange={(e) => updateValues(column, index, e.target.value)}
            className="border p-2 w-full mr-2"
          />
          {/* <button
            onClick={() => deleteValue(column, index)}
            className="text-red-500"
          >
            Delete
          </button> */}
        </div>
      ))}
      <div className="p-2 flex items-center">
        <input
          type="text"
          placeholder={`Add new ${column}`}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border p-2 w-full mr-2"
        />
        <button onClick={handleAddValue} className="bg-blue-500 text-white p-2">
          Add
        </button>
      </div>
    </div>
  );
};

export default ColumnValues;

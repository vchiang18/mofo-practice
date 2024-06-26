import React, { useEffect } from "react";
import { useValues } from "../context/ValuesContext";
import ValuesColumn from "./ValuesColumn";

const ValueSettings = () => {
  const { values, addValue, updateValues2, deleteValue2 } = useValues();

  useEffect(() => {}, [values]);

  const formatKeyName = (key) => {
    if (key === "FIB") {
      return "FSL(FIB)";
    } else {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-center mb-4">
        <h1 className="text-lg font-bold">Settings</h1>
      </div>
      <div className="flex flex-wrap justify-start">
        {Object.keys(values)
          .filter((columnKey) => columnKey !== "period")
          .map((columnKey) => (
            <ValuesColumn
              key={columnKey}
              column={formatKeyName(columnKey)}
              columnKey={columnKey}
              updateValues2={updateValues2}
              deleteValue2={deleteValue2}
              addValue={addValue}
            />
          ))}
      </div>
    </div>
  );
};

export default ValueSettings;

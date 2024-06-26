import React, { useState, useEffect } from "react";
import { ValuesProvider, useValues } from "../context/ValuesContext";
import { usePractices } from "../context/PracticeContext";
import PeriodTypeSelector from "./PeriodTypeSelector";

const ManageCustomValues = () => {
  const { values, updateValues, fetchValues, deleteValue } = useValues();
  const [selectedColumn, setSelectedColumn] = useState("");
  const [newValue, setNewValue] = useState("");
  const [displayPeriodType, setDisplayPeriodType] = useState(false);
  const columns = Object.keys(values);
  const { clearPractices } = usePractices();

  useEffect(() => {
    fetchValues();
  }, [fetchValues]);

  const formatKeyName = (key) => {
    if (key === "FIB") {
      return "FSL(FIB)";
    } else {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    }
  };

  if (!columns.length) {
    return <div>No columns available</div>;
  }

  const handleDisplayPeriodType = () => {
    setDisplayPeriodType((prev) => !prev);
  };
  const handleSelectColumn = (column) => {
    setSelectedColumn(column);
    setDisplayPeriodType(false);
  };

  const handleAddValue = async (e) => {
    if (newValue.trim()) {
      const setValues = [...values[selectedColumn], newValue];
      updateValues(selectedColumn, setValues);
      setNewValue("");
      await fetchValues();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddValue(e);
    }
  };

  const handleDeleteValue = async (valueToDelete) => {
    await deleteValue(selectedColumn, valueToDelete);
  };

  return (
    <ValuesProvider>
      <div className="flex min-h-screen">
        <div className="w-1/5 bg-gray-100 p-4 rounded-lg flex flex-col">
          <div className="flex flex-col space-y-1 h-full">
            {columns.map((column) => (
              <span
                key={column}
                className={`py-2 px-4 rounded mx-2 cursor-pointer ${
                  selectedColumn === column
                    ? "font-bold text-green-500"
                    : "text-gray-800"
                }`}
                onClick={() => handleSelectColumn(column)}
              >
                {formatKeyName(column)}
              </span>
            ))}
            <div className="mt-auto justify-end">
              <button
                type="button"
                className="block rounded-md bg-blue-500 text-white mt-6 px-3 py-2 text-center text-smm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleDisplayPeriodType}
              >
                Set Period + Type
              </button>
            </div>
            <div className="mt-auto justify-end">
              <button
                type="button"
                onClick={clearPractices}
                className="block rounded-md bg-blue-500 text-white mt-6 px-3 py-2 text-center text-smm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Clear Practices
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-1 justify-center items-start p-4">
          {displayPeriodType ? (
            <PeriodTypeSelector />
          ) : selectedColumn ? (
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-start">
              <div className="mb-4">
                <input
                  className="p-2 border border-gray-300 rounded mr-2"
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add new value"
                />
                <button
                  onClick={handleAddValue}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-1">
                <table>
                  <tbody>
                    {values[selectedColumn]?.map((value, index) => (
                      <tr key={index}>
                        <td className="p-2">{value}</td>
                        <td
                          onClick={() => handleDeleteValue(value)}
                          className="ml-2 text-red-300 text-xs hover:text-red-600 cursor-pointer"
                        >
                          Delete
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>
              Select a column to display its values or set a period and type.
            </p>
          )}
        </div>
      </div>
    </ValuesProvider>
  );
};

export default ManageCustomValues;

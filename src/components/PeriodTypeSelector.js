import React, { useState } from "react";
import { useValues } from "../context/ValuesContext";

const PeriodTypeSelector = () => {
  const { values, updateValues, addOrUpdatePairing } = useValues();
  const [period, setPeriod] = useState(values.period[0]);
  const [practiceType, setPracticeType] = useState(values.practiceType[0]);

  const handlePeriodChange = (e) => {
    setPeriod(Number(e.target.value));
  };

  const handlePracticeTypeChange = (e) => {
    setPracticeType(e.target.value);
  };

  const handleSavePairing = () => {
    addOrUpdatePairing(period, practiceType);
    console.log("pairing saved: ", period, practiceType);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col">
      <div className="mb-4">
        <label>Period: </label>
        <select value={period} onChange={handlePeriodChange}>
          {values.period.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Practice Type: </label>
        <select value={practiceType} onChange={handlePracticeTypeChange}>
          {values.practiceType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-center items-center">
        <button
          className="rounded-md bg-blue-500 text-white mt-6 px-3 py-2 text-center text-sm text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSavePairing}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default PeriodTypeSelector;

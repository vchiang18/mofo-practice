import React, { useContext } from "react";
import { useHeader } from "../context/HeaderContext";

const PracticeHeader = () => {
  const { practiceNo, setPracticeNo, practiceDate, setPracticeDate } =
    useHeader();

  const handlePracticeNoChange = (e) => {
    setPracticeNo(e.target.value);
  };

  const handlePracticeDateChange = (e) => {
    setPracticeDate(e.target.value);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center">
        <div className="mx-4 flex items-center">
          <span className="mr-2">Practice Number:</span>
          <input
            type="text"
            value={practiceNo || ""}
            onChange={handlePracticeNoChange}
            placeholder="#"
          />
        </div>

        <input
          type="date"
          value={practiceDate || ""}
          onChange={handlePracticeDateChange}
        />
      </div>
    </div>
  );
};

export default PracticeHeader;

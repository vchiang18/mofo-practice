import React from "react";
import { usePractices } from "../context/PracticeContext";
import PracticeSettings from "./PracticeSettings";
import { useValues } from "../context/ValuesContext";

const PracticeHeader = () => {
  const { headings, updateHeadings, settings, updateSettings } = usePractices();
  const { values } = useValues();

  const handlePracticeNoChange = (e) => {
    updateHeadings({ practiceNo: e.target.value });
  };

  const handlePracticeDateChange = (e) => {
    updateHeadings({ practiceDate: e.target.value });
  };

  const handlePeriodChange = (e) => {
    updateSettings({
      period: e.target.value,
      practiceType: "",
      rep: 1,
    });
  };

  const handlePracticeTypeChange = (e) => {
    updateSettings({ practiceType: e.target.value });
  };

  const handleSituationChange = (e) => {
    updateSettings({ situation: e.target.value });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center">
        <div className="mx-4 flex items-center">
          <span className="mr-2">Practice Number:</span>
          <input
            type="text"
            value={headings.practiceNo || ""}
            onChange={handlePracticeNoChange}
            placeholder="#"
          />
        </div>

        <input
          type="date"
          value={headings.practiceDate || ""}
          onChange={handlePracticeDateChange}
        />
        <PracticeSettings
          label="Period"
          options={values.period}
          selectedValue={settings.period}
          onChange={handlePeriodChange}
        />

        <PracticeSettings
          label="Practice Type"
          options={values.practiceType}
          selectedValue={settings.practiceType}
          onChange={handlePracticeTypeChange}
        />
        <PracticeSettings
          label="Situation"
          options={values.situation}
          selectedValue={settings.situation}
          onChange={handleSituationChange}
        />
      </div>
    </div>
  );
};

export default PracticeHeader;

// import React from 'react';

// const PracticeSettings = ({label, options, selectedValue, onChange }) => {
//     return (
//         <div className="">
//             <label>{label}</label>
//             <select value={selectedValue} onChange={onChange}>
//                 {options.map((option, index) => (
//                     <option key={index} value={option}>
//                         {option}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     )
// }

// export default PracticeSettings;

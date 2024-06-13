import React from "react";
import { usePractices } from "../context/PracticeContext";
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

  const PracticeSettings = ({ label, options, selectedValue, onChange }) => {
    return (
      <div className="">
        <label>{label}</label>
        <select value={selectedValue} onChange={onChange}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="mx-4">
          <label className="block text-xs text-white mb-1 no-wrap">
            Prac #
          </label>
          <input
            type="text"
            value={headings.practiceNo || ""}
            onChange={handlePracticeNoChange}
            placeholder="#"
            className="w-10"
          />
        </div>
        <div className="mx-4">
          <label className="block text-xs text-white mb-1">Date</label>
          <input
            label="Date"
            type="date"
            value={headings.practiceDate || ""}
            onChange={handlePracticeDateChange}
          />
        </div>
        <div className="mx-4">
          <label className="block text-xs text-white mb-1">Period</label>
          <PracticeSettings
            options={values.period}
            selectedValue={settings.period}
            onChange={handlePeriodChange}
          />
        </div>
        <div className="mx-4">
          <label className="block text-xs text-white mb-1">Type</label>
          <PracticeSettings
            options={values.practiceType}
            selectedValue={settings.practiceType}
            onChange={handlePracticeTypeChange}
          />
        </div>
        <div className="mx-4">
          <label className="block text-xs text-white mb-1">Situation</label>
          <PracticeSettings
            options={values.situation}
            selectedValue={settings.situation}
            onChange={handleSituationChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PracticeHeader;

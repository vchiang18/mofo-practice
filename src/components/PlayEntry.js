import React, { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";
import PracticeSettings from "./PracticeSettings";
import RepCounter from "./RepCounter";
import { usePractices } from "../context/PracticeContext";
import { useValues } from "../context/ValuesContext";
import { usePlaySelections } from "../context/PlayContext";
import { useNavigate } from "react-router-dom";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PlayEntry = () => {
  const [selections, setSelections] = useState({
    offensivePersonnel: null,
    formation: null,
    formationVariation: null,
    backfield: null,
    motion: null,
    fib: null,
    formationFamily: null,
    unbalanced: null,
  });

  const [priorSelections, setPriorSelections] = useState({
    offensivePersonnel: null,
    formation: null,
    formationVariation: null,
    backfield: null,
    motion: null,
    fib: null,
    formationFamily: null,
    unbalanced: null,
  });

  const { playSelections, savePlaySelections } = usePlaySelections();
  const { values, fetchValues } = useValues();
  const navigate = useNavigate();
  const { settings, updateSettings, addPractice } = usePractices();

  const handleSelectionChange = (fieldName, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [fieldName]: value,
    }));
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

  const handleSave = () => {
    updateSettings({ rep: settings.rep + 1 });
  };

  useEffect(() => {
    if (playSelections) {
      setPriorSelections(playSelections);
    }
  }, [playSelections]);

  const handleReset = () => {
    if (priorSelections) {
      setSelections(priorSelections);
    }
  };

  const handleCancel = () => {
    setSelections({
      offensivePersonnel: null,
      formation: null,
      formationVariation: null,
      backfield: null,
      motion: null,
      fib: null,
      formationFamily: null,
      unbalanced: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePlaySelections(selections);
    const settingsSelections = {
      period: settings.period,
      practiceType: settings.practiceType,
      rep: settings.rep,
    };
    // console.log("selections on submit: ", selections);
    // console.log("prior selections: ", priorSelections);
    addPractice(selections, settingsSelections);
    setSelections({
      offensivePersonnel: null,
      formation: null,
      formationVariation: null,
      backfield: null,
      motion: null,
      fib: null,
      formationFamily: null,
      unbalanced: null,
    });
    handleSave();
    navigate("/play-list");
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between">
        <PracticeSettings
          label="Period"
          options={[1, 2, 3, 4, 5, 6, 7, 8]}
          selectedValue={settings.period}
          onChange={handlePeriodChange}
        />
        <PracticeSettings
          label="Practice Type"
          options={values.practiceType}
          selectedValue={settings.practiceType}
          onChange={handlePracticeTypeChange}
        />
        <RepCounter rep={settings.rep} />
      </div>
      <div className="flex flex-wrap">
        <div className="p-4 w-full">
          <div className="flex flex-wrap justify-between">
            <ButtonGroup
              fieldName="offensivePersonnel"
              displayName="OFF PERSONNEL"
              options={values.offensivePersonnel}
              onSelectionChange={handleSelectionChange}
              value={selections.offensivePersonnel}
            />
            <ButtonGroup
              fieldName="formation"
              displayName="FORMATION"
              options={values.formation}
              onSelectionChange={handleSelectionChange}
              value={selections.formation}
            />
            <ButtonGroup
              fieldName="formationVariation"
              displayName="FORM VAR"
              options={values.formationVariation}
              onSelectionChange={handleSelectionChange}
              value={selections.formationVariation}
            />
            <ButtonGroup
              fieldName="backfield"
              displayName="BACKFIELD"
              options={values.backfield}
              onSelectionChange={handleSelectionChange}
              value={selections.backfield}
            />
            <ButtonGroup
              fieldName="motion"
              displayName="MOTION"
              options={values.motion}
              onSelectionChange={handleSelectionChange}
              value={selections.motion}
            />
            <ButtonGroup
              fieldName="fib"
              displayName="FSL (FIB)"
              options={values.FIB}
              onSelectionChange={handleSelectionChange}
              value={selections.FIB}
            />
            <ButtonGroup
              fieldName="formationFamily"
              displayName="FORM FAM"
              options={values.formationFamily}
              onSelectionChange={handleSelectionChange}
              value={selections.formationFamily}
            />
            <ButtonGroup
              fieldName="unbalanced"
              displayName="UNB"
              options={values.unbalanced}
              onSelectionChange={handleSelectionChange}
              value={selections.unbalanced}
            />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded"
              aria-label="Repeat"
            >
              <ArrowPathIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
              aria-label="Cancel"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayEntry;

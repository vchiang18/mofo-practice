import React, { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";
import PlayListPreview from "./PlayListPreview";
import { usePractices } from "../context/PracticeContext";
import { useValues } from "../context/ValuesContext";
import { usePlaySelections } from "../context/PlayContext";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

export const initialSelections = {
  offensivePersonnel: null,
  formation: null,
  formationVariation: null,
  backfield: null,
  motion: null,
  FIB: null,
  formationFamily: null,
  unbalanced: null,
  bdryCov: null,
  fieldCov: null,
  passResult: null,
  defCov: null,
  playCall: null,
};

const PlayEntry = () => {
  const [selections, setSelections] = useState(initialSelections);
  const [priorSelections, setPriorSelections] = useState(initialSelections);

  const { playSelections, savePlaySelections } = usePlaySelections();
  const { values } = useValues();
  const { settings, updateSettings, addPractice } = usePractices();

  const handleSelectionChange = (fieldName, value) => {
    setSelections((prevSelections) => ({
      ...prevSelections,
      [fieldName]: value,
    }));
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
    setSelections(initialSelections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePlaySelections(selections);
    const settingsSelections = {
      practiceNo: settings.practiceNo,
      practiceDate: settings.practiceDate,
      period: settings.period,
      practiceType: settings.practiceType,
      situation: settings.situation,
      rep: settings.rep,
    };
    console.log("settingsSelections: ", settingsSelections);
    console.log("selections: ", selections);

    addPractice(selections, settingsSelections);
    setSelections(initialSelections);
    handleSave();
  };

  const selectionFields = [
    {
      fieldName: "offensivePersonnel",
      displayName: "OFF PERSONNEL",
      options: values.offensivePersonnel,
    },
    {
      fieldName: "formation",
      displayName: "FORMATION",
      options: values.formation,
    },
    {
      fieldName: "formationVariation",
      displayName: "FORM VAR",
      options: values.formationVariation,
    },
    {
      fieldName: "backfield",
      displayName: "BACKFIELD",
      options: values.backfield,
    },
    { fieldName: "motion", displayName: "MOTION", options: values.motion },
    { fieldName: "FIB", displayName: "FSL (FIB)", options: values.FIB },
    {
      fieldName: "formationFamily",
      displayName: "FORM FAM",
      options: values.formationFamily,
    },
    {
      fieldName: "unbalanced",
      displayName: "UNB",
      options: values.unbalanced,
    },
    { fieldName: "bdryCov", displayName: "BDRY COV", options: values.bdryCov },
    {
      fieldName: "fieldCov",
      displayName: "FIELD COV",
      options: values.fieldCov,
    },
    {
      fieldName: "passResult",
      displayName: "PASS RESULT",
      options: values.passResult,
    },
    { fieldName: "defCov", displayName: "DEF COV", options: values.defCov },
    {
      fieldName: "playCall",
      displayName: "PLAY CALL",
      options: values.playCall,
    },
  ];

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-center gap-24"></div>
      <div className="flex flex-wrap">
        <div className="p-2 w-full">
          <div className="flex flex-nowrap justify-between">
            {selectionFields.map((field) => (
              <div key={field.fieldName} className="flex-grow">
                <ButtonGroup
                  fieldName={field.fieldName}
                  displayName={field.displayName}
                  options={field.options}
                  onSelectionChange={handleSelectionChange}
                  value={selections[field.fieldName]}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 py-2 rounded"
              aria-label="Cancel"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded"
              aria-label="Repeat"
            >
              <ArrowPathIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Enter
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <PlayListPreview
          limit={10}
          sortOrder="desc"
          showAdditionalColumns={false}
        />
      </div>
    </div>
  );
};

export default PlayEntry;

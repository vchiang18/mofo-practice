import React, { useEffect, useState } from "react";
import ButtonGroup from "./ButtonGroup";
import PlayListPreview from "./PlayListPreview";
import { usePractices } from "../context/PracticeContext";
import { useValues } from "../context/ValuesContext";
import { usePlaySelections } from "../context/PlayContext";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";

const PlayEntry = () => {
  const [selections, setSelections] = useState({
    offensivePersonnel: null,
    formation: null,
    formationVariation: null,
    backfield: null,
    motion: null,
    FIB: null,
    formationFamily: null,
    unbalanced: null,
  });

  const [priorSelections, setPriorSelections] = useState({
    offensivePersonnel: null,
    formation: null,
    formationVariation: null,
    backfield: null,
    motion: null,
    FIB: null,
    formationFamily: null,
    unbalanced: null,
  });

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
    setSelections({
      offensivePersonnel: null,
      formation: null,
      formationVariation: null,
      backfield: null,
      motion: null,
      FIB: null,
      formationFamily: null,
      unbalanced: null,
    });
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

    addPractice(selections, settingsSelections);
    setSelections({
      offensivePersonnel: null,
      formation: null,
      formationVariation: null,
      backfield: null,
      motion: null,
      FIB: null,
      formationFamily: null,
      unbalanced: null,
    });
    handleSave();
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-center gap-24"></div>
      <div className="flex flex-wrap">
        <div className="p-2 w-full">
          <div className="flex flex-nowrap justify-between">
            {/* <div className="w-[163px]"> */}
            <div className="flex-grow">
              <ButtonGroup
                fieldName="offensivePersonnel"
                displayName="OFF PERSONNEL"
                options={values.offensivePersonnel}
                onSelectionChange={handleSelectionChange}
                value={selections.offensivePersonnel}
              />
            </div>
            {/* <div className="w-[284px]"> */}
            <div className="flex-grow">
              <ButtonGroup
                fieldName="formation"
                displayName="FORMATION"
                options={values.formation}
                onSelectionChange={handleSelectionChange}
                value={selections.formation}
              />
            </div>
            {/* <div className="w-[163px]"> */}
            <div className="flex-grow">
              <ButtonGroup
                fieldName="formationVariation"
                displayName="FORM VAR"
                options={values.formationVariation}
                onSelectionChange={handleSelectionChange}
                value={selections.formationVariation}
              />
            </div>
            {/* <div className="w-[163px]"> */}
            <div className="flex-grow">
              <ButtonGroup
                fieldName="backfield"
                displayName="BACKFIELD"
                options={values.backfield}
                onSelectionChange={handleSelectionChange}
                value={selections.backfield}
              />
            </div>
            {/* <div className="w-[163px]"> */}
            <div className="flex-grow">
              <ButtonGroup
                fieldName="motion"
                displayName="MOTION"
                options={values.motion}
                onSelectionChange={handleSelectionChange}
                value={selections.motion}
              />
            </div>
            <div className="flex-grow">
              <ButtonGroup
                fieldName="FIB"
                displayName="FSL (FIB)"
                options={values.FIB}
                onSelectionChange={handleSelectionChange}
                value={selections.FIB}
              />
            </div>
            <div className="flex-grow">
              <ButtonGroup
                fieldName="formationFamily"
                displayName="FORM FAM"
                options={values.formationFamily}
                onSelectionChange={handleSelectionChange}
                value={selections.formationFamily}
              />
            </div>
            <div className="flex-grow">
              <ButtonGroup
                fieldName="unbalanced"
                displayName="UNB"
                options={values.unbalanced}
                onSelectionChange={handleSelectionChange}
                value={selections.unbalanced}
              />
            </div>
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

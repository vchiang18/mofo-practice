import React, { useState } from "react";
import ButtonGroup from "./ButtonGroup";
import PlayListPreview from "./PlayListPreview";
import { usePractices } from "../context/PracticeContext";
// import { useValues } from "../context/ValuesContext";
// import { usePlaySelections } from "../context/PlayContext";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { clearSelections, copyPrev, finalize } from "../redux/slices/selections";
import { addPlay } from "../redux/slices/savedPlays";


const PlayEntry = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fields.fields);
  const selections = useSelector((state) => state.selections.selections);
  const names = fields.map((x) => x.name)

  // const [selections, setSelections] = useState({
  //   offensivePersonnel: null,
  //   formation: null,
  //   formationVariation: null,
  //   backfield: null,
  //   motion: null,
  //   FIB: null,
  //   formationFamily: null,
  //   unbalanced: null,
  // });

  const [priorSelections, setPriorSelections] = useState({...selections}

  );

  // const { playSelections, savePlaySelections } = usePlaySelections();
  // const { values } = useValues();
  const { settings, updateSettings } = usePractices();

  // const handleSelectionChange = (fieldName, value) => {
  //   setSelections((prevSelections) => ({
  //     ...prevSelections,
  //     [fieldName]: value,
  //   }));
  // };

  const handleSave = () => {
    updateSettings({ rep: settings.rep + 1 });
    setPriorSelections(selections);
    dispatch(finalize({fields: names}))
    dispatch(addPlay(selections));
  };

  // useEffect(() => {
  //   // if (selections) {
  //   //   setPriorSelections(selections);
  //   // }
  // }, [selections]);

  const handleReset = () => {
    dispatch(clearSelections());
    dispatch(copyPrev(priorSelections));

  };

  const handleCancel = () => {
    dispatch(clearSelections());
  };

  const handleSubmit = () => {
    // e.preventDefault();
    // savePlaySelections(selections);
    // const settingsSelections = {
    //   practiceNo: settings.practiceNo,
    //   practiceDate: settings.practiceDate,
    //   period: settings.period,
    //   practiceType: settings.practiceType,
    //   situation: settings.situation,
    //   rep: settings.rep,
    // };
    // console.log("settingsSelections: ", settingsSelections);

    // addPractice(selections, settingsSelections);
    handleSave();
    dispatch(clearSelections());
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-center gap-24"></div>
      <div className="flex flex-wrap">
        <div className="p-2 w-full">
          <div className="flex flex-nowrap justify-between">
            {fields.map(({ name, accessor, multiselect }) => {
              return (
                <div className="flex-grow">
                  <ButtonGroup
                    fieldName={accessor}
                    displayName={name}
                    multi={multiselect}
                    // options={values.slice(0, -1)}
                    // onSelectionChange={handleSelectionChange}
                    // value={selections.offensivePersonnel}
                  />
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={handleCancel}
              className="bg-red-500 h-10 text-white px-4 py-2 rounded"
              aria-label="Cancel"
            >
              <XMarkIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 h-10 text-white px-4 py-2 rounded"
              aria-label="Repeat"
            >
              <ArrowPathIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleSubmit}
              className="bg-green-500 h-10 text-white px-4 py-2 rounded"
            >
              Enter
            </button>
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
    </div>
  );
};

export default PlayEntry;

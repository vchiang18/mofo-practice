import React, { useState } from "react";
import ButtonGroup from "./ButtonGroup";
import PlayListPreview from "./PlayListPreview";
import { usePractices } from "../context/PracticeContext";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { clearSelections, copyPrev, finalize } from "../redux/slices/selections";
import { addPlay } from "../redux/slices/savedPlays";
import { swapIndex } from "../redux/slices/fields";


const PlayEntry = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fields.fields);
  const selections = useSelector((state) => state.selections.selections);

  const drag = (ev, index) => {
    ev.dataTransfer.setData("index",index);
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev, index) => {
    ev.preventDefault();
    let id = index;
    let newIndex = ev.dataTransfer.getData("index");
    dispatch(swapIndex({ index: id, newIndex: newIndex }));
  }
  const names = fields.map((x) => x.name)

  const [priorSelections, setPriorSelections] = useState({...selections});

  const { settings, updateSettings } = usePractices();

  const handleSave = () => {
    updateSettings({ rep: settings.rep + 1 });
    setPriorSelections(selections);
    dispatch(addPlay(selections));
  };

  const handleReset = () => {
    dispatch(clearSelections());
    dispatch(copyPrev(priorSelections));
  };

  const handleCancel = () => {
    dispatch(clearSelections());
  };

  const handleSubmit = () => {
    dispatch(finalize({fields: names}))
    handleSave();
    dispatch(clearSelections());
  };

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center justify-center gap-24"></div>
      <div className="flex flex-wrap">
        <div className="p-2 w-full">
          <div className="flex flex-nowrap justify-between">
            {fields.map(({ name, accessor, multiselect }, index) => {
              let thisDrag = (ev) => {
                drag(ev, index);
              }
              let thisDrop = (ev) => {
                drop(ev, index);
              }
              return (
                <div
                    draggable="true"
                    key={index}
                    onDragStart={thisDrag}
                    onDrop={thisDrop}
                    onDragOver={allowDrop}
                    className="flex-grow">

                  <ButtonGroup
                  multiselect={multiselect}
                    fieldName={accessor}
                    displayName={name}
                    multi={multiselect}
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

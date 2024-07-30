import React, { useRef } from "react";
import ButtonGroup from "./ButtonGroup";
import PlayListPreview from "./PlayListPreview";
import { ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  clearSelections,
  copyPrev,
  finalize,
  setPrior,
} from "../redux/slices/selections";
import { addPlay } from "../redux/slices/savedPlays";
import { swapIndex } from "../redux/slices/fields";

const PlayEntry = () => {
  const dispatch = useDispatch();
  const { fields, headers } = useSelector((state) => state.fields);
  const { selections, priorSelections } = useSelector(
    (state) => state.selections
  );

  const dragItem = useRef(null);
  const dragOverIndex = useRef(null);

  const skipHeader = () => {
    const cleanSelect = { priorSelections };
    for (let x of Object.keys(headers)) {
      let hName = x.name;
      cleanSelect.name = selections[hName];
    }
    dispatch(setPrior(cleanSelect));
  };

  const drag = (ev, index) => {
    ev.dataTransfer.setData("index", index);
    dragItem.current = index;
  };

  const allowDrop = (ev) => {
    ev.preventDefault();
  };

  const drop = (ev, index) => {
    ev.preventDefault();
    let id = index;
    let newIndex = ev.dataTransfer.getData("index");
    dispatch(swapIndex({ index: id, newIndex: newIndex }));
    dragItem.current = null;
    dragOverIndex.current = null;
  };

  const onTouchStart = (e, index) => {
    dragItem.current = index;
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const targetElement = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    );
    if (targetElement && targetElement.dataset && targetElement.dataset.index) {
      dragOverIndex.current = targetElement.dataset.index;
    }
  };

  const onTouchEnd = (e) => {
    if (dragOverIndex.current != null) {
      drop(e, dragOverIndex.current);
    }
    dragItem.current = null;
    dragOverIndex.current = null;
  };

  const names = fields.map((x) => x.name);

  const handleSave = async () => {
    dispatch(setPrior(selections));
    dispatch(addPlay(selections));
  };

  const handleReset = () => {
    skipHeader();
    dispatch(clearSelections());
    dispatch(copyPrev(priorSelections));
  };

  const handleCancel = () => {
    dispatch(clearSelections());
  };

  const handleSubmit = () => {
    dispatch(finalize({ fields: names }));
    handleSave();
    dispatch(clearSelections());
  };

  return (
    <div className="p-1">
      <div className="flex flex-wrap items-center justify-center gap-24"></div>
      <div className="flex flex-wrap">
        <div className="p-1 w-full">
          <div className="flex flex-nowrap justify-between">
            {fields.map(({ label, name, multiselect }, index) => {
              let thisDrag = (ev) => {
                drag(ev, index);
              };
              let thisDrop = (ev) => {
                drop(ev, index);
              };
              return (
                <div
                  draggable="true"
                  key={index}
                  data-index={index}
                  onDragStart={thisDrag}
                  onDrop={thisDrop}
                  onDragOver={allowDrop}
                  onTouchStart={(e) => onTouchStart(e, index)}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                  className="flex-grow p-1"
                >
                  <ButtonGroup
                    multiselect={multiselect}
                    fieldName={name}
                    displayName={label}
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

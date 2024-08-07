import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelection,
  removeSelection,
  setSingleSelection,
} from "../redux/slices/selections";

const ButtonGroup = ({ fieldName, displayName, multi }) => {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.selections.selections);

  const { values } = useSelector((state) => state.fields.fields).find(
    (obj) => obj.name === fieldName
  );

  const handleSelection = (option, e) => {
    try {
      if (!multi) {
        //single selection
        if (selections[fieldName] === option) {
          dispatch(setSingleSelection({ field: fieldName, value: "" }));
        } else {
          dispatch(setSingleSelection({ field: fieldName, value: option }));
        }
      } else if (typeof selections[fieldName] === "string") {
        // Multi-selection mode, but the current selection is a string (single selection)
        if (option === selections[fieldName]) {
          dispatch(setSingleSelection({ field: fieldName, value: [] }));
        } else {
          dispatch(
            setSingleSelection({
              field: fieldName,
              value: [selections[fieldName]],
            })
          );
          dispatch(setSelection({ field: fieldName, value: option }));
        }
      } else if (
        // Multi-selection mode and the current selection is an array
        selections[fieldName] === undefined ||
        !selections[fieldName].includes(option)
      ) {
        dispatch(setSelection({ field: fieldName, value: option }));
      } else {
        dispatch(removeSelection({ field: fieldName, value: option }));
      }
    } catch (e) {
      if (!selections[fieldName]) {
        dispatch(setSelection({ field: fieldName, value: option }));
        console.error(e, " Button group multiselect error");
      }
    }
  };

  const columns = [];
  const len = values.length;
  const lim = 9;
  const columnsNum = len > lim ? Math.ceil(len / lim) : 1;

  for (let i = 0; i < columnsNum; i++) {
    columns.push(
      values.slice(i * lim, len > lim * (i + 1) ? lim * (i + 1) : len)
    );
  }

  return (
    <div className="mb-2">
      <h2 className="text-center mb-2 pl-2 break-words bg-gray-200 rounded p-2">
        {displayName}
      </h2>
      <div className="flex flex-row justify-center mb-2 space-x-2 font-bold">
        {columns.map((col, index) => (
          <div key={index} className="flex flex-col mb-2 space-y-2 font-bold">
            {col
              .filter((option) => option !== "")
              .map((option, ind) => (
                <button
                  key={ind}
                  className={`align-center py-2 px-4 rounded mx-2 min-h-[73.72px] ${
                    multi
                      ? selections[fieldName] &&
                        selections[fieldName].includes(option)
                        ? "bg-gold-gradient"
                        : "bg-blue-gradient text-white"
                      : selections[fieldName] === option
                      ? "bg-gold-gradient"
                      : "bg-blue-gradient text-white"
                  }`}
                  onClick={() => handleSelection(option)}
                >
                  {option}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;

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
  // const fieldData = useSelector((state) =>
  //   state.fields.fields.find((obj) => obj.name === fieldName)
  // );

  // if (!fieldData) {
  //   return null;
  // }

  // const { values } = fieldData;

  const { values } = useSelector((state) => state.fields.fields).find(
    (obj) => obj.name === fieldName
  );

  const handleSelection = (option) => {
    try {
      if (!multi) {
        //single selection
        console.log("Current selections:", selections);
        console.log(`Selecting option: ${option}`);
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
        console.error(e, "Button group multiselect error");
      }
    }
  };

  // const handleTouchStart = (e, option) => {
  //   e.preventDefault();
  //   handleSelection(option);
  // };

  // const renderButton = (option, ind) => {
  //   const isSelected = Array.isArray(selections[fieldName])
  //     ? selections[fieldName].includes(option)
  //     : selections[fieldName] === option;

  //   return (
  //     <button
  //       key={ind}
  //       className={`align-center py-2 px-4 rounded mx-2 min-h-[73.72px] ${
  //         isSelected ? "bg-gold-gradient" : "bg-blue-gradient text-white"
  //       } hover:bg-gold-gradient hover:text-black`}
  //       onClick={() => handleSelection(option)}
  //       onTouchStart={(e) => handleTouchStart(e, option)}
  //     >
  //       {option}
  //     </button>
  //   );
  // };

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
            {(index + 1) * lim > len
              ? col.slice(0, -1).map((option, ind) => (
                  <button
                    key={ind}
                    className={`align-center py-2 px-4 rounded mx-2 min-h-[73.72px] ${
                      selections[fieldName] &&
                      selections[fieldName].includes(option)
                        ? "bg-gold-gradient"
                        : "bg-blue-gradient text-white"
                    } hover:bg-gold-gradient hover:text-black`}
                    onClick={() => handleSelection(option)}
                    // onTouchStart={(e) => handleTouchStart(e, option)}
                  >
                    {option}
                  </button>
                ))
              : col.map((option, ind) => (
                  <button
                    key={ind}
                    className={`align-center py-2 px-4 rounded mx-2 min-h-[73.72px] ${
                      selections[fieldName] &&
                      selections[fieldName].includes(option)
                        ? "bg-gold-gradient"
                        : "bg-blue-gradient text-white"
                    } hover:bg-gold-gradient hover:text-black`}
                    onClick={() => handleSelection(option)}
                    // onTouchStart={(e) => handleTouchStart(e, option)}
                  >
                    {option}
                  </button>
                ))}
          </div>
        ))}
      </div>
    </div>

    // <div className="mb-2">
    //   <h2 className="text-center mb-2 pl-2 break-words bg-gray-200 rounded p-2">
    //     {displayName}
    //   </h2>
    //   <div className="flex flex-row justify-center mb-2 space-x-2 font-bold">
    //     {columns.map((col, index) => (
    //       <div key={index} className="flex flex-col mb-2 space-y-2 font-bold">
    //         {col.slice(0, -1).map((option, ind) => renderButton(option, ind))}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default ButtonGroup;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelection, removeSelection } from "../redux/slices/selections";

const ButtonGroup = ({
  fieldName,
  displayName,
  options,
}) => {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.selections.selections);

  const handleSelection = (index) => {
    try{
      if (!selections[fieldName].includes(index)) {
        dispatch(setSelection({ field: fieldName, value: index }));
      }else{
        dispatch(removeSelection({ field: fieldName, value: index }));
      }
    }catch(e){
      if (!selections[fieldName]) {
        dispatch(setSelection({ field: fieldName, value: index }));
      }
    }
    // const newValue = value === option ? null : option;
    // onSelectionChange(fieldName, newValue);
  };

  return (
    <div className="mb-2">
      <h2 className="text-center mb-2 pl-2 flex-wrap">{displayName}</h2>
      <div className="flex flex-col mb-2 space-y-2 font-bold">
        {options.map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded mx-2 min-h-[73.72px]  ${
              selections[fieldName] && selections[fieldName].includes(index)
                ? "bg-gold-gradient"
                : "bg-blue-gradient text-white"
            } hover:bg-gold-gradient hover:text-black`}
            onClick={() => handleSelection(index)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;

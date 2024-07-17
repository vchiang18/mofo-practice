import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelection, removeSelection, setSingleSelection } from "../redux/slices/selections";

const ButtonGroup = ({
  fieldName,
  displayName,
  multi,
}) => {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.selections.selections);
  const field = useSelector((state) => state.fields.fields).find((obj)=>(obj.name === fieldName));

  const handleSelection = (option) => {
    console.log(multi)
    try{
      if (!multi){
        dispatch(setSingleSelection({field: fieldName, value: option}))
      }else if (!selections[fieldName].includes(option)) {
        dispatch(setSelection({ field: fieldName, value: option }));
      }else{
        dispatch(removeSelection({ field: fieldName, value: option }));
      }
    }catch(e){
      if (!selections[fieldName]) {
        dispatch(setSelection({ field: fieldName, value: option }));
      }
    }
    // const newValue = value === option ? null : option;
    // onSelectionChange(fieldName, newValue);
  };

  return (
    <div className="mb-2">
      <h2 className="text-center mb-2 pl-2 flex-wrap">{displayName}</h2>
      <div className="flex flex-col mb-2 space-y-2 font-bold">
        {field.values.slice(0,-1).map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded mx-2 min-h-[73.72px]  ${
              selections[fieldName] && selections[fieldName].includes(option)
                ? "bg-gold-gradient"
                : "bg-blue-gradient text-white"
            } hover:bg-gold-gradient hover:text-black`}
            onClick={() => handleSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;

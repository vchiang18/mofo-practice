import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelection, removeSelection } from "../redux/slices/selections";

const ButtonGroup = ({
  fieldName,
  displayName,
  multiselect,
}) => {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.selections.selections);
  const field = useSelector((state) => state.fields.fields).find((obj)=>(obj.accessor === fieldName));

  const handleSelection = (name) => {
    if (multiselect){
      try{
            if (!selections[fieldName].includes(name)) {
              dispatch(setSelection({ field: fieldName, value: name }));
            }else{
              dispatch(removeSelection({ field: fieldName, value: name }));
            }
          }catch(e){
            if (!selections[fieldName]) {
              dispatch(setSelection({ field: fieldName, value: name }));
            }
          }
    }else{
      try{
        if (selections[fieldName] === name){
        dispatch(removeSelection({ field: fieldName, value: name }));
      }else{
      dispatch(setSelection({ field: fieldName, value: name}));
      }
    }catch (e){
      dispatch(setSelection({ field: fieldName, value: name}));
    }


  }
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

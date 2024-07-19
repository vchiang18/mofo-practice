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
  const {values} = useSelector((state) => state.fields.fields).find((obj)=>(obj.name === fieldName));

  const handleSelection = (option) => {
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
  };

  const columns = []
  const len = values.length
  const lim = 5
  const columnsNum = len >lim ? Math.ceil(len / lim) : 1

  for (let i = 0; i < columnsNum; i++){
    columns.push(values.slice(
      i * lim,
      len > lim * (i + 1)
      ? lim * (i+1)
      : len
    ))
  }
  len > 10 ? console.log("columns: ",columns): console.log()
  return (
    <div className="mb-2">
      <h2 className="text-center mb-2 pl-2 flex-wrap">{displayName}</h2>
      <div className="flex flex-row mb-2 space-y-2 font-bold">
        {columns.map((col, index) => (
          <div className="flex flex-col mb-2 space-y-2 font-bold">
            {index +1 === columns.length
            ? col.slice(0,-1).map((option, ind) =>(
              <button
            key={ind}
            className={`align-center py-2 px-4 rounded mx-2 min-h-[73.72px]  ${
              selections[fieldName] && selections[fieldName].includes(option)
                ? "bg-gold-gradient"
                : "bg-blue-gradient text-white"
            } hover:bg-gold-gradient hover:text-black`}
            onClick={() => handleSelection(option)}
          >
            {option}
          </button>
            ))
            : col.map((option, ind) => (
              <button
              key={ind}
              className={`align-center py-2 px-4 rounded mx-2 min-h-[73.72px]  ${
                selections[fieldName] && selections[fieldName].includes(option)
                  ? "bg-gold-gradient"
                  : "bg-blue-gradient text-white"
              } hover:bg-gold-gradient hover:text-black`}
              onClick={() => handleSelection(option)}
            >
              {option}
            </button>
              ))
          }
          </div>
        ))}
      </div>
    </div>
  );
};

export default ButtonGroup;

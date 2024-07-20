import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelection, setSingleSelection } from "../redux/slices/selections";

const PracticeHeader = () => {
  // const { settings, updateSettings } = usePractices();
  const dispatch = useDispatch();

  const selections = useSelector((state) => state.selections.selections);
  const headerFields = useSelector((state) => state.fields.headers)

  const handleSelection = ({target:{name, value}}) => {
    dispatch(setSelection({ field: name, value: value }));
  };

  const handleDropdownChange = ({target : {name, value}}) => {
    dispatch(setSingleSelection({ field: name, value: value }));
  };


  // const PracticeSettings = ({options, selectedValue, onChange, name }) => {

  //   return (
  //       <select value={selectedValue} onChange={onChange} name={name}>
  //         {options.map((option, index) => (
  //           <option key={index} value={option}>
  //             {option}
  //           </option>
  //         ))}
  //       </select>
  //   );

  // };
  useEffect(()  =>{
    headerFields.forEach(({name, values}) => {
      if (!selections[name]){
        dispatch(setSingleSelection({field: name, value: values[0]}))
      }
    })
  },[headerFields, selections, dispatch])

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="mx-4">
          <label className="block text-xs text-white mb-1 no-wrap">
            Prac #
          </label>
          <input
            type="text"
            value={selections.practiceNo ? selections.practiceNo: ""}
            onChange={handleSelection}
            placeholder="#"
            className="w-10"
            name="practiceNo"
          />
        </div>
        <div className="mx-4">
          <label className="block text-xs text-white mb-1">Date</label>
          <input
            label="Date"
            type="date"
            value={selections.practiceDate ? selections.practiceDate:""}
            onChange={handleSelection}
            name="practiceDate"
          />
        </div>
        {headerFields.map(({name, values, label}) =>{
        return (
            <div className="mx-4" key={label}>
              <label className="block text-xs text-white mb-1">{label}</label>
              <select value={selections[name]}
                onChange={handleDropdownChange}
                name={name}>
                {values.slice(0,-1).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )
        })}
        {/* <div className="mx-4">
          <label className="block text-xs text-white mb-1">Period</label>
          <PracticeSettings
            options={values.period}
            selectedValue={selections.period ? selections.period[0]: ""}
            onChange={handleDropdownChange}
            name="period"
          />
        </div>
        <div className="mx-4">
          <label className="block text-xs text-white mb-1">Type</label>
          <PracticeSettings
            options={values.practiceType}
            selectedValue={selections.practiceType ? selections.practiceType[0]: ""}
            onChange={handleDropdownChange}
            name="practiceType"
          />
        </div>
        <div className="mx-4">
          <label className="block text-xs text-white mb-1">Situation</label>
          <PracticeSettings
            options={values.situation}
            selectedValue={selections.situation ? selections.situation[0]: ""}
            onChange={handleDropdownChange}
            name="situation"
          />
        </div> */}
      </div>
    </div>
  );
};

export default PracticeHeader;

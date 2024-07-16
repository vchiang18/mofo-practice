import React from "react";
import { useValues } from "../context/ValuesContext";
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
  console.log("headers", headerFields)

  // const handlePracticeNoChange = (e) => {
  //   updateSettings({ practiceNo: e.target.value });
  // };

  // const handlePracticeDateChange = (e) => {
  //   updateSettings({ practiceDate: e.target.value });
  // };

  // // useEffect(() => {
  // //   console.log(settings.practiceNo);
  // // }, [settings.practiceNo]);

  // const handlePeriodChange = (e) => {
  //   updateSettings({
  //     period: e.target.value,
  //     practiceType: "",
  //     rep: 1,
  //   });
  // };

  // const handlePracticeTypeChange = (e) => {
  //   updateSettings({ practiceType: e.target.value });
  // };

  // const handleSituationChange = (e) => {
  //   updateSettings({ situation: e.target.value });
  // };

  const PracticeSettings = ({ label, options, selectedValue, onChange, name }) => {
    return (
      <div className="">
        <label>{label}</label>
        <select value={selectedValue} onChange={onChange} name={name}>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );

  };

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
        {headerFields.map(({name, values, label}) => {
          console.log(name)
          console.log(values)
          return (
            <div className="mx-4">
              <label className="block text-xs text-white mb-1">{label}</label>
              <PracticeSettings
              options={values}
              selectedValue={selections[name]}
              onChange={handleDropdownChange}
              name={name}
              />
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

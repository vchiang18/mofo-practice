import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  removeField,
  changeFieldName,
  removeValue,
  changeValue,
  toggleMutliselect,
  removeHeaderValue,
  changeHeaderValue,
  swapValues,
} from "../redux/slices/fields";
import { useState } from "react";
import {
  XMarkIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const Settings = () => {
  const [inputs, setInputs] = useState(""); // [1]
  const dispatch = useDispatch();
  const { fields, headers } = useSelector((state) => state.fields);

  const handleInputChange = (e) => {
    setInputs(e.target.value);
  };

  const handleNext = (e) => {
    const next = e.currentTarget.parentElement.nextSibling;

    if (e.key === "Enter" && next !== null) {
      next.childNodes[0].focus();
    }
  };

  const handleMoveValue = (fieldIndex, valIndex, direction) => {
    const newIndex = valIndex + direction;
    if (newIndex < 0 || newIndex >= fields[fieldIndex].values.length) return;
    dispatch(
      swapValues({ fieldIndex, valIndex1: valIndex, valIndex2: newIndex })
    );
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-lg font-bold p-4">Field Settings</h1>
      </div>
      <div>
        <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem] mt-4 mx-auto">
          <button
            className="absolute right-1 top-1 z-10 select-none rounded bg-blue-gradient py-2 px-4 text-center font-bold uppercase text-white text-xs"
            type="button"
            onClick={() => dispatch(addField(inputs)) && setInputs("")}
          >
            Add Field
          </button>
          <input
            type="text"
            className="border p-2 mr-2 text-sm"
            placeholder="New Field"
            value={inputs}
            onChange={handleInputChange}
            onKeyDown={(e) =>
              e.key === "Enter" && inputs.length > 0
                ? dispatch(addField(inputs)) && setInputs("")
                : null
            }
          />
        </div>
        <div className="flex flex-wrap mt-4">
          {fields.map(({ name, label, values, multiselect }, index) => (
            <div key={index} className="flex flex-col p-4 m-4 border rounded">
              <div className="flex items-center mb-2">
                <input
                  className="font-semibold text-gray-500 text-base mr-2"
                  value={label}
                  onChange={(e) =>
                    dispatch(changeFieldName({ index, name: e.target.value }))
                  }
                />
                <button
                  onClick={() => dispatch(removeField(name))}
                  className="bg-red-400 text-white px-2 py-2 rounded text-xs"
                  aria-label="Cancel"
                >
                  Delete Field
                </button>
              </div>
              {values.map((value, valIndex) => (
                <div key={valIndex} className="flex items-center mb-2 text-sm">
                  <button
                    className="text-gray-500 mr-2"
                    onClick={() => handleMoveValue(index, valIndex, -1)}
                    disabled={valIndex === 0}
                  >
                    <ArrowUpIcon className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-500 mr-2"
                    onClick={() => handleMoveValue(index, valIndex, 1)}
                    disabled={valIndex === values.length - 2}
                  >
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      dispatch(
                        changeValue({ index, valIndex, value: e.target.value })
                      )
                    }
                    className="border p-2 mr-2 w-32"
                    onKeyDown={(e) => handleNext(e)}
                  />
                  <button
                    className="text-red-500"
                    onClick={() => dispatch(removeValue({ index, valIndex }))}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <button
                  className={`${
                    multiselect ? "bg-green-500" : "bg-gray-200"
                  } px-4 py-2 rounded text-xs font-bold`}
                  onClick={() => dispatch(toggleMutliselect({ index }))}
                >
                  {multiselect ? "Multiselect Enabled" : "Multiselect Disabled"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <h1 className="text-lg font-bold p-4">Header Settings</h1>
        </div>
        <div className="flex flex-wrap mt-4">
          {headers.map(({ label, values }, index) => (
            <div key={index} className="flex flex-col p-4 m-4 border rounded">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-gray-500 text-base mr-2">
                  {label}
                </span>
              </div>
              {values.map((value, valIndex) => (
                <div key={valIndex} className="flex items-center mb-2 text-sm">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) =>
                      dispatch(
                        changeHeaderValue({
                          index,
                          valIndex,
                          value: e.target.value,
                        })
                      )
                    }
                    className="border p-2 mr-2 w-32"
                    onKeyDown={(e) => handleNext(e)}
                  />
                  <button
                    className="text-red-500"
                    onClick={() =>
                      dispatch(removeHeaderValue({ index, valIndex }))
                    }
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;

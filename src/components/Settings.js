import { useDispatch, useSelector } from "react-redux";
import {
  addField,
  removeField,
  changeFieldName,
  removeValue,
  changeValue,
  toggleMutliselect,
} from "../redux/slices/fields";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
// import Popup from "./Popup.js";

const Settings = () => {
  const [inputs, setInputs] = useState(""); // [1]
  const dispatch = useDispatch();
  const fields = useSelector((state) => state.fields.fields);
  //   const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    setInputs(e.target.value);
  };

  const handleNext = (e) => {
    const next = e.currentTarget.parentElement.nextSibling;

    if (e.key === "Enter" && next !== null) {
      next.childNodes[0].focus();
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-lg font-bold p-4">Settings</h1>
      </div>
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
        {fields.map(({ name, values, multiselect }, index) => (
          <div key={index} className="flex flex-col p-4 m-4 border rounded">
            <div className="flex items-center mb-2">
              <input
                className="font-semibold text-gray-500 text-base mr-2"
                value={name}
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
              onClick={() => dispatch(toggleMutliselect({index}))}>
                {multiselect ? "Multiselect Enabled" : "Multiselect Disabled"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;

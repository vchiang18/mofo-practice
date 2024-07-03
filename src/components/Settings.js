import { useDispatch, useSelector } from "react-redux";
import { addField, removeField, changeFieldName, removeValue, changeValue } from "../redux/slices/fields";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";


const Settings = () => {
    const [inputs, setInputs] = useState(""); // [1]
    const dispatch = useDispatch();
    const fields = useSelector((state) => state.fields.fields);

    const handleInputChange = (e) => {
        setInputs(e.target.value);
    }

    const handleSave = () => {
        localStorage.setItem("fields", JSON.stringify(fields));
    }

    const handleNext = (e) => {
        const next = e.currentTarget.parentElement.nextSibling

        if (e.key === "Enter" && next !== null) {
            next.childNodes[0].focus()
        }

    }

    return (
        <div>
            <div
            className="flex justify-center">
            <h1
            className="flex text-4xl font-bold tracking-tight sm:text-6xl text-center"
            >Settings</h1>
            </div>
            <div class="relative flex h-10 w-full min-w-[200px] max-w-[24rem]">
  <button
    class="!absolute right-1 top-1 z-10 select-none rounded bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white"
    type="button"
    onClick={() => dispatch(addField(inputs)) && setInputs("")}
  >
    Add Field
  </button>
  <input
    type="email"
    class="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
    placeholder=""
    value={inputs}
                onChange={handleInputChange}
                onKeyDown={
                    (e) => e.key === "Enter" && inputs.length > 0 ? dispatch(addField(inputs)) && setInputs("") : null
                    }
  />
  <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-pink-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-pink-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-pink-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
    New Field
  </label>
</div>
                    <div
                    className="flex flex-row flex-wrap justify-center"
                    >
                        {fields.map(({name, values}, index) => (
                            <div
                            key={index}
                            className="flex flex-col  p-4 m-4"
                            >
                                <div className="flex items-center">

                                <input
                                className="font-semibold text-gray-500 text-xl"
                                value={name}
                                onChange={(e) => dispatch( changeFieldName({index:index, name: e.target.value}))}
                                >
                                </input>
                                <button
                                onClick={() => dispatch(removeField(name))}
                                className="bg-red-500 text-white px-4 py-2 rounded text-xs"
                                aria-label="Cancel"
                                >Delete Field
                                </button>
                                </div>
                                    {values.map((value, valIndex) => (
                                        <div key={valIndex} className="flex items-center mb-2 text-sm">
                                            <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => dispatch(changeValue({index: index, valIndex: valIndex, value: e.target.value}))}
                                            className="border p-2 mr-2 w-32"
                                            onKeyDown={(e) =>  handleNext(e)}
                                            />
                                            <button
                                            className="text-red-500"
                                            onClick={() => dispatch(removeValue({index: index, valIndex: valIndex}))}
                                            >
                                                <XMarkIcon
                                                className="w-4 h-4 mr-2" />
                                            </button>
                                        </div>
                                    )
                                    )}




                        </div>
                    ))}
            </div>
            <div div className="flex justify-center">
            <button
            className="bg-green-500 text-white px-4 py-2 rounded grow p-4 m-4"
            onClick={() => handleSave()}
            >
            Save
            </button>

            </div>
        </div>
    )
}

export default Settings;

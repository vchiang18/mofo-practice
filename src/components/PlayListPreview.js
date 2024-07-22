import React from "react";
import { usePractices } from "../context/PracticeContext";
import { useSelector } from "react-redux";
import { makeLabels } from "../utils";

function PlayListPreview({ limit = 0, sortOrder = "asc" }) {
  const { practices } = usePractices();

  const { fields, headers } = useSelector((state) => state.fields);
  const plays = useSelector((state) => state.plays.plays);

  // const createLabelsAndAccessors = (arr1, arr2) =>{
  //   const labels = (arr1.map(({label}) => label).concat(arr2.map(({label}) => label))).sort(sortedCallback)
  //   const accessors = (arr1.map(({name})=> name).concat(arr2.map(({name})=>name))).sort(sortedCallback)
  //   labels.push('Rep')
  //   accessors.push('rep')
  //   return [labels, accessors]
  // }

  const displayedPractices = limit ? plays.slice(-limit) : practices;

  const sortedPractices = [...displayedPractices].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );
  const labels = makeLabels(headers, fields).slice(2);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto p-4"></div>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-1.5 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {labels.map(({ label }) => (
                    <th
                      key={`th${label}`}
                      scope="col"
                      className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {sortedPractices.map((practice) => (
                  <tr
                    key={practice.id}
                    className="even:bg-gray-50 hover:bg-gray-50"
                  >
                    {labels.map(({ accessor }) => (
                      <td
                        className="py-1.5 px-3 text-xs font-normal text-gray-900"
                        key={`${accessor}${practice.id}`}
                      >
                        {typeof practice[accessor] == "object"
                          ? practice[accessor].join(", ")
                          : practice[accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PlayListPreview;

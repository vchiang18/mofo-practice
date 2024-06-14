import React, { useState, useCallback } from "react";
import { usePractices } from "../context/PracticeContext";

function PlayListSort() {
  const { practices } = usePractices();
  const [sortConfig, setSortConfig] = useState([]);

  // // single sort
  // const handleSortChange = (key) => {
  //   console.log("clicked: ", key);
  //   setSortConfig((prevSortConfig) => {
  //     console.log("prevSortConfig: ", prevSortConfig);
  //     let direction = "asc";
  //     if (prevSortConfig.key === key && prevSortConfig.direction === "asc") {
  //       direction = "desc";
  //     }
  //     return { key, direction };
  //   });
  // };

  // const getSortedPractices = (practices) => {
  //   if (!sortConfig.key) return practices;

  //   return [...practices].sort((a, b) => {
  //     const aValue = a[sortConfig.key] ?? "";
  //     const bValue = b[sortConfig.key] ?? "";

  //     if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
  //     if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
  //     return 0;
  //   });
  // };

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // multiple sort
  const handleSortChange = useCallback(
    debounce((key) => {
      setSortConfig((prevSortConfig) => {
        console.log("clicked: ", key);
        console.log("prev sort config: ", prevSortConfig);

        const existingIndex = prevSortConfig.findIndex(
          (config) => config.key === key
        );
        console.log("existing index: ", existingIndex);

        if (existingIndex >= 0) {
          const newSortConfig = [...prevSortConfig];
          console.log("initial newSortConfig: ", newSortConfig);
          newSortConfig[existingIndex].direction =
            newSortConfig[existingIndex].direction === "asc" ? "desc" : "asc";

          console.log(
            "updated direction: ",
            newSortConfig[existingIndex].direction
          );
          console.log("updated newSortConfig: ", newSortConfig);

          return newSortConfig;
        } else {
          const newSortConfig = [...prevSortConfig, { key, direction: "asc" }];
          console.log("new sort config: ", newSortConfig);
          return newSortConfig;
        }
      });
    }, 100),
    []
  );

  if (practices.length === 0) {
    return <div className="p-4">No practices recorded.</div>;
  }

  const getSortedPractices = (practices) => {
    console.log(sortConfig);
    if (sortConfig.length === 0) return practices;

    return [...practices].sort((a, b) => {
      for (const config of sortConfig) {
        const aValue = a[config.key] ?? "";
        const bValue = b[config.key] ?? "";

        if (aValue < bValue) return config.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return config.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const sortedPractices = getSortedPractices(practices);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    } else {
      return date.toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
    }
  };

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
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("practiceNo")}
                  >
                    Practice No
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("practiceDate")}
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("period")}
                  >
                    Period
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("practiceType")}
                  >
                    Practice Type
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("situation")}
                  >
                    Situation
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("rep")}
                  >
                    Rep
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("offensivePersonnel")}
                  >
                    Offensive Personnel
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("formation")}
                  >
                    Formation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("formationVariation")}
                  >
                    Formation Variation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("backfield")}
                  >
                    Backfield
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("motion")}
                  >
                    Motion
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("FIB")}
                  >
                    FIB
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("formationFamily")}
                  >
                    Formation Family
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleSortChange("unbalanced")}
                  >
                    Unbalanced
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {sortedPractices.map((practice, index) => (
                  <tr
                    key={practice.id}
                    className="even:bg-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.id}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {index + 1}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.practiceNo}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {formatDate(practice.practiceDate)}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.period}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.practiceType}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.situation}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.rep}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.offensivePersonnel}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.formation}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.formationVariation}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.backfield}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.motion}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.FIB}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.formationFamily}
                    </td>
                    <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                      {practice.unbalanced}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-sm">
              Showing {sortedPractices.length} practices
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayListSort;

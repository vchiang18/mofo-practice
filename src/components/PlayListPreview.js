import React, { useState } from "react";
import { usePractices } from "../context/PracticeContext";

function PlayList({
  limit = 0,
  sortOrder = "asc",
  showAdditionalColumns = true,
}) {
  const { practices } = usePractices();
  const [sortConfig, setSortConfig] = useState([]);
  const [filter, setFilter] = useState(null);

  if (practices.length === 0) {
    return <div className="p-4">No practices recorded.</div>;
  }
  const previewPractices = limit ? practices.slice(-limit) : practices;
  const previewPracticesDesc = [...previewPractices].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const getFilteredPractices = () => {
    if (!filter) return practices;
    return practices.filter((practice) => practice.practiceType === filter);
  };

  const handleSortChange = (key) => {
    console.log("clicked: ", key);
    setSortConfig((prevSortConfig) => {
      let direction = "asc";
      if (prevSortConfig.key === key && prevSortConfig.direction === "asc") {
        direction = "desc";
      }
      return { key, direction };
    });
  };

  const getSortedPractices = (practices) => {
    if (!sortConfig.key) return practices;

    return [...practices].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredPractices = getFilteredPractices();
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
          <button onClick={() => handleFilterChange("7x7")} className="mr-2">
            7x7
          </button>
          <button onClick={() => handleFilterChange("Blitz")}>Blitz</button>

          <div className="inline-block min-w-full py-1.5 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {showAdditionalColumns && (
                    <>
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
                    </>
                  )}
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
                {/* {previewPracticesDesc.map((practice) => ( */}
                {/* {sortedPractices.map((practice) => ( */}
                {sortedPractices.map((practice) => (
                  <tr
                    key={practice.id}
                    className="even:bg-gray-50 hover:bg-gray-50"
                  >
                    {showAdditionalColumns && (
                      <>
                        <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                          {practice.practiceNo}
                        </td>
                        <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                          {formatDate(practice.practiceDate)}
                        </td>
                      </>
                    )}
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
            {/* <div className="mt-2 text-sm">
              Showing {filteredPractices.length} practices{" "}
            </div> */}
            {/* <div className="mt-2 text-sm">
              Showing {sortedPractices.length} practices{" "}
            </div> */}
            <div className="mt-2 text-sm">
              Showing {sortedPractices.length} practices{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayList;

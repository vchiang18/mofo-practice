import React from "react";
import { usePractices } from "../context/PracticeContext";

function PlayList({
  limit = 0,
  sortOrder = "asc",
  showAdditionalColumns = true,
}) {
  const { practices } = usePractices();

  if (practices.length === 0) {
    return <div className="p-4">No practices recorded.</div>;
  }

  const displayedPractices = limit ? practices.slice(-limit) : practices;

  const sortedPractices = [...displayedPractices].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );

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
                  {showAdditionalColumns && (
                    <>
                      <th
                        scope="col"
                        className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500"
                      >
                        Practice No
                      </th>
                      <th
                        scope="col"
                        className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500"
                      >
                        Date
                      </th>
                    </>
                  )}
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500"
                  >
                    Period
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500"
                  >
                    Practice Type
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500"
                  >
                    Situation
                  </th>
                  <th
                    scope="col"
                    className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500"
                  >
                    Rep
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    Offensive Personnel
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    Formation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    Formation Variation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    Backfield
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    Motion
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    FIB
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    Formation Family
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                  >
                    Unbalanced
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayList;

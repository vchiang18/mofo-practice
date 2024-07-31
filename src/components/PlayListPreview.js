import React from "react";
import { usePractices } from "../context/PracticeContext";
import { initialSelections } from "./PlayEntry";

export const displayNames = {
  offensivePersonnel: "Offensive Personnel",
  formation: "Formation",
  formationVariation: "Formation Variation",
  backfield: "Backfield",
  motion: "Motion",
  FIB: "FIB",
  formationFamily: "Formation Family",
  unbalanced: "Unbalanced",
  bdryCov: "Bdry Cov",
  fieldCov: "Field Cov",
  passResult: "Pass Result",
  defCov: "Defensive Cov",
  playCall: "Play Call",
};

function PlayListPreview({ limit = 0, sortOrder = "asc" }) {
  const { practices } = usePractices();

  if (practices.length === 0) {
    return <div className="p-4">No practices recorded.</div>;
  }

  const displayedPractices = limit ? practices.slice(-limit) : practices;

  const sortedPractices = [...displayedPractices].sort((a, b) =>
    sortOrder === "asc" ? a.id - b.id : b.id - a.id
  );

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
                  {Object.keys(initialSelections).map((key) => (
                    <th
                      key={key}
                      scope="col"
                      className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500"
                    >
                      {displayNames[key]}
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
                    {Object.keys(initialSelections).map((key) => (
                      <td
                        key={key}
                        className="py-1.5 px-3 text-xs font-normal text-gray-900"
                      >
                        {practice[key]}
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

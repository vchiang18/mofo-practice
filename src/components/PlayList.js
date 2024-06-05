import React from "react";
import { usePractices } from "../context/PracticeContext";

function PlayList() {
  const { practices } = usePractices();

  if (practices.length === 0) {
    return <div className="p-4">No practices recorded.</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto p-4">
          <h2 className="text-l font-bold">Play List</h2>
        </div>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-3"
                  >
                    Period
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-3"
                  >
                    Practice Type
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-500 sm:pl-3"
                  >
                    Rep
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    Offensive Personnel
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    Formation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    Formation Variation
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    Backfield
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    Motion
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    FIB
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    Formation Family
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-500"
                  >
                    Unbalanced
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {practices.map((practice) => (
                  <tr
                    key={practice.id}
                    className="even:bg-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.period}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.practiceType}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.rep}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.offensivePersonnel}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.formation}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.formationVariation}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.backfield}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.motion}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.fib}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
                      {practice.formationFamily}
                    </td>
                    <td className="whitespace-nowrap py-1 pl-1 pr-2 text-sm font-normal text-gray-900 sm:pl-2">
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

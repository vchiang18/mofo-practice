import React, { useState } from "react";
import { useSelector } from "react-redux";

export const PlayListColumns = () => {
  const { fields, headers } = useSelector((state) => state.fields);

  const concatField = {
    label: "cHudl Call",
    name: "cHudlCall",
    accessor: (row) => {
      const values = [row.movement, row.front, row.hudCall].filter(Boolean);
      return values.join(" ");
    },
  };

  const allFields = [
    { label: "#", name: "id" },
    { label: "Practice No", name: "practiceNo" },
    { label: "Date", name: "practiceDate" },
  ]
    .concat(headers)
    .concat([{ label: "Rep", name: "rep" }])
    .concat(fields)
    .concat(concatField);

  return allFields.map((x) => {
    return {
      label: x.label,
      accessor: x.accessor || x.name,
      multiselect: x.multiselect || false,
    };
  });
};

function PlayList() {
  // const { practices } = usePractices();

  const [sortConfig, setSortConfig] = useState([]);

  const practices = useSelector((state) => state.plays.plays);
  const columns = PlayListColumns();

  const handleSortChange = (key) => {
    setSortConfig((prevSortConfig) => {
      const existingIndex = prevSortConfig.findIndex(
        (config) => config.key === key
      );

      if (existingIndex >= 0) {
        const newSortConfig = [...prevSortConfig];
        newSortConfig[existingIndex].direction =
          newSortConfig[existingIndex].direction === "asc" ? "desc" : "asc";

        return newSortConfig;
      } else {
        const newSortConfig = [...prevSortConfig, { key, direction: "asc" }];
        return newSortConfig;
      }
    });
  };

  if (practices.length === 0) {
    return <div className="p-4">No practices recorded.</div>;
  }

  const getSortedPractices = (practices) => {
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

  const handleClearSort = () => {
    setSortConfig([]);
  };

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

  const formatKeyName = (key) => {
    if (key === "FIB") {
      return "FSL(FIB)";
    } else {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex sm:items-center justify-center">
        <div className="flex items-center justify-center p-4">
          <span className="mr-4 text-xs">Sort Selections: </span>

          <div className="mr-4 text-xs">
            {sortConfig.map((config, index) => (
              <div key={index}>{formatKeyName(config.key)},</div>
            ))}
          </div>
          <button
            onClick={handleClearSort}
            className="mr-4 py-1 px-1 text-xs rounded bg-blue-gradient text-white"
          >
            Clear Sort
          </button>
        </div>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-1.5 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  {columns.map(({ label, accessor }, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="py-1.5 px-3 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                      onClick={() => handleSortChange(accessor)}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {sortedPractices.map((practice, index) => (
                  <tr
                    key={practice.id}
                    className="even:bg-gray-50 hover:bg-gray-50"
                  >
                    {columns.map(({ accessor }) => (
                      <td className="py-1.5 px-3 text-xs font-normal text-gray-900">
                        {typeof accessor === "function"
                          ? accessor(practice)
                          : accessor === "practiceDate"
                          ? formatDate(practice[accessor])
                          : typeof practice[accessor] === "object"
                          ? practice[accessor].join(", ")
                          : practice[accessor]}
                      </td>
                    ))}
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

export default PlayList;

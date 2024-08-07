import React, { useState } from "react";
import { usePractices } from "../context/PracticeContext";
import { useSelector } from "react-redux";

function PlayListFilter() {
  // const { practices } = usePractices();
  const practices = useSelector((state) => state.plays.plays)
  const [selectedFilters, setSelectedFilters] = useState(null);

  if (practices.length === 0) {
    return <div className="p-4">No practices recorded.</div>;
  }

  const handleFilterChange = (column, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  const getUniqueValues = (column) => {
    return [
      ...new Set(
        practices
          .map((practice) => practice[column])
          .filter((value) => value !== null && value !== undefined)
      ),
    ];
  };

  const filteredPractices = practices.filter((practice) =>
    Object.entries(selectedFilters).every(
      ([column, value]) => value === null || practice[column] === value
    )
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
        <div className="inline-block min-w-full py-1.5 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                {[
                  "practiceNo",
                  "practiceDate",
                  "period",
                  "practiceType",
                  "situation",
                  "rep",
                  "offensivePersonnel",
                  "formation",
                  "formationVariation",
                  "backfield",
                  "motion",
                  "FIB",
                  "formationFamily",
                  "unbalanced",
                ].map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-3 py-1.5 text-left text-xs font-semibold text-gray-500 cursor-pointer"
                    onClick={() => handleFilterChange(column, null)}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPractices.map((practice) => (
                <tr key={practice.id}>
                  {Object.entries(practice).map(([key, value]) => (
                    <td
                      key={key}
                      className="px-3 py-1.5 text-left text-xs"
                      onClick={() => handleFilterChange(key, value)}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-sm">
            Showing {filteredPractices.length} practices{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayListFilter;

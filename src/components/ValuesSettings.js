import React, { useEffect } from "react";
import { useValues } from "../context/ValuesContext";
import ValuesColumn from "./ValuesColumn";

const ValueSettings = () => {
  const { values, fetchValues, addValue, updateValues2 } = useValues();

  useEffect(() => {
    fetchValues();
  }, []);

  useEffect(() => {
    console.log(values);
  }, [values]);

  const columns = Object.keys(values);

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {columns.map((column) => (
        <ValuesColumn
          key={column}
          column={formatKeyName(column)}
          updateValues2={updateValues2}
          addValue={addValue}
        />
      ))}
    </div>
  );
};

export default ValueSettings;

// import React, { useState, useEffect } from "react";
// import { useValues } from "../context/ValuesContext";
// import PeriodTypeSelector from "./PeriodTypeSelector";
// import ColumnValues from "./ValuesColumn";

// const ValuesSettings = () => {
//   const { values, updateValues2, deleteValue2, addValue, fetchValues } =
//     useValues();
//   const columns = Object.keys(values);

//   useEffect(() => {
//     fetchValues();
//   }, []);

//   useEffect(() => {
//     console.log(values);
//   }, [values]);

//   const formatKeyName = (key) => {
//     if (key === "FIB") {
//       return "FSL(FIB)";
//     } else {
//       return key
//         .replace(/([A-Z])/g, " $1")
//         .replace(/^./, (str) => str.toUpperCase());
//     }
//   };

//   return (
//     <div className="flex gap-4">
//       {columns.map((column) => (
//         <ColumnValues
//           key={column}
//           column={formatKeyName(column)}
//           values={values[column] || []}
//           updateValues={updateValues2}
//           //   deleteValue={deleteValue2}
//           addValue={addValue}
//         />
//       ))}
//     </div>
//   );
// };

// export default ValuesSettings;

{
  /* <table className="table-auto w-full">
<thead>
  <tr>
    {columns.map((column) => (
      <th
        key={column}
        className="py-2 px-4 rounded mx-2 cursor-pointer"
      >
        {formatKeyName(column)}
      </th>
    ))}
  </tr>
</thead>
<tbody>
  {Array.from({
    length: Math.max(...columns.map((col) => values[col].length)),
  }).map((_, rowIndex) => (
    <tr key={rowIndex}>
      {columns.map((column) => (
        <td key={column + rowIndex} className="p-2">
          {values[column][rowIndex] !== undefined ? (
            <>
              <input
                type="text"
                value={values[column][rowIndex]}
                onChange={(e) =>
                  updateValues(column, rowIndex, e.target.value)
                }
                className="border p-2 w-full"
              />
              <span
                onClick={() => deleteValue(column, rowIndex)}
                className="ml-2 text-red-300 text-xs hover:text-red-600 cursor-pointer"
              >
                Delete
              </span>
            </>
          ) : (
            rowIndex === values[column].length && (
              <input
                type="text"
                placeholder={`Add new ${formatKeyName(column)}`}
                onChange={(e) =>
                  updateValues(column, -1, e.target.value)
                }
                className="border p-2 w-full"
              />
            )
          )}
        </td>
      ))}
    </tr>
  ))}
</tbody>
</table>
<div></div> */
}

import React, { useState, useEffect } from "react";
import { useValues } from "../context/ValuesContext";

const ValuesColumn = ({ column, updateValues2, deleteValue2 }) => {
  const [newValue, setNewValue] = useState("");
  const { values, addValue, fetchValues } = useValues();

  useEffect(() => {
    fetchValues();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addValue(column, newValue);
      console.log("new value added: ", newValue);
      setNewValue("");
    }
  };

  const handleAddClick = () => {
    addValue(column, newValue);
    setNewValue("");
  };

  return (
    <div>
      <h3 className="font-bold text-lg">{column}</h3>
      {values[column]?.map((value, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={value}
            onChange={(e) => updateValues2(column, index, e.target.value)}
            className="border p-2 w-full mr-2"
          />
          {/* <button
            onClick={() => deleteValue2(column, index)}
            className="text-red-500"
          >
            Delete
          </button> */}
        </div>
      ))}
      <div className="p-2 flex items-center">
        <input
          type="text"
          placeholder={`Add new ${column}`}
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border p-2 w-full mr-2"
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddClick} className="bg-blue-500 text-white p-2">
          Add
        </button>
      </div>
    </div>
  );
};

export default ValuesColumn;

// import React, { useState, useEffect } from "react";
// import { useValues } from "../context/ValuesContext";

// const ColumnValues = ({ column, updateValues2, deleteValue2 }) => {
//   const [newValue, setNewValue] = useState("");
//   const { values, addValue, fetchValues } = useValues();

//   useEffect(() => {
//     fetchValues();
//   }, []);

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       addValue(column, newValue);
//       console.log("new value added: ", newValue);
//       setNewValue("");
//     }
//   };

//   const handleAddClick = () => {
//     addValue(column, newValue);
//     setNewValue("");
//   };

//   return (
//     <div>
//       <h3 className="font-bold text-lg">{column}</h3>
//       {values[column]?.map((value, index) => (
//         <div key={index} className="flex items-center mb-2">
//           <input
//             type="text"
//             value={value}
//             onChange={(e) => updateValues2(column, index, e.target.value)}
//             className="border p-2 w-full mr-2"
//           />
//           {/* <button
//             onClick={() => deleteValue2(column, index)}
//             className="text-red-500"
//           >
//             Delete
//           </button> */}
//         </div>
//       ))}
//       <div className="p-2 flex items-center">
//         <input
//           type="text"
//           placeholder={`Add new ${column}`}
//           value={newValue}
//           onChange={(e) => setNewValue(e.target.value)}
//           className="border p-2 w-full mr-2"
//           onKeyDown={handleKeyDown}
//         />
//         <button onClick={handleAddClick} className="bg-blue-500 text-white p-2">
//           Add
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ColumnValues;

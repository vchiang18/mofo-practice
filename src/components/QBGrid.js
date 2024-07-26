import React from "react";
import FieldPosition from "./FieldPosition";

const QBGrid = () => {
  const field = ["Left", "Middle", "Right"];

  return (
    <div className="flex">
      {field.map((field) => (
        <div key={field} className="w-full mb-4">
          <div className="my-2">{field}</div>
          <FieldPosition field={field} className="" />
        </div>
      ))}
    </div>
  );
};

export default QBGrid;

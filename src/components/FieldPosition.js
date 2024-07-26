import React from "react";
import BodyPosition from "./BodyPosition";

const FieldPosition = ({ field }) => {
  const bodies = ["leftBody", "middleBody", "rightBody"];

  return (
    <div className="flex">
      {bodies.map((body) => (
        <BodyPosition key={body} field={field} body={body} />
      ))}
    </div>
  );
};

export default FieldPosition;

import React, { useEffect } from "react";
import Counter from "./Counter";
import { useMetrics } from "../context/CatchContext";

const BodyPosition = ({ field, body }) => {
  const { metrics, updateMetric } = useMetrics();
  const positions = ["R1", "R2", "R3", "R4"];
  console.log("BodyPosition props:", { field, body });

  const handleChange = (position, type, value) => {
    updateMetric(field, body, position, { [type]: parseInt(value) });
  };

  const handleClick = (position, type, value) => {
    updateMetric(field, body, position, { [type]: parseInt(value) });
  };

  useEffect(() => {
    console.log("Metrics in BodyPosition: ", metrics);
  }, [metrics]);

  if (!metrics[field] || !metrics[field][body]) {
    return <div>Invalid field or body</div>;
  }

  return (
    <div className="text-xs">
      {positions.map((position) => (
        <div key={position} className="p-2">
          <button
            className="rounded bg-blue-gradient text-white p-4"
            onClick={handleClick}
          >
            {`${body} ${position}`}
            {/* <input
              type="number"
              value={metrics[field][body][position]?.numerator || 0}
              onChange={(e) =>
                handleChange(position, "numerator", e.target.value)
              }
            /> */}
          </button>
          {/* <label>
            {`${body} ${position} - Denominator:`}
            <input
              type="number"
              value={metrics[field][body][position]?.denominator || 0}
              onChange={(e) =>
                handleChange(position, "denominator", e.target.value)
              }
            />
          </label> */}
        </div>
      ))}
    </div>
  );
};

export default BodyPosition;

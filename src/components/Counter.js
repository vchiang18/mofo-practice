import React, { useState } from "react";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };

  return (
    <button className="rounded bg-gray" onClick={handleClick}>
      {counter}
    </button>
  );
};

export default Counter;

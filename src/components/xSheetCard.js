// displays period, type, notes? —
// and a link that goes to play entry with the pairings filled out

import React from "react";

const SheetCard = ({ period, practiceType, situation }) => {
  // const handleSelection = (period, practiceType, situation) => {
  //   // go to play entry w selections
  // };

  return (
    // <div
    //   className={`w-[328px] h-[156px] relative bg-white bg-opacity-100 rounded-xl shadow text-grey ${className}`}
    // >
    <div className="w-[328px] h-[156px] relative bg-white/opacity-0 rounded-xl shadow text-grey">
      <h1 className="text-sky-600 text-[40px] font-semibold leading-tight p-2">
        {period}
      </h1>
      <div className="p-2 text-neutral-800 text-base font-semibold">
        <span>{practiceType}</span>
      </div>
      <div className="p-2 text-neutral-800 text-base">
        <span>{situation}</span>
      </div>
    </div>
  );
};

export default SheetCard;

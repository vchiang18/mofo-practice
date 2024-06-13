import React, { useEffect } from "react";
import { usePeriodPairings } from "../context/PeriodPairingsContext";
import SheetCard from "./SheetCard";

const SheetsView = () => {
  const { periodPairings, fetchPairings } = usePeriodPairings();

  return (
    <div className="flex ml-4">
      <div className="flex flex-wrap space-x-4 space-y-4">
        {periodPairings.map((pairing) => (
          <SheetCard
            key={pairing.id}
            period={pairing.period}
            practiceType={pairing.practiceType}
            situation={pairing.situation}
          />
        ))}
      </div>
    </div>
  );
};

export default SheetsView;

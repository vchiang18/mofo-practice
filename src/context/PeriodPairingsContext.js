import React, { createContext, useContext, useState, useEffect } from "react";
import db from "../db";

const PeriodPairingsContext = createContext();

export function PeriodPairingsProvider({ children }) {
  const [periodPairings, setPeriodPairings] = useState([]);

  const fetchPairings = async () => {
    try {
      const allPairings = await db.periodPairings.toArray();
      setPeriodPairings(allPairings);
    } catch (error) {
      console.error("Failed to fetch period pairings", error);
    }
  };

  const addOrUpdatePairing = async (period, practiceType, situation) => {
    let existingPairing = await db.periodPairings
      .where("[period+practiceType+situation]")
      .equals([period, practiceType, situation])
      .first();

    if (existingPairing) {
      await db.periodPairings.update(existingPairing.id, {
        period,
        practiceType,
        situation,
      });
    } else {
      await db.periodPairings.add({ period, practiceType, situation });
    }

    fetchPairings();
  };

  const deletePairing = async (id) => {
    try {
      await db.periodPairings.delete(id);
      const allPairings = await db.periodPairings.toArray();
      setPeriodPairings(allPairings);
    } catch (error) {
      console.error("Failed to delete pairing", error);
    }
  };

  useEffect(() => {
    fetchPairings();
  }, []);

  return (
    <PeriodPairingsContext.Provider
      value={{
        periodPairings,
        fetchPairings,
        addOrUpdatePairing,
        deletePairing,
      }}
    >
      {children}
    </PeriodPairingsContext.Provider>
  );
}

export const usePeriodPairings = () => useContext(PeriodPairingsContext);

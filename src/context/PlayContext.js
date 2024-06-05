import React, { createContext, useContext, useState, useEffect } from "react";
import db from "../db";

const PlayContext = createContext();

export function PlayProvider({ children }) {
  const [playSelections, setPlaySelections] = useState([]);

  const savePlaySelections = (selections) => {
    setPlaySelections(selections);
  };

  return (
    <PlayContext.Provider value={{ playSelections, savePlaySelections }}>
      {children}
    </PlayContext.Provider>
  );
}

export const usePlaySelections = () => useContext(PlayContext);

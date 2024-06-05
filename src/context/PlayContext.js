import React, { createContext, useContext, useState } from "react";

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

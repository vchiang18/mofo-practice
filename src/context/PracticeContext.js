import React, { createContext, useContext, useEffect, useState } from "react";
import db from "../db";

const PracticeContext = createContext();

export function PracticeProvider({ children }) {
  const [practices, setPractices] = useState([]);
  const [settings, setSettings] = useState({
    practiceNo: "",
    practiceDate: "",
    period: 1,
    type: "",
    rep: 1,
    situation: "",
  });
  const [headings, setHeadings] = useState({
    practiceNo: "",
    practiceDate: null,
  });

  useEffect(() => {
    const fetchPractices = async () => {
      try {
        const allPractices = await db.practices.toArray();
        setPractices(allPractices);
      } catch (error) {
        console.error("Failed to fetch practices", error);
      }
    };
    fetchPractices();
  }, []);

  const addPractice = async (practice, settings) => {
    const practiceData = {
      ...practice,
      ...settings,
    };
    try {
      await db.practices.add(practiceData);
      const allPractices = await db.practices.toArray();
      setPractices(allPractices);
    } catch (error) {
      console.error("Failed to add practice", error);
    }
  };

  const deletePractice = async (id) => {
    try {
      await db.practices.delete(id);
      const allPractices = await db.practices.toArray();
      setPractices(allPractices);
    } catch (error) {
      console.error("Failed to delete practice: ", error);
    }
  };

  async function fetchPracticesForExport() {
    return await db.practices.toArray();
  }

  const clearPractices = async () => {
    try {
      await db.practices.clear();
      setPractices([]);
    } catch (error) {
      console.error("Failed to clear practices: ", error);
    }
  };

  const updateSettings = (newSettings) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      ...newSettings,
    }));
  };

  const updateHeadings = (newHeadings) => {
    setHeadings((prevHeadings) => ({
      ...prevHeadings,
      ...newHeadings,
    }));
  };

  return (
    <PracticeContext.Provider
      value={{
        practices,
        addPractice,
        deletePractice,
        fetchPracticesForExport,
        clearPractices,
        settings,
        updateSettings,
        headings,
        updateHeadings,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractices() {
  const context = useContext(PracticeContext);
  if (!context) {
    throw new Error("usePractices must be used within a PracticeProvider");
  }
  return context;
}

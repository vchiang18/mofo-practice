import React, { createContext, useContext, useState, useEffect } from "react";
import db from "../db";

const ValuesContext = createContext();

const defaultValues = {
  offensivePersonnel: ["10", "11", "12", "21", "22"],
  formation: ["Spread Right", "Spread Left", "3x1", "2x2", "Empty"],
  formationVariation: ["Right", "Left"],
  backfield: ["Left", "Middle", "Right"],
  motion: ["Z-Fly", "H-Jet"],
  FIB: ["Field", "Boundary", "Home", "Away"],
  formationFamily: ["Compton", "Houston", "Crunch", "Cab"],
  unbalanced: ["Yes", "No"],
  practiceType: ["7x7", "Blitz", "Team"],
};

export function ValuesProvider({ children }) {
  const [values, setValues] = useState(defaultValues);

  const fetchValues = async () => {
    const storedValues = { ...defaultValues };
    const keys = Object.keys(defaultValues);
    for (const key of keys) {
      const value = await db.metricValues.get(key);
      if (value) {
        storedValues[key] = value.value;
      } else {
        storedValues[key] = defaultValues[key];
      }
    }
    setValues(storedValues);
  };

  useEffect(() => {
    fetchValues();
  }, []);

  const updateValues = async (field, values) => {
    await db.metricValues.put({ key: field, value: values });
    setValues((prevValues) => ({
      ...prevValues,
      [field]: values,
    }));
  };

  const deleteValue = async (field, valueToDelete) => {
    try {
      const updatedValues = values[field].filter(
        (value) => value !== valueToDelete
      );
      await db.metricValues.put({ key: field, value: updatedValues });
      setValues((prevValues) => ({
        ...prevValues,
        [field]: updatedValues,
      }));
    } catch (error) {
      console.error("Failed to delete value: ", error);
    }
  };

  return (
    <ValuesContext.Provider
      value={{ values, updateValues, fetchValues, deleteValue }}
    >
      {children}
    </ValuesContext.Provider>
  );
}

export const useValues = () => useContext(ValuesContext);

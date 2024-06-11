import React, { createContext, useContext, useState, useEffect } from "react";
import db from "../db";

const ValuesContext = createContext();

const defaultValues = {
  offensivePersonnel: ["10", "11", "12", "21", "22"],
  formation: ["SPREAD RT", "TREY", "TRIO", "TRIPS"],
  formationVariation: ["OFF", "BLANK", "FLEX"],
  backfield: ["GUN", "PISTOL", "RIGHT", "LEFT"],
  motion: ["ZIP", "RIP", "LIP", "Z-JET"],
  FIB: ["X", "BLANK"],
  formationFamily: ["Compton", "Houston", "Crunch", "Cab"],
  unbalanced: ["BLANK", "X"],
  practiceType: ["7x7", "Blitz", "Team"],
  period: [1, 2, 3, 4, 5, 6, 7, 8],
  situation: ["None", "A", "B", "C"],
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

  const addValue = async (field, newValue) => {
    if (newValue.trim()) {
      const updatedValues = { ...values };
      updatedValues[field] = [...(updatedValues[field] || []), newValue];
      await db.metricValues.put({ key: field, value: updatedValues[field] });
      setValues(updatedValues);
    }
  };

  const updateValues = async (field, index, newValue) => {
    const updatedValues = { ...values };

    if (index === -1) {
      // add new value
      updatedValues[field] = [...(updatedValues[field] || []), newValue];
    } else {
      // update existing value
      updatedValues[field][index] = newValue;
    }

    await db.metricValues.put({ key: field, value: updatedValues[field] });
    setValues(updatedValues);
  };

  // update values with old settings
  // const updateValues = async (field, values) => {
  //   await db.metricValues.put({ key: field, value: values });
  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     [field]: values,
  //   }));
  // };

  const deleteValue = async (field, index) => {
    const updatedValues = { ...values };
    updatedValues[field].splice(index, 1);

    await db.metricValues.put({ key: field, value: updatedValues[field] });
    setValues(updatedValues);
  };

  // delete value with old settings
  // const deleteValue = async (field, valueToDelete) => {
  //   try {
  //     const updatedValues = values[field].filter(
  //       (value) => value !== valueToDelete
  //     );
  //     await db.metricValues.put({ key: field, value: updatedValues });
  //     setValues((prevValues) => ({
  //       ...prevValues,
  //       [field]: updatedValues,
  //     }));
  //   } catch (error) {
  //     console.error("Failed to delete value: ", error);
  //   }
  // };

  return (
    <ValuesContext.Provider
      value={{
        values,
        updateValues,
        fetchValues,
        deleteValue,
        addValue,
      }}
    >
      {children}
    </ValuesContext.Provider>
  );
}

export const useValues = () => useContext(ValuesContext);

import React, { createContext, useContext, useState, useEffect } from "react";
import db from "../db";

const initialMetrics = {
  Left: {
    leftBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
    middleBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
    rightBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
  },
  Middle: {
    leftBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
    middleBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
    rightBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
  },
  Right: {
    leftBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
    middleBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
    rightBody: {
      R4: 0,
      R3: 0,
      R2: 0,
      R1: 0,
    },
  },
  //   leftField: {
  //     leftBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //     middleBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //     rightBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //   },
  //   middleField: {
  //     leftBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //     middleBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //     rightBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //   },
  //   rightField: {
  //     leftBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //     middleBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //     rightBody: {
  //       R4: { numerator: 0, denominator: 0 },
  //       R3: { numerator: 0, denominator: 0 },
  //       R2: { numerator: 0, denominator: 0 },
  //       R1: { numerator: 0, denominator: 0 },
  //     },
  //   },
};

const CatchContext = createContext();

export const CatchProvider = ({ children }) => {
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    console.log("Metrics in provider:", metrics);
  }, [metrics]);

  const updateMetric = (field, body, position, newValues) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      [field]: {
        ...prevMetrics[field],
        [body]: {
          ...prevMetrics[field][body],
          [position]: {
            numerator:
              newValues.numerator !== undefined
                ? newValues.numerator
                : prevMetrics[field][body][position].numerator,
            denominator:
              newValues.denominator !== undefined
                ? newValues.denominator
                : prevMetrics[field][body][position].denominator,
          },
        },
      },
    }));
  };

  return (
    <CatchContext.Provider value={{ metrics, updateMetric }}>
      {children}
    </CatchContext.Provider>
  );
};

export const useMetrics = () => useContext(CatchContext);

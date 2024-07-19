import { createSlice } from "@reduxjs/toolkit";
import { storageAvailable } from "../../utils";

const autoSave = (state) => {
  let storage = storageAvailable();
  if (storage) {
    localStorage.setItem("fields", JSON.stringify(state));
  } else {
    return storage;
  }
};

const initialState = localStorage.getItem("fields")
  ? JSON.parse(localStorage.getItem("fields"))
  : {
      fields: [
        {
          label: "OFF Personnel",
          values: ["1", "11", "12", "21", "22", ""],
          name: "offPersonnel",
          multiselect: true,
        },
        {
          label: "Formation",
          values: ["SPREAD RT", "TREY", "TRIO", "TRIPS", ""],
          name: "formation",
          multiselect: false,
        },
        {
          label: "Formation Variation",
          values: ["OFF", "BLANK", "FLEX", ""],
          name: "formationVariation",
          multiselect: true,
        },
        {
          label: "Backfield",
          values: ["GUN", "PISTOL", "RIGHT", "LEFT", ""],
          name: "backfield",
          multiselect: false,
        },
        {
          label: "Motion",
          values: ["ZIP", "RIP", "LIP", "Z-JET", ""],
          name: "motion",
          multiselect: false,
        },
        {
          label: "FIB",
          values: ["X", "BLANK", ""],
          name: "fib",
          multiselect: false,
        },
        {
          label: "Formation Family",
          values: ["COMPTON", "HOUSTON", "CRUNCH", "CAB", ""],
          name: "formationFamily",
          multiselect: false,
        },
        {
          label: "Unbalanced",
          values: ["BLANK", "X", ""],
          name: "unbalanced",
          multiselect: false,
        },
      ],
      headers: [
        { name: "period", values: [1, 2, 3, 4, 5, 6, 7, 8], label: "Period" },
        {
          name: "type",
          values: ["None", "7x7", "Blitz", "Team"],
          label: "Type",
        },
        {
          name: "situation",
          values: ["None", "A", "B", "C"],
          label: "Situation",
        },
      ],
    };

export const fieldsSlice = createSlice({
  name: "fields",
  initialState: initialState,
  reducers: {
    addField: (state, action) => {
      state.fields.push({
        name: action.payload,
        values: [""],
        accessor: action.payload
          .toLowerCase()
          .split(" ")
          .flatMap((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(""),
        multiselect: false,
      });
      autoSave(state);
    },
    removeField: (state, action) => {
      state.fields = state.fields.filter(
        (field) => field.name !== action.payload
      );
      autoSave(state);
    },
    changeFieldName: (state, action) => {
      state.fields[action.payload.index].name = action.payload.name;
      state.fields[action.payload.index].accessor = action.payload.name
        .toLowerCase()
        .split(" ")
        .flatMap((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
      autoSave(state);
    },
    removeValue: (state, action) => {
      const field = state.fields[action.payload.index];
      field.values.splice(action.payload.valIndex, 1);
      if (field.values.length === 0) {
        field.values.push("");
      }
      autoSave(state);
    },
    changeValue: (state, action) => {
      const field = state.fields[action.payload.index];
      const valIndex = action.payload.valIndex;
      field.values[valIndex] = action.payload.value;
      const lastValue = field.values[field.values.length - 1];
      if (lastValue !== "") {
        field.values.push("");
      }
      autoSave(state);
    },
    swapIndex: (state, action) => {
      const { index, newIndex } = action.payload;
      let fields = state.fields;
      [fields[index], fields[newIndex]] = [fields[newIndex], fields[index]];
    },
    toggleMutliselect: (state, action) => {
      const target = action.payload.index;
      const multi = state.fields[target].multiselect;
      state.fields[target].multiselect = !multi;
      autoSave(state);
    },
  },
});

export const {
  addField,
  removeField,
  changeFieldName,
  removeValue,
  changeValue,
  swapIndex,
  toggleMutliselect,
} = fieldsSlice.actions;

export default fieldsSlice.reducer;

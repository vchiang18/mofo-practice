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
          label: "Player Particip",
          values: [
            "7",
            "39",
            "43",
            "44",
            "47",
            "51",
            "55",
            "58",
            "59",
            "91",
            "92",
            "93",
            "94",
            "95",
            "96",
            "98",
            "99",
          ],
          name: "playerParticipation",
          multiselect: true,
        },
        {
          label: "Unit",
          values: ["1", "2", "3", "4", ""],
          name: "unit",
          multiselect: false,
        },
        {
          label: "Def Personnel",
          values: ["TIGER", "HIPPO", "ELEPHANT", ""],
          name: "defPersonnel",
          multiselect: false,
        },
        {
          label: "Movement",
          values: ["STEM", "JUMP", "PULL", ""],
          name: "movement",
          multiselect: false,
        },
        {
          label: "Front",
          values: [
            "BACK",
            "BENCH",
            "FIELD",
            "FLOAT",
            "JET",
            "LOAD",
            "MONSTER",
            "MITE",
            "OGRE",
            "SHOW",
            "SPLIT",
            "TITE",
            "UNDER",
            "",
          ],
          name: "front",
          multiselect: false,
        },
        {
          label: "Stunt",
          values: [
            "AIM",
            "CHARGE",
            "COVER ME",
            "DBL EX",
            "EX",
            "FRANKIE",
            "GAMES",
            "NUT",
            "PESTO",
            "SHOVE",
            "STRAIGHT",
            "TEX",
            "TEXAS",
            "TWIST",
            "VEGAS",
            "",
          ],
          name: "stunt",
          multiselect: false,
        },
        {
          label: "Hud Call",
          values: [
            "4",
            "6",
            "BAMA",
            "BAIT",
            "BLACK",
            "DAGGER",
            "ERIN",
            "FIRE",
            "FOUTS",
            "FRESNO",
            "FUSION",
            "GEORGIA",
            "MAMBA",
            "NINA",
            "PEARL",
            "QUAKE",
            "RED",
            "RILEY",
            "RODMAN",
            "SCRAPE FIAT",
            "SHELLY",
            "SHOCK FIAT",
            "SMOKE",
            "STONE",
            "TIDE",
            "WHAM",
            "WHITE",
            "",
          ],
          name: "hudCall",
          multiselect: false,
        },

        //   {
        //     label: "OFF Personnel",
        //     values: ["1", "11", "12", "21", "22", ""],
        //     name: "offPersonnel",
        //     multiselect: true,
        //   },
        //   {
        //     label: "Formation",
        //     values: ["SPREAD RT", "TREY", "TRIO", "TRIPS", ""],
        //     name: "formation",
        //     multiselect: false,
        //   },
        //   {
        //     label: "Formation Variation",
        //     values: ["OFF", "BLANK", "FLEX", ""],
        //     name: "formationVariation",
        //     multiselect: true,
        //   },
        //   {
        //     label: "Backfield",
        //     values: ["GUN", "PISTOL", "RIGHT", "LEFT", ""],
        //     name: "backfield",
        //     multiselect: false,
        //   },
        //   {
        //     label: "Motion",
        //     values: ["ZIP", "RIP", "LIP", "Z-JET", ""],
        //     name: "motion",
        //     multiselect: false,
        //   },
        //   {
        //     label: "FIB",
        //     values: ["X", "BLANK", ""],
        //     name: "fib",
        //     multiselect: false,
        //   },
        //   {
        //     label: "Formation Family",
        //     values: ["COMPTON", "HOUSTON", "CRUNCH", "CAB", ""],
        //     name: "formationFamily",
        //     multiselect: false,
        //   },
        //   {
        //     label: "Unbalanced",
        //     values: ["BLANK", "X", ""],
        //     name: "unbalanced",
        //     multiselect: false,
        //   },
        // ],
        // headers: [
        //   {
        //     name: "period",
        //     values: [1, 2, 3, 4, 5, 6, 7, 8, ""],
        //     label: "Period",
        //   },
        //   {
        //     name: "practiceType",
        //     values: ["None", "7x7", "Blitz", "Team", ""],
        //     label: "Type",
        //   },
        //   {
        //     name: "situation",
        //     values: ["None", "A", "B", "C", ""],
        //     label: "Situation",
        //   },
      ],
      headers: [
        {
          name: "period",
          values: [1, 2, 3, 4, 5, 6, 7, 8, ""],
          label: "Period",
        },
        {
          name: "practiceType",
          values: ["None", "7x7", "Blitz", "Team", ""],
          label: "Type",
        },
        {
          name: "situation",
          values: ["None", "A", "B", "C", ""],
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
        label: action.payload,
        values: [""],
        name: action.payload
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
      state.fields[action.payload.index].label = action.payload.name;
      state.fields[action.payload.index].name = action.payload.name
        .toLowerCase()
        .split(" ")
        .flatMap((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
      autoSave(state);
      console.log(state.fields[action.payload.index].label);
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
    addHeader: (state, action) => {
      state.headers.push({
        name: action.payload,
        values: [""],
        accessor: action.payload
          .toLowerCase()
          .split(" ")
          .flatMap((x) => x.charAt(0).toUpperCase() + x.slice(1))
          .join(""),
      });
      autoSave(state);
    },
    removeHeader: (state, action) => {
      state.fields = state.headers.filter(
        (headers) => headers.name !== action.payload
      );
      autoSave(state);
    },
    changeHeaderName: (state, action) => {
      state.headers[action.payload.index].name = action.payload.name;
      state.headers[action.payload.index].accessor = action.payload.name
        .toLowerCase()
        .split(" ")
        .flatMap((x) => x.charAt(0).toUpperCase() + x.slice(1))
        .join("");
      autoSave(state);
    },
    removeHeaderValue: (state, action) => {
      const headers = state.headers[action.payload.index];
      headers.values.splice(action.payload.valIndex, 1);
      if (headers.values.length === 0) {
        headers.values.push("");
      }
      autoSave(state);
    },
    changeHeaderValue: (state, action) => {
      const headers = state.headers[action.payload.index];
      const valIndex = action.payload.valIndex;
      headers.values[valIndex] = action.payload.value;
      const lastValue = headers.values[headers.values.length - 1];
      if (lastValue !== "") {
        headers.values.push("");
      }
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
  addHeader,
  removeHeader,
  changeHeaderName,
  removeHeaderValue,
  changeHeaderValue,
} = fieldsSlice.actions;

export default fieldsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

export const selectionsSlice = createSlice({
  name: "selections",
  initialState: {
    selections: { rep: 1 },
    priorSelections: {},
  },
  reducers: {
    setSelection: (state, action) => {
      if (!state.selections[action.payload.field]) {
        state.selections[action.payload.field] = [];
      }
      state.selections[action.payload.field].push(action.payload.value);
    },
    removeSelection: (state, action) => {
      if (state.selections[action.payload.field]) {
        state.selections[action.payload.field] = state.selections[
          action.payload.field
        ].filter((value) => value !== action.payload.value);
      }
    },
    setSingleSelection: (state, action) => {
      // console.log("Setting selection:", action.payload);
      state.selections[action.payload.field] = action.payload.value;
      // console.log("Updated selections:", state.selections);
    },
    clearSelections: (state) => {
      var { practiceNo, practiceDate, period, practiceType, situation, rep } =
        state.selections;
      rep++;
      state.selections = {
        practiceNo,
        practiceDate,
        period,
        practiceType,
        situation,
        rep,
      };
    },
    clearData: (state) => {
      state.selections = {
        practiceNo: null,
        practiceDate: null,
        period: 1,
        practiceType: "None",
        situation: "None",
        rep: 1,
      };
    },
    copyPrev: (state, action) => {
      state.selections = { ...action.payload };
      var { rep } = state.selections;
      rep++;
      state.selections.rep = rep;
    },
    finalize: (state, { payload: { fields } }) => {
      for (let name of fields) {
        if (!state.selections[name]) {
          state.selections[name] = name;
        }
      }
    },
    setPrior: (state, action) => {
      state.priorSelections = { ...action.payload };
    },
    updateSettings: (state, action) => {
      const { period, practiceType, rep } = action.payload;
      state.selections.period = period;
      state.selections.practiceType = practiceType;
      state.selections.rep = rep;
    },
  },
});

export const {
  setSelection,
  clearSelections,
  clearData,
  setSingleSelection,
  removeSelection,
  copyPrev,
  finalize,
  setPrior,
  updateSettings,
} = selectionsSlice.actions;
export default selectionsSlice.reducer;

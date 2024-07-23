import { createSlice } from "@reduxjs/toolkit";
import { storageAvailable } from "../../utils";

const loadPlaysFromLocalStorage = () => {
  let storage = storageAvailable();
  if (storage) {
    const savedPlays = localStorage.getItem("plays");
    return savedPlays ? JSON.parse(savedPlays) : [];
  }
  return [];
};

export const savedPlays = createSlice({
  name: "savedPlays",
  initialState: {
    plays: loadPlaysFromLocalStorage(),
    // plays: [],
  },
  reducers: {
    addPlay: (state, { payload }) => {
      const obj = { ...payload };
      obj.id = state.plays.length + 1;
      state.plays.push(obj);
      localStorage.setItem("plays", JSON.stringify(state.plays));
    },
    removePlay: (state, action) => {
      state.plays.splice(action.payload, 1);
      localStorage.setItem("plays", JSON.stringify(state.plays));
    },
    clearAll: (state) => {
      state.plays = [];
      if (localStorage.plays) {
        localStorage.removeItem("plays");
      }
    },
  },
});

export const { addPlay, removePlay, clearAll } = savedPlays.actions;
export default savedPlays.reducer;

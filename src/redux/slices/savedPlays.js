import { createSlice } from "@reduxjs/toolkit";

export const savedPlays = createSlice({
    name: "savedPlays",
    initialState: {
        plays: [],
    },
    reducers: {
        addPlay: (state, action) => {
            state.plays.push(action.payload);
        },
        removePlay: (state, action) => {
            state.plays.splice(action.payload, 1);
        }

    }
})

export const { addPlay, removePlay } = savedPlays.actions;
export default savedPlays.reducer;

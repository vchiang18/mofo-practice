import { createSlice } from "@reduxjs/toolkit";

export const savedPlays = createSlice({
    name: "savedPlays",
    initialState: {
        plays: [],
    },
    reducers: {
        addPlay: (state, {payload}) => {
            const obj = {...payload}
            obj.id = state.plays.length + 1
            state.plays.push(obj);

        },
        removePlay: (state, action) => {
            state.plays.splice(action.payload, 1);
        }

    }
})

export const { addPlay, removePlay } = savedPlays.actions;
export default savedPlays.reducer;

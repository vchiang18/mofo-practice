import { createSlice } from "@reduxjs/toolkit";


export const selectionsSlice = createSlice({
    name: "selections",
    initialState: {
        selections: {},
    },
    reducers: {
        setSelection: (state, action) => {
            state.selections[action.payload.field].push(action.payload.value);
        },
        clearSelections: (state) => {
            state.selections = {};
        },
    },
});

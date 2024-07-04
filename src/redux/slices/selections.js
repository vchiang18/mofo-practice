import { createSlice } from "@reduxjs/toolkit";



export const selectionsSlice = createSlice({
    name: "selections",
    initialState: {
        selections: {},
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
        clearSelections: (state) => {
            state.selections = {};
        },
    },
});

 export const { setSelection, clearSelections, removeSelection } = selectionsSlice.actions;
 export default selectionsSlice.reducer;

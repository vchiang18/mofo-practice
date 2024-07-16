import { createSlice } from "@reduxjs/toolkit";



export const selectionsSlice = createSlice({
    name: "selections",
    initialState: {
        selections: { rep:1},
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
                state.selections[action.payload.field] = [action.payload.value];


        },
        clearSelections: (state) => {
            var { practiceNo, practiceDate, period, practiceType, situation, rep, } = state.selections;
            rep++;
            state.selections = {
                practiceNo,
                practiceDate,
                period,
                practiceType,
                situation,
                rep: rep
            };
        },
        copyPrev: (state, action) => {
            state.selections = {...action.payload}
            var {rep} = state.selections;
            rep++;
            state.selections.rep = rep;
        },
        finalize: (state, {payload: {fields}}) =>{
            console.log(fields)
            for (let name of fields){
                if (!state.selections[name]){
                    state.selections[name] = [""]
                }
            }
        },
    },
});

 export const {
    setSelection,
    clearSelections,
    setSingleSelection,
    removeSelection,
    copyPrev,
    finalize,
} = selectionsSlice.actions;
 export default selectionsSlice.reducer;

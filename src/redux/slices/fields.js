import { createSlice } from "@reduxjs/toolkit";


export const fieldsSlice = createSlice({
    name: "fields",
    initialState: localStorage.getItem("fields") ? { fields :JSON.parse(localStorage.getItem("fields"))} :{
        fields: [],
    },
    reducers: {
        addField: (state, action) => {
            state.fields.push({name:action.payload, values:[""]});
        },
        removeField: (state, action) => {
            state.fields = state.fields.filter((field) => field.name !== action.payload);
        },
        changeFieldName: (state, action) => {
            state.fields[action.payload.index].name = action.payload.name
        },
        removeValue: (state, action) => {
            const field = state.fields[action.payload.index]
            field.values.splice(action.payload.valIndex,1);
        },
        changeValue: (state, action) => {
            const field = state.fields[action.payload.index]
            const valIndex = action.payload.valIndex
            field.values[valIndex] = action.payload.value
            const lastValue = field.values[field.values.length - 1]
            if (lastValue !== "") {
                field.values.push("")
            }
        },
    },
});

export const { addField, removeField, changeFieldName, removeValue, changeValue } = fieldsSlice.actions;

export default fieldsSlice.reducer;

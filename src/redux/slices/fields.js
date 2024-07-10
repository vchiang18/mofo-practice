import { createSlice } from "@reduxjs/toolkit";

const autoSave = (state) => {
    localStorage.setItem("fields", JSON.stringify(state.fields));
    return state;
};

export const fieldsSlice = createSlice({
    name: "fields",
    initialState: localStorage.getItem("fields") ? { fields :JSON.parse(localStorage.getItem("fields"))} :{
        fields: [
            {name: "OFF Personnel", values: ["1", "11", "12", "21", "22", ""], accessor: "offPersonnel", multiselect: true},
            {name: "Formation", values: ["SPREAD RT", "TREY", "TRIO", "TRIPS", ""], accessor: "formation", multiselect: false},
            {name: "Formation Variation", values: ["OFF", "BLANK", "FLEX", ""], accessor: "formationVariation", multiselect: true},
            {name: "Backfield", values: ["GUN", "PISTOL", "RIGHT", "LEFT", ""], accessor: "backfield", multiselect: false},
            {name: "Motion", values: ["ZIP", "RIP", "LIP", "Z-JET", ""], accessor: "motion", multiselect: false},
            {name: "FIB", values: ["X", "BLANK", ""], accessor: "fib", multiselect: false},
            {name: "Formation Family", values: ["COMPTON", "HOUSTON", "CRUNCH", "CAB", ""], accessor: "formationFamily", multiselect: false},
            {name: "Unbalanced", values: ["BLANK", "X", ""], accessor: "unbalanced", multiselect: false},
        ],
    },
    reducers: {
        addField: (state, action) => {
            state.fields.push({
            name:action.payload,
            values:[""],
            accessor: action.payload.toLowerCase().split(" ").flatMap((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(''),
            multiselect: false,
        });
            autoSave(state);
        },
        removeField: (state, action) => {
            state.fields = state.fields.filter((field) => field.name !== action.payload);
            autoSave(state);
        },
        changeFieldName: (state, action) => {
            state.fields[action.payload.index].name = action.payload.name
            state.fields[action.payload.index].accessor = action.payload.name.toLowerCase().split(" ").flatMap((x) => x.charAt(0).toUpperCase()+ x.slice(1)).join('')
            autoSave(state);
        },
        removeValue: (state, action) => {
            const field = state.fields[action.payload.index]
            field.values.splice(action.payload.valIndex,1);
            if (field.values.length === 0) {
                field.values.push("")
            }
            autoSave(state);
        },
        changeValue: (state, action) => {
            const field = state.fields[action.payload.index]
            const valIndex = action.payload.valIndex
            field.values[valIndex] = action.payload.value
            const lastValue = field.values[field.values.length - 1]
            if (lastValue !== "") {
                field.values.push("")
            }
            autoSave(state);
        },
    },
});

export const { addField, removeField, changeFieldName, removeValue, changeValue } = fieldsSlice.actions;

export default fieldsSlice.reducer;

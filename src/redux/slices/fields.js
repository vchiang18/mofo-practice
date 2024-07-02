import { createSlice } from "@reduxjs/toolkit";

export const fieldsSlice = createSlice({
    name: "fields",
    initialState: {
        fields: [],
    },
    reducers: {
        addField: (state, action) => {
            state.fields.push(action.payload);
        },
        removeField: (state, action) => {
            state.fields = state.fields.filter((field) => field !== action.payload);
        },
    },
});

export const { addField, removeField } = fieldsSlice.actions;

export default fieldsSlice.reducer;



// const [field, setField] = useState([{name:""}]);


//   const handleAddField = (e) => {
//       const value = e.value;
//       setField((prevEntries) => {
//           return [...prevEntries, { name: value }];
//       });
//   };

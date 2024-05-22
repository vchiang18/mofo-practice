import React , { useState } from 'react';
import { ValuesProvider, useValues } from '../context/ValuesContext';

const ColumnHeaders = ({onSelect}) => {
    const { values } = useValues();
    const columns = Object.keys(values);

    if (!columns.length) {
        return <div>No columns available</div>;
    }

    return (
        <div className="mb-4 w-full md:w-1/5">
            <div className="flex flex-col space-y-2">
            {columns.map(column => (
                <button
                    key={column}
                    className="py-2 px-4 rounded mx-2 bg-blue-500 text-white"
                    onClick={() => onSelect(column)}
                >
                    {column}
                </button>
                ))}
            </div>
        </div>
    );
};

const AddCustomValue = ({ selectedColumn}) => {
    const { values, updateValues } = useValues();
    const [ newValue, setNewValue ] = useState('');

    const handleAddValue = () => {
        if(newValue.trim()){
            const setValues = [...values[selectedColumn], newValue];
            updateValues(selectedColumn, setValues);
            setNewValue();
        }
    };

    return(
        <div>
            <h3>{selectedColumn}</h3>
            <input
                type="text"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder={`Add new value to ${selectedColumn}`}
            />
            <button onClick={handleAddValue}>Add</button>
            <ul>
                {values[selectedColumn].map((value, index) => (
                    <li key={index}>{value} </li>
                ))}
            </ul>
        </div>
    );
};

const ManageCustomValues = () => {
    const [selectedColumn, setSelectedColumn] = useState(null);

    return (
        <ValuesProvider>
            <div>
                <ColumnHeaders onSelect={setSelectedColumn} />
                {selectedColumn && <AddCustomValue selectedColumn={selectedColumn}/>}
            </div>
        </ValuesProvider>

    )

}

export default ManageCustomValues;

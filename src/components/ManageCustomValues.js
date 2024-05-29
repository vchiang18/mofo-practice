import React , { useState , useEffect } from 'react';
import { ValuesProvider, useValues } from '../context/ValuesContext';

const ColumnHeaders = ({onSelect}) => {
    const { values } = useValues();
    const columns = Object.keys(values);

    if (!columns.length) {
        return <div>No columns available</div>;
    }

    return (
        <div>
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
    const { values, updateValues , fetchValues } = useValues();
    const [ newValue, setNewValue ] = useState('');

    useEffect(() => {
        fetchValues();
    }, []);

    const handleAddValue = async (e) => {
        if(newValue.trim()){
            const setValues = [...values[selectedColumn], newValue];
            updateValues(selectedColumn, setValues);
            setNewValue('');
            await fetchValues();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
            handleAddValue(e);
        }
    };

    return(
        <div className="flex justify-center">
            <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                <h2 className="text-3xl leading-6 text-gray-900 mb-4">Update Custom Values</h2>
                <h3 className="text-xl font-semibold mb-4">{selectedColumn}</h3>
                <div className="mb-4">
                    <input
                        className="p-2 border border-gray-300 rounded mr-2"
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Add new value`}
                    />
                    <button
                        onClick={handleAddValue}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-1 justify-center items-center">
                    <ul className="space-y-2">
                        {values[selectedColumn].map((value, index) => (
                            <li key={index} className="p-2">
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

const ManageCustomValues = () => {
    const [selectedColumn, setSelectedColumn] = useState(null);

    return (
        <ValuesProvider>
            <div className='flex'>
                <div className="w-1/5 bg-gray-100 p-4 rounded-lg">
                    <ColumnHeaders onSelect={setSelectedColumn} />
                </div>
                <div className="flex flex-1 justify-center items-center">
                    <div>
                        {selectedColumn && <AddCustomValue selectedColumn={selectedColumn}/>}
                    </div>
                </div>
            </div>
        </ValuesProvider>

    )

}

export default ManageCustomValues;

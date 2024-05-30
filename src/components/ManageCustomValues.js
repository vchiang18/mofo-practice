import React , { useState , useEffect } from 'react';
import { ValuesProvider, useValues } from '../context/ValuesContext';

const ManageCustomValues = () => {
    const { values, updateValues , fetchValues , deleteValue } = useValues();
    const [ selectedColumn, setSelectedColumn ] = useState('')
    const [ newValue, setNewValue ] = useState('');
    const columns = Object.keys(values);

    useEffect(() => {
        fetchValues();
    }, []);


    const formatKeyName = (key) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase());
    };

    if (!columns.length) {
        return <div>No columns available</div>;
    }

    const handleSelectColumn = (column) => {
        setSelectedColumn(column);
    }

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

    const handleDeleteValue = async (valueToDelete) => {
        // console.log('Deleting value:', valueToDelete);
        await deleteValue(selectedColumn, valueToDelete);
    };

    return (

        <ValuesProvider>
        <div className='flex'>
            <div className="w-1/5 bg-gray-100 p-4 rounded-lg">
                <div className="flex flex-col space-y-2">
                {columns.map(column => (
                    <button
                        key={column}
                        className="py-2 px-4 rounded mx-2 bg-blue-500 text-white"
                        onClick={() => handleSelectColumn(column)}
                    >
                        {formatKeyName(column)}
                    </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-1 justify-center items-center">
                {selectedColumn && (
                    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                    <h2 className="text-3xl leading-6 text-gray-900 mb-4">Update Custom Values</h2>
                    <h3 className="text-xl font-semibold mb-4">{formatKeyName(selectedColumn)}</h3>
                    <div className="mb-4">
                        <input
                            className="p-2 border border-gray-300 rounded mr-2"
                            type="text"
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add new value"
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
                            {selectedColumn && values[selectedColumn]?.map((value, index) => (
                                <li key={index} className="p-2">
                                    {value}
                                    <button
                                        onClick={() => handleDeleteValue(value)}
                                        className="ml-2 text-red-300 text-xs hover:text-red-600"
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                )}

            </div>
        </div>
        </ValuesProvider>
    );

}

export default ManageCustomValues;

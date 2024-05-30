import React , { createContext , useContext, useState , useEffect } from 'react';
import db from '../db';

const ValuesContext = createContext();
export const useValues = () => useContext(ValuesContext);

const defaultValues = {
    offensivePersonnel: ['11 Personnel', '12 Personnel', '21 Personnel'],
    formation: ['Shotgun', 'Singleback', 'I-Formation'],
    formationVariation: ['Trips', 'Bunch', 'Spread'],
    backfield: ['Right', 'Left'],
    motion: ['Zip', 'Laser'],
    FIB: ['A','B', 'C'],
    formationFamily: ['Compton', 'Houston', 'Nashville'],
    unbalanced: ['Yes', 'No'],
    practiceType: ['7x7', 'Blitz', 'Team']
}

export function ValuesProvider({children}) {
    const [values, setValues] = useState(defaultValues);

    const fetchValues = async () => {
        const storedValues = {...defaultValues};
        const keys = Object.keys(defaultValues);
        for (const key of keys) {
            const value = await db.metricValues.get(key);
            if(value){
                storedValues[key] = value.value;
            } else {
                storedValues[key] = defaultValues[key];
            }
        }
        // console.log('Loaded values from IndexedDB:', storedValues);
        setValues(storedValues);
    };

    useEffect(() => {
        fetchValues();
    }, []);

    const updateValues = async(field, values) => {
        // console.log('Updating values:', { key: field, value: values });
        await db.metricValues.put({ key: field, value: values});
        setValues(prevValues => ({
            ...prevValues,
            [field]: values
        }));
    };

    const deleteValue = async (field, valueToDelete) => {
        try {
            const updatedValues = values[field].filter(value => value !== valueToDelete);
            // console.log('Filtered values: ', updatedValues);
            await db.metricValues.put( {key: field, value: updatedValues});
            setValues(prevValues => ({
                ...prevValues,
                [field]: updatedValues
            }));

        } catch(error) {
            console.error("Failed to delete value: ", error)
        }
    }

    return (
        <ValuesContext.Provider value={{values, updateValues , fetchValues, deleteValue}}>
            {children}
        </ValuesContext.Provider>
    );
};

import React , {useState} from 'react';
import ButtonGroup from './ButtonGroup';

const AddPractice = () => {

    const [selections, setSelections ] = useState({
        // period: null,
        // practiceType: null,
        // rep: null,
        offensivePersonnel: null,
        formation: null,
        formationVariation: null,
        backfield: null,
        // motion: null,
        // FIB: null,
        // formationFamily: null,
        // unbalanced: null
    });

    const handleSelectionChange = (fieldName, value) => {
        setSelections( (prevSelections) => ({
            ...prevSelections,
            [fieldName]: value,
        }));
    };

    return (
        <div className='p-4'>
            <h1 className='text-4xl font-bold mb-8'>Record Practice Metrics</h1>
            <div className="flex flex-wrap justify-between">
                <ButtonGroup
                    fieldName="offensivePersonnel"
                    displayName="Offensive Personnel"
                    options={['11 Personnel', '12 Personnel', '21 Personnel']}
                    onSelectionChange={handleSelectionChange}
                />
                <ButtonGroup
                    fieldName="formation"
                    displayName="Formation"
                    options={['Shotgun', 'Singleback', 'I-Formation']}
                    onSelectionChange={handleSelectionChange}
                />
                <ButtonGroup
                    fieldName="formationVariation"
                    displayName="Formation Variation"
                    options={['Trips', 'Bunch', 'Spread']}
                    onSelectionChange={handleSelectionChange}
                />
                <ButtonGroup
                    fieldName="backfield"
                    displayName="Backfield"
                    options={['Right', 'Left']}
                    onSelectionChange={handleSelectionChange}
                />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Selected Values:</h2>
                <p><strong>Offensive Personnel:</strong> {selections.offensivePersonnel}</p>
                <p><strong>Formation:</strong> {selections.formation}</p>
                <p><strong>Formation Variation:</strong> {selections.formationVariation}</p>
                <p><strong>Backfield:</strong> {selections.backfield}</p>
            </div>
        </div>
    );
}



export default AddPractice;

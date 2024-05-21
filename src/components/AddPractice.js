import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup';
import PracticeSettings from './PracticeSettings';
import RepCounter from './RepCounter';
import { usePractices } from '../context/PracticeContext';

const AddPractice = () => {
    const [selections, setSelections] = useState({
        offensivePersonnel: null,
        formation: null,
        formationVariation: null,
        backfield: null,
        motion: null,
        fib: null,
        formationFamily: null,
        unbalanced: null
    });
    // const [period, setPeriod] = useState(1);
    // const [practiceType, setPracticeType] = useState('');
    // const [rep, setRep] = useState(1);

    const { settings, updateSettings, addPractice } = usePractices();

    const handleSelectionChange = (fieldName, value) => {
        setSelections((prevSelections) => ({
            ...prevSelections,
            [fieldName]: value,
        }));
    };

    const handlePeriodChange = (e) => {
        updateSettings({
            period: e.target.value,
            practiceType: '',
            rep: 1,
        })
    }

    const handlePracticeTypeChange = (e) => {
        updateSettings({ practiceType: e.target.value })
    }

    const handleSave = () => {
        updateSettings({rep: settings.rep + 1});

        // updateSettings(prevRep => prevRep + 1);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const settingsSelections = {
            period: settings.period,
            practiceType: settings.practiceType,
            rep: settings.rep
        }
        addPractice(selections, settingsSelections);
        setSelections({
            offensivePersonnel: null,
            formation: null,
            formationVariation: null,
            backfield: null,
            motion: null,
            fib: null,
            formationFamily: null,
            unbalanced: null
        });
        handleSave();
    };

    return (
        <div className='flex'>
            <div className="w-1/6 bg-gray-100 p-4 rounded-lg">
                <PracticeSettings
                    label="Period"
                    options={[1,2,3,4]}
                    selectedValue={settings.period}
                    onChange={handlePeriodChange}
                />
                <PracticeSettings
                    label="Practice Type"
                    options={['','7x7', 'team', 'blitz']}
                    selectedValue={settings.practiceType}
                    onChange={handlePracticeTypeChange}
                />
                <RepCounter rep={settings.rep}/>
            </div>
            <div className='p-4 w-5/6'>
            <h2 className="text-3xl font-semibold leading-6 text-gray-900">All Practices</h2>

            <h1 className='text-3xl font-bold mb-8'>Record Practice Metrics</h1>
            <div className="flex flex-wrap justify-between">
                <ButtonGroup
                    fieldName="offensivePersonnel"
                    displayName="Offensive Personnel"
                    options={['11 Personnel', '12 Personnel', '21 Personnel']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.offensivePersonnel}
                />
                <ButtonGroup
                    fieldName="formation"
                    displayName="Formation"
                    options={['Shotgun', 'Singleback', 'I-Formation']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.formation}
                />
                <ButtonGroup
                    fieldName="formationVariation"
                    displayName="Formation Variation"
                    options={['Trips', 'Bunch', 'Spread']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.formationVariation}
                />
                <ButtonGroup
                    fieldName="backfield"
                    displayName="Backfield"
                    options={['Right', 'Left']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.backfield}
                />
                <ButtonGroup
                    fieldName="motion"
                    displayName="Motion"
                    options={['Zip', 'Laser']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.motion}
                />
                <ButtonGroup
                    fieldName="fib"
                    displayName="FIB"
                    options={['A', 'B', 'C']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.fib}
                />
                <ButtonGroup
                    fieldName="formationFamily"
                    displayName="Formation Family"
                    options={['Compton', 'Houston', 'Nashville']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.formationFamily}
                />
                <ButtonGroup
                    fieldName="unbalanced"
                    displayName="Unbalanced"
                    options={['Yes', 'No']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.unbalanced}
                />
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Selected Values:</h2>
                <p><strong>Offensive Personnel:</strong> {selections.offensivePersonnel}</p>
                <p><strong>Formation:</strong> {selections.formation}</p>
                <p><strong>Formation Variation:</strong> {selections.formationVariation}</p>
                <p><strong>Backfield:</strong> {selections.backfield}</p>
                <p><strong>Motion:</strong> {selections.motion}</p>
                <p><strong>FIB:</strong> {selections.fib}</p>
                <p><strong>Form Family:</strong> {selections.formationFamily}</p>
                <p><strong>Unbalanced:</strong> {selections.unbalanced}</p>

            </div>

            <div className="mt-4">
                <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
            </div>
        </div>

    );
};

export default AddPractice;

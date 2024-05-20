import React, { useState } from 'react';
import ButtonGroup from './ButtonGroup';
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

    // const [ practiceSettings, setPracticeSettings ] = useState({
    //     period: null,
    //     type: null,
    //     rep: null
    // })

    const { addPractice } = usePractices();

    const handleSelectionChange = (fieldName, value) => {
        setSelections((prevSelections) => ({
            ...prevSelections,
            [fieldName]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selections);
        addPractice(selections);
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
                    value={selections.backfield}
                />
                <ButtonGroup
                    fieldName="fib"
                    displayName="FIB"
                    options={['A', 'B', 'C']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.backfield}
                />
                <ButtonGroup
                    fieldName="formationFamily"
                    displayName="Formation Family"
                    options={['Compton', 'Houston', 'Nashville']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.backfield}
                />
                <ButtonGroup
                    fieldName="unbalanced"
                    displayName="Unbalanced"
                    options={['Yes', 'No']}
                    onSelectionChange={handleSelectionChange}
                    value={selections.backfield}
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
    );
};

export default AddPractice;


// import React , {useState} from 'react';
// import ButtonGroup from './ButtonGroup';
// import { usePractices } from '../context/PracticeContext';

// const AddPractice = () => {

//     const [selections, setSelections ] = useState({
//         // period: null,
//         // practiceType: null,
//         // rep: null,
//         offensivePersonnel: null,
//         formation: null,
//         formationVariation: null,
//         backfield: null,
//         // motion: null,
//         // FIB: null,
//         // formationFamily: null,
//         // unbalanced: null
//     });

//     const { addPractice } = usePractices();

//     const handleSelectionChange = (fieldName, value) => {
//         setSelections( (prevSelections) => ({
//             ...prevSelections,
//             [fieldName]: value,
//         }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // console.log(selections);
//         addPractice(selections);
//         // console.log(addPractice);
//         setSelections({
//             offensivePersonnel: null,
//             formation: null,
//             formationVariation: null,
//             backfield: null,
//         });
//     }

//     return (
//         <div className='p-4'>
//             <h1 className='text-4xl font-bold mb-8'>Record Practice Metrics</h1>
//             <div className="flex flex-wrap justify-between">
//                 <ButtonGroup
//                     fieldName="offensivePersonnel"
//                     displayName="Offensive Personnel"
//                     options={['11 Personnel', '12 Personnel', '21 Personnel']}
//                     onSelectionChange={handleSelectionChange}
//                     value={selections.offensivePersonnel}
//                 />
//                 <ButtonGroup
//                     fieldName="formation"
//                     displayName="Formation"
//                     options={['Shotgun', 'Singleback', 'I-Formation']}
//                     onSelectionChange={handleSelectionChange}
//                     value={selections.formation}
//                 />
//                 <ButtonGroup
//                     fieldName="formationVariation"
//                     displayName="Formation Variation"
//                     options={['Trips', 'Bunch', 'Spread']}
//                     onSelectionChange={handleSelectionChange}
//                     value={selections.formationVariation}
//                 />
//                 <ButtonGroup
//                     fieldName="backfield"
//                     displayName="Backfield"
//                     options={['Right', 'Left']}
//                     onSelectionChange={handleSelectionChange}
//                     value={selections.backfield}
//                 />
//             </div>

//             <div className="mt-8">
//                 <h2 className="text-2xl font-semibold mb-4">Selected Values:</h2>
//                 <p><strong>Offensive Personnel:</strong> {selections.offensivePersonnel}</p>
//                 <p><strong>Formation:</strong> {selections.formation}</p>
//                 <p><strong>Formation Variation:</strong> {selections.formationVariation}</p>
//                 <p><strong>Backfield:</strong> {selections.backfield}</p>
//             </div>
//             <div className="mt-4">
//                 <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
//             </div>
//         </div>
//     );
// }



// export default AddPractice;

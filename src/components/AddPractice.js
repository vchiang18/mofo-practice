import React , {useState} from 'react';
import ButtonGroup from './ButtonGroup';

const AddPractice = () => {

    const [selections, setSelections ] = useState({
        period: null,
        practiceType: null,
        rep: null,
        offensivePersonnel: null,
        formation: null,
        formationVariation: null,
        backfield: null,
        motion: null,
        FIB: null,
        formationFamily: null,
        unbalanced: null
    });

    const handleSelectionChange = (field, value) => {
        setSelections( (prevSelections) => ({
            ...prevSelections,
            [field]: value,
        }));
    };

    return (
        <div>

        </div>

    );
}



export default AddPractice;

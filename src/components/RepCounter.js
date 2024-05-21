import React, { useState, useEffect } from 'react';

const RepCounter = ({rep}) => {

    return (
        <div>
            <label>Rep #</label>
            <div>{rep}</div>
        </div>
    )
}

export default RepCounter;

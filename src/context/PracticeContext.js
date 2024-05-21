import React , { createContext , useContext , useEffect , useState } from 'react';
import db from '../db';
import { clear } from '@testing-library/user-event/dist/clear';

const PracticeContext = createContext();

export function PracticeProvider({ children }) {
    const [practices, setPractices] = useState([]);

    useEffect(() => {
        const fetchPractices = async () => {
            try {
                const allPractices = await db.practices.toArray();
                setPractices(allPractices);
            } catch (error) {
                console.error("Failed to fetch practices", error);
            }
        };
        fetchPractices();
    }, []);

    const addPractice = async (practice, settings) => {
        const practiceData = {
            ...practice,
            ...settings
        }
        try {
            await db.practices.add(practiceData);
            const allPractices = await db.practices.toArray();
            setPractices(allPractices);
        } catch (error) {
            console.error("Failed to add practice", error);
        }

    }

    const deletePractice = async (id) => {
        try {
            await db.practices.delete(id);
            const allPractices = await db.practices.toArray();
            setPractices(allPractices);
        } catch(error) {
            console.error("Failed to delete practice: ", error)
        }
    }

    const clearPractices = async () => {
        try {
            await db.practices.clear();
            setPractices([]);
        } catch(error) {
            console.error("Failed to clear practices: ", error)
        }
    }


    return (
        <PracticeContext.Provider value={{ practices, addPractice , deletePractice, clearPractices }}>
            {children}
        </PracticeContext.Provider>
    );
}

export function usePractices() {
    const context = useContext(PracticeContext);
    if (!context) {
        throw new Error('usePractices must be used within a PracticeProvider');
    }
    return context;
}

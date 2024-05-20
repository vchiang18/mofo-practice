import React , { createContext , useContext , useEffect , useState } from 'react';
import db from '../db';

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

    const addPractice = async (practice) => {
        try {
            await db.practices.add(practice);
            const allPractices = await db.practices.toArray();
            setPractices(allPractices);
        } catch (error) {
            console.error("Failed to add practice", error);
        }
    };

    return (
        <PracticeContext.Provider value={{ practices, addPractice }}>
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

import { useState, createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const GoalContext = createContext()

export function GoalProvider({children}) {
    const [goals, setGoals] = useState([]);

    const addGoal = (goal) => {
        setGoals([...goals, { id: uuidv4(), text: goal }]);
    };

    return (
        <div>
            <GoalContext.Provider value={{ goals, addGoal }}>
                {children}
            </GoalContext.Provider>
        </div>
    )
};
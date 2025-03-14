/* Managing state for goals & making it accessible 
across the app using React's Context API */
import { useState, createContext } from 'react'; /*useState for storing goals*/
import { v4 as uuidv4 } from 'uuid';

export const GoalContext = createContext() /*create context object for goals*/

export function GoalProvider({children}) {
    const [goals, setGoals] = useState([]);

    const addGoal = (goal) => {
        setGoals([...goals, { id: uuidv4(), text: goal }]); /*generates a new goal with  a unique ID & user goal input to the list*/
    };

    return (
        <div>
            {/* GoalContext.Provider makes the goals 
            & addGoal function available to child components (e.g. App) via the context */}
            <GoalContext.Provider value={{ goals, addGoal }}>
                {children}
            </GoalContext.Provider>
        </div>
    )
};
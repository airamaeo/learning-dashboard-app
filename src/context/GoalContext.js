/* Managing state for goals & making it accessible 
across the app using React's Context API */
import { useState, createContext } from 'react'; /*useState for storing goals*/
import { v4 as uuidv4 } from 'uuid';

export const GoalContext = createContext() /*create context object for goals*/

export function GoalProvider({children}) {
    const [goalLists, setGoalLists] = useState([]);

    // Function to create a new list
    const addList = (title) => {
        const newList = { id: uuidv4(), title, goals: [] };
        setGoalLists([...goalLists, newList]);
    };

    // Function to edit list title
    const editListTitle = (title, listId) => {
        setGoalLists((prevLists) => {
            return prevLists.map((list) =>
                list.id === listId ? { ...list, title } : list
            );
        });
    };

    // Function to add a goal to a specific list
    const addGoal = (goalText, listId) => {
        setGoalLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? { ...list, goals: [...list.goals, { id: uuidv4(), text: goalText }] }
                    : list
            )
        );
    };

    return (
        <div>
            {/* GoalContext.Provider makes the goals 
            & addGoal function available to child components (e.g. App) via the context */}
            <GoalContext.Provider value={{ goalLists, addList, addGoal, editListTitle }}>
                {children}
            </GoalContext.Provider>
        </div>
    )
};
/* Managing state for goals & making it accessible 
across the app using React's Context API */
import { useState, createContext, useEffect } from 'react'; /*useState for storing goals*/
import { v4 as uuidv4 } from 'uuid'; /*uuid for generating unique ids*/

export const GoalContext = createContext(); /*create context object for goals*/

export function GoalProvider({children}) {
    const savedGoalLists = localStorage.getItem('goalLists');
    const initialGoalLists = savedGoalLists ? JSON.parse(savedGoalLists) : [];
    const [goalLists, setGoalLists] = useState(initialGoalLists);

    // Save goalLists to local storage
    useEffect(() => {
        localStorage.setItem('goalLists', JSON.stringify(goalLists));
    }, [goalLists]);
    
    // Function to create a new list
    const addList = (title) => {
        const newList = { id: uuidv4(), title, goals: [] };
        setGoalLists([...goalLists, newList]);
    };

    // Load goalLists from local storage
    useEffect(() => {
        const savedGoalLists = localStorage.getItem('goalLists');
        if (savedGoalLists) {
            setGoalLists(JSON.parse(savedGoalLists));
        }
    }, []);

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

    // Function to edit list title
    const editListTitle = (listId, newTitle) => {
        setGoalLists((prevLists) => [...prevLists].map((list) =>
            list.id === listId ? { ...list, title: newTitle } : list
        ));
    };
    

    // Function to edit goal text
    const editGoalText = (goalId, listId, newText) => {
        setGoalLists((prevLists) =>
            prevLists.map((list) =>
                list.id === listId
                    ? {
                        ...list,
                        goals: list.goals.map((goal) =>
                            goal.id === goalId ? { ...goal, text: newText } : goal
                        ),
                    }
                    : list
            )
        );
    };

    //Function to delete a list
    const deleteList = (listId) => {
        setGoalLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    };

    // Functio to delete goal item
    const deleteGoal = (goalId, listId) => {
        setGoalLists((prevLists) =>
            prevLists.map((list) => 
                list.id === listId
                    ? {
                        ...list,
                        goals: list.goals.filter((goal) => goal.id !== goalId
                    ),
                    }
                    : list
                ) 
        );
    }
    

    return (
        <div>
            {/* GoalContext.Provider makes the goals 
            & addGoal function available to child components (e.g. App) via the context */}
            <GoalContext.Provider value={{ goalLists, addList, addGoal, editListTitle, editGoalText, deleteList, deleteGoal }}>
                {children}
            </GoalContext.Provider>
        </div>
    )
};
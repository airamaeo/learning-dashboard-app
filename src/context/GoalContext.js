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
                    ? { ...list, goals: [...list.goals, { id: uuidv4(), text: goalText, completed: false }] }
                    : list
            )
        );
    };

    // Function to mark goals as completed
    const toggleGoalCompletion = (goalId, listId) => {
        setGoalLists((prevLists) =>
            prevLists.map((list) => 
                list.id === listId
                    ? {...list, goals: list.goals.map((goal) =>
                        goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
                    ),
                    }
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

    //Function to delete a list
    const deleteList = (listId) => {
        setGoalLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    };

    // Function to edit the text of a goal
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
    
    // Function to delete goal item
    const deleteGoal = (goalId, listId) => {
        setGoalLists((prevLists) =>
        prevLists.map((list) =>
            list.id === listId
            ? {
                ...list,
                goals: list.goals.filter((goal) => goal.id !== goalId),
                }
            : list
        )
        );
    };
    
    // Function to drag and re-order goal list item
    const reorderGoals = (listId, activeId, overId) => {
        setGoalLists((prevLists) =>
            prevLists.map((list) => {
                if(list.id !== listId) return list;

                const oldIndex = list.goals.findIndex(goal => goal.id === activeId);
                const newIndex = list.goals.findIndex(goal => goal.id === overId);

                if(oldIndex === -1 || newIndex === -1) return list;

                const reorderedGoals = [...list.goals];
                const [movedGoal] = reorderedGoals.splice(oldIndex, 1);
                reorderedGoals.splice(newIndex, 0, movedGoal);

                return {...list, goals: reorderedGoals};
            })
        )
    };

    return (
        <div>
            {/* GoalContext.Provider makes the goals 
            & addGoal function available to child components (e.g. App) via the context */}
            <GoalContext.Provider value={{ goalLists, addList, addGoal, toggleGoalCompletion, editListTitle, editGoalText, deleteList, deleteGoal, reorderGoals }}>
                {children}
            </GoalContext.Provider>
        </div>
    )
};
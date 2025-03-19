/* Displays list of all goals */
import React, {useState, useContext} from "react";
import { GoalContext } from "../context/GoalContext";
import GoalItem from "./GoalItem";
import GoalForm from "./GoalForm";


export default function LearningList() {
    const { goalLists, editListTitle } = useContext(GoalContext);
    const deleteList = useContext(GoalContext).deleteList;

    const [isEditing, setIsEditing] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    const handleEdit = (listId, currentTitle) => {
        setIsEditing(listId);
        setNewTitle(currentTitle);
    };

    const handleSave = (listId) => {
        editListTitle(listId, newTitle);
        setIsEditing(null);
    }

    if (!goalLists || goalLists.length === 0) {
        return <p>No lists yet. Create one!</p>;
    };

    return (
        <div className="list-container">
            {goalLists.map((list) => (
                <div key={list.id} className="list-card">
                    {isEditing === list.id ? (
                        <div>
                            <input 
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            />
                            <button onClick={() => handleSave(list.id)}>Save</button>
                            <button onClick={() => setIsEditing(null)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h2>{list.title}</h2>
                            <button onClick={() => handleEdit(list.id, list.title)}>Edit</button>
                            <button onClick={() => deleteList(list.id)}>Delete</button>
                        </div>
                    )}
                    <GoalForm listId={list.id} />
                        {list.goals.length > 0 ? (
                            <ul>
                                {list.goals.map((goal) => (
                                    <li key={goal.id}>
                                        <GoalItem goal={goal} listId={list.id}/>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No goals yet. Add one!</p>
                        )}
                </div>
            ))}
        </div>
    );
};
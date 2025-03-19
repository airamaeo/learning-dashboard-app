/* Displays list of all goals */
import React, {useState, useContext} from "react";
import { GoalContext } from "../context/GoalContext";
import GoalItem from "./GoalItem";
import GoalForm from "./GoalForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";


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
        return <p>No lists yet. Let's get started with your goals!</p>;
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
                            <button onClick={() => handleSave(list.id)} className="save-btn">Save</button>
                            <button onClick={() => setIsEditing(null)} className="cancel-btn">Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h2 className="list-title">{list.title}</h2>
                            <div className="list-actions">
                                <button onClick={() => handleEdit(list.id, list.title)} className="edit-btn">
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </button>
                                <button onClick={() => deleteList(list.id)} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
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
                            <p>No goals yet. Add a new goal!</p>
                        )}
                </div>
            ))}
        </div>
    );
};
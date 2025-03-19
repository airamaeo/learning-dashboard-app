/* Renders single goal component */
import React, {useState, useContext} from "react";
import { GoalContext } from "../context/GoalContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function GoalItem({goal, listId}) {  
    const {editGoalText} = useContext(GoalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(goal.text);
    const {deleteGoal} = useContext(GoalContext);

    const handleSaveText = () => {
        editGoalText(goal.id, listId, newText);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                    <button onClick={handleSaveText} className="save-btn">Save</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                </div>
                ) : (
                    <div className="goal-item">
                        <span className="goal-text">{goal.text}</span>
                        <div className="goal-actions">
                            <button onClick={() => setIsEditing(true)} className="edit-btn">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </button>
                            <button onClick={() => deleteGoal(goal.id, listId)} className="delete-btn">
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};
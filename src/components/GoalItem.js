/* Renders single goal component */
import React, {useState, useContext} from "react";
import { GoalContext } from "../context/GoalContext";

export default function GoalItem({goal, listId}) {  
    const {editGoalText} = useContext(GoalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(goal.text);

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
                    <button onClick={handleSaveText}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
                ) : (
                    <div>
                        <span>{goal.text}</span>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                )
            }
        </div>
    );
};
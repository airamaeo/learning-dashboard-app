import React, { useState, useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GoalContext } from '../context/GoalContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function GoalItem({ goal, listId }) {
    const { editGoalText, deleteGoal } = useContext(GoalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(goal.text);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: goal.id,
    });

    const handleSaveText = () => {
        if (newText.trim() !== goal.text) {
        console.log('Saving goal text:', newText); // Debugging
        editGoalText(goal.id, listId, newText);
        }
        setIsEditing(false);
    };

    const handleDeleteGoal = (e) => {
        e.stopPropagation();
        console.log('Deleting goal:', goal.id); // Debugging
        deleteGoal(goal.id, listId);
    };

    const handleEditGoal = (e) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="goal-item">
        {isEditing ? (
            <div>
            <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
            />
            <button onClick={handleSaveText} className="save-btn">
                Save
            </button>
            <button onClick={() => setIsEditing(false)} className="cancel-btn">
                Cancel
            </button>
            </div>
        ) : (
            <div className="goal-content">
            <span className="goal-text">{goal.text}</span>
            <div className="goal-actions">
                        {/* Drag handle button */}
                        <button {...listeners} className="drag-handle">
                            ↕️
                        </button>
                        <button onClick={handleEditGoal} className="edit-btn">
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button onClick={handleDeleteGoal} className="delete-btn">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
            </div>
        )}
        </div>
    );
    }

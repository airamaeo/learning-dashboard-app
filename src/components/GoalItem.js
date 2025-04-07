import React, { useState, useContext } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GoalContext } from '../context/GoalContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function GoalItem({ goal, listId }) {
    const { editGoalText, deleteGoal } = useContext(GoalContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(goal.text);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: goal.id,
    });

    const handleSaveText = () => {
        if (newText.trim() !== goal.text) {
            editGoalText(goal.id, listId, newText);
        }
        setIsEditing(false);
    };

    const handleDeleteGoal = (e) => {
        e.stopPropagation();
        deleteGoal(goal.id, listId);
    };

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            className={`goal-item ${isEditing ? 'editing' : ''}`}
            onClick={() => setIsEditing(true)}
        >
            {isEditing ? (
                <div
                    className="edit-container-wrapper"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="edit-row">
                        {/* Drag handle stays beside input only in editing mode */}
                        <button
                            {...listeners}
                            onClick={(e) => e.stopPropagation()}
                            className="drag-handle"
                        >
                            <FontAwesomeIcon icon={faGripVertical} />
                        </button>

                        <input
                            type="text"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveText();
                                else if (e.key === 'Escape') setIsEditing(false);
                            }}
                            autoFocus
                            className="goal-text"
                        />
                    </div>

                    <div className="edit-container">
                        <button onClick={handleSaveText} className="save-btn">
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                        <button onClick={() => setIsEditing(false)} className="cancel-btn">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <button onClick={handleDeleteGoal} className="delete-btn">
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                </div>
            ) : (
                // Only display goal text in non-editing mode
                <span className="goal-text" style={{ marginLeft: 10 }}>{goal.text}</span>
            )}
        </div>
    );
}

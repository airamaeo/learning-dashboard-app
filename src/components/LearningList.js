import React, { useState, useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { GoalContext } from "../context/GoalContext";
import GoalItem from "./GoalItem";
import GoalForm from "./GoalForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function LearningList() {
    const { goalLists, editListTitle, deleteList, reorderGoals, addGoal } = useContext(GoalContext);
    const [isEditing, setIsEditing] = useState(null);
    const [newTitle, setNewTitle] = useState("");

    const handleEdit = (listId, currentTitle) => {
        setIsEditing(listId);
        setNewTitle(currentTitle);
    };

    const handleSave = (listId) => {
        editListTitle(listId, newTitle);
        setIsEditing(null);
    };

    const handleDragEnd = ({ active, over }) => {
        if (!active || !over || active.id === over.id) return;
        reorderGoals(active.id, over.id); // Fix the reorder logic to make sure the drag works
    };

    return (
        <div className="list-container">
            {goalLists.length === 0 ? (
                <p>No lists yet. Let's get started with your goals!</p>
            ) : (
                goalLists.map((list) => (
                    <div key={list.id} className="list-card">
                        {isEditing === list.id ? (
                            <div className="edit-mode">
                                <input
                                    type="text"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={() => handleSave(list.id)} className="save-btn">
                                    <FontAwesomeIcon icon={faCheck} />
                                </button>
                                <button onClick={() => setIsEditing(null)} className="cancel-btn">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <button onClick={() => deleteList(list.id)} className="delete-btn">
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        ) : (
                            <h2 className="list-title" onClick={() => handleEdit(list.id, list.title)}>
                                {list.title}
                            </h2>
                        )}

                        <GoalForm listId={list.id} />

                        {/* Drag-and-drop context */}
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext 
                                items={list.goals.map((goal) => goal.id)} 
                                strategy={verticalListSortingStrategy}
                            >
                                {list.goals.length > 0 ? (
                                    <ul>
                                        {list.goals.map((goal) => (
                                            <li key={goal.id}>
                                                <GoalItem goal={goal} listId={list.id} />
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No goals yet. Add a new goal!</p>
                                )}
                            </SortableContext>
                        </DndContext>
                    </div>
                ))
            )}
        </div>
    );
}

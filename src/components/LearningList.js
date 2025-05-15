import React, { useState, useContext } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { GoalContext } from "../context/GoalContext";
import GoalItem from "./GoalItem";
import GoalForm from "./GoalForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faTimes, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function LearningList() {
    const { goalLists, editListTitle, deleteList, reorderGoals } = useContext(GoalContext);
    const [isEditing, setIsEditing] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [filters, setFilters] = useState({});

    const handleEdit = (listId, currentTitle) => {
        setIsEditing(listId);
        setNewTitle(currentTitle);
    };

    const handleSave = (listId) => {
        editListTitle(listId, newTitle);
        setIsEditing(null);
    };

    const handleFilterChange = (listId, value) => {
        setFilters((prev) => ({
            ...prev,
            [listId]: value,
        }));
    };

    return (
        <div className="list-container">
            {goalLists.length === 0 ? (
                <p>No lists yet. Let's get started with your goals!</p>
            ) : (
                goalLists.map((list) => {
                    const handleDragEnd = ({ active, over }) => {
                        if (!active || !over || active.id === over.id) return;
                        reorderGoals(list.id, active.id, over.id);
                    };

                    return (
                        <div key={list.id} className="list-card">
                            {isEditing === list.id ? (
                                <div className="edit-mode">
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSave(list.id);
                                            else if (e.key === 'Escape') setIsEditing(null);
                                        }}
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
                                <div className="list-header">
                                    <div
                                        className="list-title-container"
                                        onClick={() => handleEdit(list.id, list.title)}
                                    >
                                        <h2 className="list-title">
                                            {list.title || <span className="placeholder-title">Click to add a title</span>}
                                        </h2>
                                    </div>

                                    <div className="filter-menu">
                                        <button
                                            className="filter-btn"
                                            onClick={() =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    [`${list.id}_open`]: !prev[`${list.id}_open`],
                                                }))
                                            }
                                        >
                                            <FontAwesomeIcon icon={faEllipsisV} />
                                        </button>
                                        {filters[`${list.id}_open`] && (
                                            <ul className="filter-options">
                                                <li
                                                    onClick={() => handleFilterChange(list.id, "all")}
                                                    className={filters[list.id] === "all" ? "active" : ""}
                                                >
                                                    All
                                                </li>
                                                <li
                                                    onClick={() => handleFilterChange(list.id, "completed")}
                                                    className={filters[list.id] === "completed" ? "active" : ""}
                                                >
                                                    Completed
                                                </li>
                                                <li
                                                    onClick={() => handleFilterChange(list.id, "inProgress")}
                                                    className={filters[list.id] === "inProgress" ? "active" : ""}
                                                >
                                                    In Progress
                                                </li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            )}

                            <GoalForm listId={list.id} />

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
                                            {list.goals
                                                .filter((goal) => {
                                                    const filterValue = filters[list.id] || "all";
                                                    if (filterValue === "completed") return goal.completed;
                                                    if (filterValue === "inProgress") return !goal.completed;
                                                    return true;
                                                })
                                                .map((goal) => (
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
                    );
                })
            )}
        </div>
    );
}

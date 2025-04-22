import React, { useState, useContext } from "react";
import { GoalContext } from "../context/GoalContext";

export default function ListContainer() {
    const { addList } = useContext(GoalContext);
    const [listTitle, setListTitle] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (listTitle.trim() !== "") {
            addList(listTitle);
            setListTitle("");
        }
    };


    return (
        <div className="centered-container">
            <input
                type="text"
                placeholder="Create a new list of goals"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit(e);
                    else if (e.key === 'Escape') setListTitle("");
                }}
                className="title-input"
            />
            <button onClick={handleSubmit} className="title-Btn">Create List</button>
        </div>
    );
}
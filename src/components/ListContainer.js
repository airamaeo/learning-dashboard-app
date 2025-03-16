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
        <div>
            <input
                type="text"
                placeholder="New Goals List Title"
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
            />
            <button onClick={handleSubmit}>+</button>
        </div>
    );
}
import React, {useState, useContext} from "react";
import {GoalContext} from "../context/GoalContext";

export default function GoalForm() {
    const {addGoal} =useContext(GoalContext);
    const [goal, setGoal] = useState("");

    const handleChange = (event) => {
        setGoal(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (goal.trim() !== "") {
            addGoal(goal);
            setGoal("");
        }    
    };

    return (
        <div>
            <h2>My Goals</h2>
            <input type="text" value={goal} onChange={handleChange}/>
            <button onClick={handleSubmit}>+</button>
        </div>
    )
};
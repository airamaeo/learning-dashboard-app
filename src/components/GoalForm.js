/* GoalForm.js is a component that allows users to add goals to their list of goals
It imports the GoalContext and uses the addGoal function 
from the context to add a new goal to the list */
import React, {useState, useContext} from "react";
import {GoalContext} from "../context/GoalContext";

export default function GoalForm({ listId }) {
    const {addGoal} =useContext(GoalContext); /*useContext hook to access the addGoal function from GoalContext*/
    const [goal, setGoal] = useState(""); /*useState hook to manage the goal input field*/

    const handleSubmit = (event) => {
        event.preventDefault(); /* Prevents default form submission behavior */
        if (goal.trim() !== "") { /* Ensures goal is not empty */
            addGoal(goal, listId); /* Add the goal to the context */
            setGoal(""); /* Clears input field after a goal is added */
        }    
    };

    return (
        <div class="goal-input-container">
            <input
                type="text"
                placeholder="Add a goal item"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit(e);
                    else if (e.key === 'Escape') setGoal("");
                }}
                className="goal-input"
            />
            <button onClick={handleSubmit} className="goal-Btn">+</button>
        </div>
    )
};
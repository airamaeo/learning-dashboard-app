/* GoalForm.js is a component that allows users to add goals to their list of goals
It imports the GoalContext and uses the addGoal function 
from the context to add a new goal to the list */
import React, {useState, useContext} from "react";
import {GoalContext} from "../context/GoalContext";

export default function GoalForm() {
    const {addGoal} =useContext(GoalContext); /*useContext hook to access the addGoal function from GoalContext*/
    const [goal, setGoal] = useState(""); /*useState hook to manage the goal input field*/

    const handleChange = (event) => {
        setGoal(event.target.value); /* Updates goal as user types */
    };

    const handleSubmit = (event) => {
        event.preventDefault(); /* Prevents default form submission behavior */
        if (goal.trim() !== "") { /* Ensures goal is not empty */
            addGoal(goal); /* Add the goal to the context */
            setGoal(""); /* Clears input field after a goal is added */
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
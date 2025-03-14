/* Displays list of all goals */
import React, {useContext} from "react";
import { GoalContext } from "../context/GoalContext";
import GoalItem from "./GoalItem";


export default function LearningList() {
    const { goals } = useContext(GoalContext); /* Access list of all goals from GoalContext */

    return (
        <div>
            <h2>Goals List</h2>
            <ul>
                {goals.map((goal) => ( /* maps over each goal and renders a GoalItem for each one */
                     <li key={goal.id}> {/* Each goal is assigned a unique key */}
                         <GoalItem goal={goal} /> {/* GoalItem is passed a goal prop containing the individual goal object */}
                     </li> 
                ))}
            </ul>
        </div>
    );
};
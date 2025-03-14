import React, {useContext} from "react";
import { GoalContext } from "../context/GoalContext";
import GoalItem from "./GoalItem";


export default function LearningList() {
    const { goals } = useContext(GoalContext);

    return (
        <div>
            <h2>Goals List</h2>
            <ul>
                {goals.map((goal) => (
                     <li key={goal.id}>
                         <GoalItem goal={goal} />
                     </li>
                ))}
            </ul>
        </div>
    );
};
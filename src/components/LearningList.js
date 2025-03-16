/* Displays list of all goals */
import React, {useContext} from "react";
import { GoalContext } from "../context/GoalContext";
import GoalItem from "./GoalItem";
import GoalForm from "./GoalForm";


export default function LearningList() {
    const { goalLists } = useContext(GoalContext);

    if (!goalLists.length) {
        return <p>No lists yet. Create one!</p>;
    }

    return (
        <div>
            {goalLists.map((list) => (
                <div key={list.id}>
                    <h2>{list.title}</h2>
                    <GoalForm listId={list.id} />
                    <ul>
                        {list.goals.length > 0 ? (
                            list.goals.map((goal) => (
                                <li key={goal.id}>
                                    <GoalItem goal={goal} />
                                </li>
                            ))
                        ) : (
                            <p>No goals yet. Add one!</p>
                        )}
                    </ul>
                </div>
            ))}
        </div>
    );
};
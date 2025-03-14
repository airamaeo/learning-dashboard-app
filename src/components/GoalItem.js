/* Renders single goal component */
import React from "react";

export default function GoalItem({goal}) {  
    if(!goal || !goal.text) {
        return null; /*if goal or goal.text is not available, return null*/
    }

    return (
        <div>
            {goal.text} {/*display text of goal*/}
        </div>
    );
};
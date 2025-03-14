import React from "react";

export default function GoalItem({goal}) {  
    if(!goal || !goal.text) {
        return null;
    }

    return (
        <div>
            {goal.text}
        </div>
    );
};
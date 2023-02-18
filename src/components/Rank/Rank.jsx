import React from "react";

const Rank = ({ name, score }) => {
    return (
        <div>
            <div className="center black f3 ">
                {`${name}, your current score is ...`}
            </div>
            <div className="center black f2 ">
                {score}
            </div>
        </div>
    )
}

export default Rank
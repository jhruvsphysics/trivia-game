import React from "react"
import Choice from "./Choice"

export default function Trivia(props) {
    const multipleChoices = props.trivia[props.id].choices.map(
        choice => <Choice 
                    id={choice.id} 
                    order={choice.order}
                    myScoreboard={props.scoreboard[props.id]} 
                    description={choice.description}
                    checkAnswerState={props.checkAnswerState}
                    handleClick={props.updateScore}/>
    )
    return (
        <div className="trivia">
            <h3>{props.trivia[props.id].question}</h3>
            {multipleChoices? multipleChoices : <div></div>}
            <hr />
        </div>
    )
}
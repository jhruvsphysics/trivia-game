import React from "react"

export default function Choice(props) {
    function classForChecked() {
        //console.log(props.choice)
        const selected = props.myScoreboard.selected

        if (props.description == props.myScoreboard.correct){
            return "choice--button--correct"}
            
        else if(selected == props.order && props.description != props.myScoreboard.correct){return "choice--button--incorrect"}
        
        else {return "choice--button--checkAnswer"}
        
    }
    function classForUnChecked() {
        //console.log('myScoreboard', props.myScoreboard.selected)
        if (props.myScoreboard.selected == props.order){
            return "choice--button--selected" 
        } else {return "choice--button"}
    }
    return (
        <div className="choice">
            {props.checkAnswerState? 
            <button className={classForChecked()}>{props.description}</button>
            :
            <button 
            className={props.myScoreboard? classForUnChecked() : "choice--button"} 
            onClick={() => props.handleClick(props.myScoreboard, props.order, props.description)}>
                {props.description}
            </button>}
        </div>
    )
}
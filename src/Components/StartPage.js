import React from "react"

export default function StartPage(props) {
    return (
        <div className="startPage">
            <h1 className="startPage--title">Quizzical</h1>
            <button className="startPage--button" onClick={props.handleClick}>Start quiz</button>
        </div>
    )
}
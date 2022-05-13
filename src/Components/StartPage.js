import React from "react"

export default function StartPage(props) {
    return (
        <div className="startPage">
            <h1 className="startPage--title">Don't Get GOT!!!</h1>
            <p className="startPage--rule">You have total of 3 life points. Each round consists of 5 trivia questions. If you get all of them right, your life point(s) won't be deducted; otherwise, it will be.</p>
            <p className="startPage--rule">Each question is worth 1 point with an exception of getting all correct in a round which values at 10 points in total.</p>
            <button className="startPage--button" onClick={props.handleClick}>Start quiz</button>
            <h3 style={{alignSelf: "flex-start", margin: "5px"}}>created by: @jhruvsphysics</h3>
            <h3 style={{alignSelf: "flex-start", margin: "5px"}}>art credit: @leonnoel #100Devs</h3>
        </div>
    )
}
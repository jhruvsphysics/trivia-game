import React from "react"
import StartPage from "./Components/StartPage"
import TriviaPage from "./Components/TriviaPage"

export default function App() {
    const [start, setStart] = React.useState(true)
    
    function startButton() {
        setStart(false)
    }
    
    return(
        <main className="app">
            {
                start? 
                <StartPage handleClick={startButton}/> : 
                <TriviaPage/>
            }
        </main>
    )
}
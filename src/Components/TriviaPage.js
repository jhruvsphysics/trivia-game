import React from "react"
import Trivia from "./Trivia"
import life from './../onelife.png';


export default function TriviaPage() {
    const [trivia, setTrivia] = React.useState([])
    const [scoreboard, setScoreboard] = React.useState([])
    const [checkAnswerState, setCheckAnswerState] = React.useState(false)
    const [restartState, setRestartState] = React.useState(false)
    const [lifeState, setLifeState] = React.useState(3)
    const [gamePointsState, setGamePointsState] = React.useState([])
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)
    const [lifeStyleState, setLifeStyleState] = React.useState({height: "40px", margin: "0 0 0 10px"})
    let lifeStyle = {height: "40px", margin: "0 0 0 10px"}
    React.useEffect(() => {
        function watchWidth() {
            //console.log("resizing!!")
            setWindowWidth(window.innerWidth)
            //console.log(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth)

        return function () {
            //console.log("unmounting!!")
            window.removeEventListener("resize", watchWidth)
        }
    }, [])

    // Check for window resizing:
    React.useEffect(() => {
        if (windowWidth <= 750) {
            setLifeStyleState({
                height: "20px",
                margin: "0 20px 0 -15px"
            })
        } else {
            setLifeStyleState( {
                height: "40px",
                margin: "0 0 0 10px"
            })
        }

    }, [windowWidth])
    
    // Setting React states:
    function setStates(triviaData) {
        //console.log('setstate 2')
        setTrivia(
            triviaData.map(
                (datum, index) => returnTrivia(datum, index)
            )
        )
        setScoreboard(
            triviaData.map(
                (datum, index) => returnScoreboard(datum, index)
            )
        )
        setCheckAnswerState(false)
    }
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
        .then(response => response.json())
        .then(data => setStates(data.results))
    }, [restartState])
    
    
    //console.log('trivia:', trivia)
    //console.log('scoreboard:', scoreboard)
    
    
    
    function returnTrivia(datum, index) {
        //console.log('returnTrivia')
        let choicesDescription = datum.incorrect_answers.concat(datum.correct_answer)
        choicesDescription = randomizeArray(choicesDescription)
        choicesDescription = choicesDescription.map(desc => getRidOfSpecialChar(desc))
        //console.log(datum.incorrect_answers.concat(datum.correct_answer))
        //console.log(choicesDescription)
        choicesDescription = choicesDescription.map(
                (description, descIndex) => (
                    {id: index, 
                    order: descIndex, 
                    description: getRidOfSpecialChar(description)}
                    ))
        const triviaVal = {
            id: index,
            question: getRidOfSpecialChar(datum.question),
            choices: choicesDescription
        }
        //console.log('triviaVal:', triviaVal)
        return triviaVal
    }
    
    function returnScoreboard(datum, index) {
        //console.log('returnScoreboard')     
            const scoreboardVal = {
                id: index,
                selected: -1,
                correct: getRidOfSpecialChar(datum.correct_answer)
            }
            return scoreboardVal
    }
    function randomizeArray(array) {
        //console.log('randomizeArray')
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array
    }

    function getRidOfSpecialChar(sentence) {
        sentence = sentence.replace(/&quot;/g, '"')
                            .replace(/&#039;/g, "'")
                            .replace(/&amp;/g, "&")
                            .replace(/&Eacute;/g,"É")
                            .replace(/&iacute;/g,"í")
                            .replace(/&ouml;/g,"ö")
                            .replace(/&eacute;/g,"é")
                
        return sentence
    }

    function updateScore(myScore, order, description) {
        //console.log('updateScore!')
        setScoreboard(
            oldScore => oldScore.map(
                score => score.id==myScore.id? {...score, selected: order, description: description} : score
            )
        )
        //console.log(description)
        //console.log(myScore)
        //console.log('description === myScore.correct', description===myScore.correct)
    }
    //console.log('gamePoint!', gamePointsState)
    //console.log(lifeState)
    function checkAnswerClicked() {
        //console.log('checkAnswer!')
        setCheckAnswerState(oldCheckAnswerState => !oldCheckAnswerState)
        const numCorrect = scoreboard.filter(
            score => score.description == score.correct
        ).length
        //console.log('numCorrect', numCorrect)
        if (numCorrect != 5) {
            setLifeState(oldLife => oldLife-1)
            setGamePointsState(oldPoint => [...oldPoint, numCorrect])
        } else if (numCorrect == 5) {
            setGamePointsState(oldPoint => [...oldPoint, numCorrect*2])
        }
    }
    function restartTriviaClicked() {
        //console.log('restart!')
        setRestartState(oldState => !oldState)
        setGamePointsState([])
        setLifeState(3)
    }
    function nextTriviaClicked() {
        setRestartState(oldState => !oldState)
    }
    
    const triviaArray = trivia.map(
        (trv, index) => <Trivia 
                        id={index} 
                        trivia={trivia} 
                        scoreboard={scoreboard} 
                        checkAnswerState={checkAnswerState}
                        updateScore={updateScore}/>
    )
    
    function displayNextorRestart() {
        return (
            <span style={ {margin: "0 0 0 5%"} } >
                {lifeState>0?
                <button className="triviaPage--next-button" onClick={nextTriviaClicked}>Next</button>
                :
                <button className="triviaPage--restart-button" onClick={restartTriviaClicked}>Restart</button> }
            </span>
        )
    }
    function displayScore() {
        const numCorrect = scoreboard.filter(
            score => score.description == score.correct
        ).length
        return (
            <div style={ scoreStyle }>
                <span style={ {margin: "0 0 0 10%"} }>You scored {numCorrect}/{trivia.length} correct answers</span>
                {displayNextorRestart()}
            </div>
        )
    }
    function displayFooter() {
        return (
            <div style={ {margin: windowWidth>750? "0 50px auto 100px": "0 25px auto 100px"} }>
                <button className="triviaPage--check-button" onClick={checkAnswerClicked}>Check answers</button>
            </div>
            
        )
    }
    const lifeDisplayStyle = {
        height: "40px",
    }
    
    function displayLife() {
        let lifeArray = []
        for (let i=0; i<lifeState; i++){
            lifeArray.push( (<img 
                style={ lifeStyleState }
                src={life}/>) )
        }
        return (
            <div>{lifeArray}</div>
        )
    }
    const mainStyle = {
        display: "flex",
        alignItems: "flex-start"
    }
    const scoreStyle = {
        display: "flex",
        alignItems: "center"
    }
    //console.log(scoreboard)
    return (
        <main className="triviaPage" style={{paddingLeft: "10%"}}>
            {triviaArray}
            <div style={mainStyle}>
                {checkAnswerState?
                displayScore()
                :
                displayFooter()}
                <span 
                style={ lifeDisplayStyle } 
                className="triviaPage--life">
                    {lifeState == 0? 
                    <h2 style={ {display: "inline-block", margin: "10px 0 0 10px", fontSize: windowWidth>750? "1rem" : "inherit"} }>Your total points: {gamePointsState.reduce((partialSum, a) => partialSum + a, 0)}</h2>
                    :
                    <h3 style={ {display: "inline-block", margin: windowWidth>750? "0 0 0 10px" : "0 0 0 -20px"} }>Life Points:</h3>}
                    {displayLife()}
                </span>
            </div>
            
        </main> 
    )
}
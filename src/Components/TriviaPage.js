import React from "react"
import Trivia from "./Trivia"


export default function TriviaPage() {
    const [trivia, setTrivia] = React.useState([])
    const [scoreboard, setScoreboard] = React.useState([])
    const [checkAnswerState, setCheckAnswerState] = React.useState(false)
    const [restartState, setRestartState] = React.useState(false)
    
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

    function checkAnswerClicked() {
        //console.log('checkAnswer!')
        setCheckAnswerState(oldCheckAnswerState => !oldCheckAnswerState)
    }
    function restartTriviaClicked() {
        console.log('restart!')
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
    
    function displayScore() {
        const numCorrect = scoreboard.filter(
            score => score.description == score.correct
        ).length
        return (
            <div>
                <span style={ {margin: "0 0 0 10%"} }>You score {numCorrect}/{trivia.length} correct answers</span>
                <button style={ {margin: "0 0 0 5%"} } className="triviaPage--button" onClick={restartTriviaClicked}>Restart</button>
            </div>
        )
    }
    return (
        <main className="triviaPage">
            {triviaArray}
            {checkAnswerState?
            displayScore()
            : 
            <button className="triviaPage--button" onClick={checkAnswerClicked}>Check answers</button>}
            
        </main> 
    )
}
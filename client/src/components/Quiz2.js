import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import FillInTheBlank from "./FillInTheBlank";
import MultipleChoice from "./MultipleChoice";
import ComposeText from "./ComposeText";
import Result from "./Result";
import ImageDisplay from "./ImageDisplay";

const Quiz2 = ( {questions} ) => {

    const inputRef = useRef();
    const buttonRef = useRef(); 
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [redoIndex, setRedoIndex] = useState(0); 
    const [round, setRound] = useState(1)
    const [button, setButton] = useState("Check")
    const [answers, setAnswers] = useState({})
    const [redos, setRedos] = useState([])

    // useEffect(() => {
    //     if (currentQuestion < questions.length && questions[currentQuestion].type === "fillInTheBlank") {
    //         inputRef.current.focus();
    //     }
    //     }, [currentQuestion]);
    
    useEffect(() => {
        if (button === "Continue" && currentQuestion < questions.length)
        buttonRef.current.focus();
    }, [button])

    const calcPercent = () => {
            let num = 0;
            let denom = 0; 

                Object.keys(answers).forEach(key => {
                    if (answers[key].status !== "compose") {
                        denom++
                    }
                })
           
                Object.keys(answers).forEach(key => {
                    if (answers[key].status === "correct") {
                        num++
                    } 
                })

                return Math.round(num/denom*100)
            }

        // useEffect(() => {
        //     const listener = event => {
        //       if (event.code === "Enter" || event.code === "NumpadEnter") {
        //         console.log("Enter key was pressed. Run your function.");
        //         handleCheck(event); 
        //       }
        //     };
        //     document.addEventListener("keydown", listener);
        //     return () => {
        //       document.removeEventListener("keydown", listener);
        //     };
        //   }, [button]);

    const handleChange = (key, value) => {
        if (round === 1) {
            setAnswers({
                ...answers,
                [key]: {answer: value, firstAnswer: value, status: "none"},
                })
        }
        if (round === 2) {
            setAnswers({
                ...answers,
                [key]: {...answers[key], answer: value, status: "none", secondAnswer: value}
            })
        }
    } 

    const handleCheck = (e) => {
        e.preventDefault();
        if (round === 1) {

            if (button === "Check") {
                if (questions[currentQuestion].type === "fillInTheBlank") {
                    questions[currentQuestion].correctAnswers.forEach((answer, index) => {
                        if (answer.includes(answers[`${currentQuestion + 1}-${index+1}`].answer)) {
                                setAnswers(answers=>({...answers, [`${currentQuestion + 1}-${index+1}`] : {...answers[`${currentQuestion + 1}-${index+1}`], status: "correct", firstAnswerResult: "correct"}}))
                        } else {
                            setAnswers(answers=>({...answers, [`${currentQuestion + 1}-${index+1}`] : {...answers[`${currentQuestion + 1}-${index+1}`], status: "incorrect", firstAnswerResult: "incorrect"}}))
                                    //push question into ReDo array
                                    if (!redos.includes(currentQuestion)) {
                                    setRedos(redos=>([...redos, currentQuestion]))
                                    }
                        }})
                    }

                if (questions[currentQuestion].type === "multipleChoice") {
                    if (questions[currentQuestion].correctAnswers === answers[[`${currentQuestion + 1}-1`]].answer) {
                        setAnswers(answers=>({...answers, [[`${currentQuestion + 1}-1`]] : {...answers[[`${currentQuestion + 1}-1`]], status: "correct", firstAnswerResult: "correct"}}))
                    } else {
                        setAnswers(answers=>({...answers, [[`${currentQuestion + 1}-1`]] : {...answers[[`${currentQuestion + 1}-1`]], status: "incorrect", firstAnswerResult: "incorrect"}}))
                                //push question into ReDo array
                                if (!redos.includes(currentQuestion)) {
                                setRedos(redos=>([...redos, currentQuestion]))
                                }
                    }}

                if (questions[currentQuestion].type === "composeText") {
                    questions[currentQuestion].fragments.forEach((fragment, index) => {
                    setAnswers(answers=>({...answers, [`${currentQuestion + 1}-${index+1}`] : {answer: answers[`${currentQuestion + 1}-${index+1}`].firstAnswer, status: "compose"}}))
                    })
                }
                setButton("Continue")
            }   
            
            

            if (button === "Continue" && currentQuestion < questions.length - 1) {
                setButton("Check")
                setCurrentQuestion(currentQuestion + 1)  
            }

            if (button === "Continue" && currentQuestion === questions.length - 1) {
                
                redos.length > 0 ? setButton("Fix Mistakes") : setButton("Submit")
                setCurrentQuestion(currentQuestion + 1)  
            }
        }

        if (button === "Fix Mistakes") {
            setRound(2);
            setButton("Check")
            setCurrentQuestion(redos[0])
        }

        if (round === 2) {

            if (button === "Check") {
                if (questions[currentQuestion].type === "fillInTheBlank") {
                    questions[currentQuestion].correctAnswers.forEach((answer, index) => {
                        if (answer.includes(answers[`${currentQuestion + 1}-${index+1}`].answer)) {
                            setAnswers(answers=>({...answers, [`${currentQuestion + 1}-${index+1}`] : {...answers[`${currentQuestion + 1}-${index+1}`], status: "correct", secondAnswerResult: "correct"}}))
                        } else {
                            setAnswers(answers=>({...answers, [`${currentQuestion + 1}-${index+1}`] : {...answers[`${currentQuestion + 1}-${index+1}`], status: "incorrect", secondAnswerResult: "incorrect"}}))
                        }})
                    }

                if (questions[currentQuestion].type === "multipleChoice") {
                    if (questions[currentQuestion].correctAnswers === answers[[`${currentQuestion + 1}-1`]].answer) {
                        setAnswers(answers=>({...answers, [[`${currentQuestion + 1}-1`]] : {...answers[[`${currentQuestion + 1}-1`]], status: "correct", secondAnswerResult: "correct"}}))
                        } else {
                        setAnswers(answers=>({...answers, [[`${currentQuestion + 1}-1`]] : {...answers[[`${currentQuestion + 1}-1`]], status: "incorrect", secondAnswerResult: "incorrect"}}))
                    }
                    }
                setRedoIndex(redoIndex + 1); 
                setButton("Continue")
            }   

            if (button === "Continue" && redoIndex <= redos.filter((x,i) => redos.indexOf(x) === i).length - 1) {
                setButton("Check");
                setCurrentQuestion(redos.filter((x,i) => redos.indexOf(x) === i)[redoIndex])
            }

            if (button === "Continue" && redoIndex === redos.filter((x,i) => redos.indexOf(x) === i).length) {
                setCurrentQuestion(questions.length)
                setButton("Submit")
                }
        }    
    } 

    return (
        <Container>
            <div className="quizContainer">
                {
                    currentQuestion < questions.length &&
                    <p className="progress">Question {currentQuestion+1}/{questions.length}</p>
                }
                { button === "Fix Mistakes" 
                ? <div>
                    <p className="end">End of module. You scored {calcPercent()}%! </p>
                    <div className="buttonContainer">
                        <button onClick={handleCheck}>{button}</button>
                    </div>
                </div>
                :  button === "Submit"
                ? <>
                    <div>
                        <p className="end">End of module. You scored {calcPercent()}%! </p>
                        
                    </div>
                    <Result questions={questions} answers={answers}/>
                    <div className="buttonContainer">
                            <button onClick={handleCheck}>{button}</button>
                    </div> 
                </>
                :
                <>
                    <ImageDisplay images={questions[currentQuestion].images} />
                    <form onSubmit={handleCheck}>
                        { questions[currentQuestion].type === "fillInTheBlank" && 
                            <FillInTheBlank question={questions[currentQuestion]} button={button} handleChange={handleChange} answers={answers} inputRef={inputRef} currentQuestion={currentQuestion}/> 
                        }
                        { questions[currentQuestion].type === "multipleChoice" &&
                            <MultipleChoice question={questions[currentQuestion]} button={button} handleChange={handleChange} answers={answers} inputRef={inputRef} currentQuestion={currentQuestion} /> 
                        }
                        { questions[currentQuestion].type === "composeText" &&
                            <ComposeText question={questions[currentQuestion]} button={button} handleChange={handleChange} answers={answers} inputRef={inputRef} currentQuestion={currentQuestion} /> 
                        }
                        <br/>
                        <div className="buttonContainer">
                            <button type="submit" ref={buttonRef}>{button}</button>
                        </div>
                    </form>
                </>
                }
            </div> 
        </Container>
    )
}

const Container = styled.div`

font-family: Arial; 
display: flex; 
flex-direction: row; 
justify-content: center;
align-items: center;

// p {
//     margin-top: 5px;
//     margin-bottom: 5px;  
// }

.quizContainer {
    margin-top: 5px; 
    width: 80vw;
    padding: 20px; 
    min-height: 40px; 
    background-color: #b2e5ed; 
    box-shadow: 2px 2px 9px #888888;
}
.progress {
    margin-left: 0; 
    font-size: 1.2em; 
    font-weight: 700; 
    font-style: italic; 
}

.question {
    line-height: 1.6; 
    margin: 10px 0px 10px 0px; 
}

.end {
    text-align: center; 
    font-size: 1.4em; 
}

.buttonContainer {
    display: flex; 
    justify-content: center; 
}

button {
    font-family: Open Sans; 
}

label {
    padding: 2px; 
}

ol {
    list-style-type: upper-alpha;
    margin-left: 10px;  
    list-style-position: inside;
}

input, .composeText {
    font-family: Arial; 
}

.correct {
    background-color: green; 
    color: white;
    margin: 0px 3px 0px 3px;
    padding: 0px 3px 0px 3px; 
    font-size: 0.9em; 
    display: inline-block; 
    border-radius: 5px; 
}
.incorrect {
    background-color: red;
    color: white; 
    margin: 0px 3px 0px 3px;
    padding: 0px 3px 0px 3px; 
    font-size: 0.9em; 
    display: inline-block;
    border-radius: 5px; 
}
.regular {
    padding: 0px 3px 0px 3px; 
    
}
.compose {
    background-color: purple;
    color: white; 
    padding: 0px 3px 0px 3px; 
    font-size: 0.9em; 
    font-family: Open Sans; 
    display: inline-block; 
    border-radius: 5px; 
    
    
}
`

export default Quiz2; 
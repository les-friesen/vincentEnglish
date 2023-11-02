import styled from "styled-components";
import { useState, useRef } from "react";
import BuildFillInTheBlank from "./BuildFillInTheBlank";
import BuildComposeText from "./BuildComposeText";
import BuildMultipleChoice from "./BuildMultipleChoice";
import Quiz2 from "./Quiz2";

const BuildQuiz = () => {

    const [questions, setQuestions] = useState([])

    const [newQuestion, setNewQuestion] = useState(false)
    
    const [newQuestionType, setNewQuestionType] = useState("select")
    const [preview, setPreview] = useState(false)
    
    const handlePreview = () => {
        setPreview(!preview)
    }

    const handleAddNewQuestion = () => {
        setNewQuestion(!newQuestion)
        if (newQuestion === true) {
            setNewQuestionType("select");
        }
    }

    const handleSelectType = (type) => {
        setNewQuestionType(type)
    }

    const [isDragging, setIsDragging] = useState(); 
    const [isDraggable, setIsDraggable] = useState(true); 

    const handleMouseEnter = () => {
        setIsDraggable(false)
    }

    const handleMouseOut = () => {
        setIsDraggable(true)
    }

    const dragQuestion = useRef();
    const dragOverQuestion = useRef();
    
    const dragQuestionStart = (e, position) => {
        dragQuestion.current = position;
        setIsDragging(position)
        console.log(position)
    };

    const dragQuestionEnter = (e, position) => {
        dragOverQuestion.current = position; 
    };

    const dropQuestion = (e) => {
        const copyQuestions = [...questions];
        const dragQuestionContent = copyQuestions[dragQuestion.current];
        copyQuestions.splice(dragQuestion.current, 1);
        copyQuestions.splice(dragOverQuestion.current, 0, dragQuestionContent);
        dragQuestion.current = null;
        dragOverQuestion.current = null;
        setQuestions(copyQuestions);
        setIsDragging(); 
    };

    return (
        <Container>
            <div className="subContainer">
                <p className="title">Create a new module</p>
                { questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                        <div    className={`newQuestionContainer ${isDragging === index ? "isDragging" : ""}`}
                                key={index} 
                                onDragEnter={(e) => dragQuestionEnter(e, index)}
                                onDragEnd={dropQuestion}
                                onDragOver={(e) => {e.preventDefault()}}
                                onDragStart={(e) => dragQuestionStart(e, index)}
                                draggable={isDraggable}>
                            <span>{index+1}.  </span>           
                            { question.type === "fillInTheBlank" &&
                            <>
                                <span className="heading">Fill In The Blank</span>
                                <BuildFillInTheBlank 
                                        questions={questions} 
                                        setQuestions={setQuestions} 
                                        setNewQuestion={setNewQuestion} 
                                        setNewQuestionType={setNewQuestionType}
                                        initialFragments={question.fragments}
                                        initialQuestionText={question.questionText}
                                        initialCorrectAnswers={question.correctAnswers}
                                        questionIndex={index}
                                        handleMouseEnter={handleMouseEnter}
                                        handleMouseOut={handleMouseOut}
                                        />
                                </>
                            }
                            { question.type === "composeText" &&
                            <>
                                <span className="heading">Compose Text</span>
                                <BuildComposeText 
                                        questions={questions} 
                                        setQuestions={setQuestions} 
                                        setNewQuestion={setNewQuestion} 
                                        setNewQuestionType={setNewQuestionType}
                                        initialFragments={question.fragments}
                                        initialQuestionText={question.questionText}
                                        questionIndex={index}
                                        handleMouseEnter={handleMouseEnter}
                                        handleMouseOut={handleMouseOut}/> 
                                </>
                            }
                            { question.type === "multipleChoice" &&
                            <>
                                <span className="heading">Multiple Choice</span>
                                <BuildMultipleChoice 
                                        questions={questions} 
                                        setQuestions={setQuestions} 
                                        setNewQuestion={setNewQuestion} 
                                        setNewQuestionType={setNewQuestionType}
                                        initialQuestionText={question.question}
                                        initialCorrectAnswers={question.correctAnswers}
                                        initialOptions={question.options}
                                        questionIndex={index}
                                        handleMouseEnter={handleMouseEnter}
                                        handleMouseOut={handleMouseOut}/>
                            </>  
                            }  
                            
                        </div>
                        )
                    })
                }
                <button onClick={handleAddNewQuestion}>{newQuestion ? "Cancel" : "Add new question"}</button>
                {
                    newQuestion &&
                    <div className="newQuestionContainer">
                        <select name="type" id="type" onChange={(e) => handleSelectType(e.target.value)} style={{fontFamily: "Roboto"}}>
                            <option value="select">Choose Type of Question</option>
                            <option value="fillInTheBlank">Fill in the Blank</option>
                            <option value="multipleChoice">Multiple Choice</option>
                            <option value="composeText">Compose Text</option>
                        </select>
                        { newQuestionType === "fillInTheBlank" &&
                            <BuildFillInTheBlank questions={questions} setQuestions={setQuestions} setNewQuestion={setNewQuestion} setNewQuestionType={setNewQuestionType}/>
                        }
                        { newQuestionType === "composeText" &&
                            <BuildComposeText questions={questions} setQuestions={setQuestions} setNewQuestion={setNewQuestion} setNewQuestionType={setNewQuestionType}/> 
                        }
                        { newQuestionType === "multipleChoice" &&
                            <BuildMultipleChoice questions={questions} setQuestions={setQuestions} setNewQuestion={setNewQuestion} setNewQuestionType={setNewQuestionType}/>
                        }
                    </div>
                }
                <button type="button" onClick={handlePreview}>Preview Quiz</button>
                { preview &&    
                    <Quiz2 questions={questions}/>
                }
            </div> 
        </Container>
    )
}

const Container = styled.div`
font-family: Roboto; 
width: 100vw;
display: flex;

.subContainer {
    width: 100vw; 
    min-height: 100vh; 
    border: solid black 1px;
    background-color: white;  
    padding: 20px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
}

input, textarea {
    border: solid black 1px; 
}

.title {
    font-weight: bold; 
    font-size: 1.5em; 
    text-align: center;  
}

.isDragging {
    opacity: 0.3; 
}

.newQuestionContainer {
    transform: translate3d(0, 0, 0);
    padding: 20px; 
    width: 80vw; 
    border: solid black 1px; 
    background-color: lightblue; 
    margin-bottom: 10px; 
    border-radius: 5px; 
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.example {
    font-size: .7em;
    font-style: italic; 
}

.heading {
    font-weight: bold; 
}

.inputDiv {
    line-height: 1;
}

p {
    margin: 10px 0px 10px 0px; 
}

button {
    margin-top: 10px; 
    font-family: Roboto; 
    background-color: lightyellow;
    border: solid grey 1px; 
    border-radius: 5px; 
    height: 22px; 
}
`

export default BuildQuiz; 
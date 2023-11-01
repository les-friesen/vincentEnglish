import styled from "styled-components"
import { useState, useEffect } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from "react-icons/fi";

const BuildFillInTheBlank = ({questions, setQuestions, setNewQuestion, setNewQuestionType, initialQuestionText, initialFragments, initialCorrectAnswers, questionIndex, handleMouseEnter, handleMouseOut}) => {
    
    const [fragments, setFragments] = useState([])
        // () => {
    //     if (!initialFragments) {
    //         return []
    //     } else {
    //         return initialFragments
    //     }
    // });

    const [questionText, setQuestionText] = useState("")
    //     () => {
    //     if (!initialQuestionText) {
    //         return ""
    //     } else {
    //         return initialQuestionText
    //     }
    // });

    const [correctAnswers, setCorrectAnswers] = useState([])
    //     () => {
    //     if (!initialCorrectAnswers) {
    //         return []
    //     } else {
    //         return initialCorrectAnswers
    //     }
    // });

    useEffect(() => {
        if (!initialFragments) {
            setFragments([])
        } else {
            setFragments(initialFragments)
        }
    }, [initialFragments]);

    useEffect(() => {
        if (!initialQuestionText) {
            setQuestionText("")
        } else {
            setQuestionText(initialQuestionText)
        }
    }, [initialQuestionText]);

    useEffect(() => {
        if (!initialCorrectAnswers) {
            setCorrectAnswers([])
        } else {
            setCorrectAnswers(initialCorrectAnswers)
        }
      }, [initialCorrectAnswers]);

    const handleChange = (value) => {
        setQuestionText(value)
    }

    const handleVerifyText = () => {
        setFragments((questionText.split("*").map(str => str.trim())))
        let answers = [...correctAnswers].slice(0, questionText.split("*").length - 1)
        setCorrectAnswers(answers)
    }

    const handleAnswerChange = (id, value) => {
        let answers = [...correctAnswers]
        if (value.includes(",")) {
            answers[id] = value.split(/,\s*/)
        } else {
        answers[id] = [value]
        }
        setCorrectAnswers(answers)
    }

    const deleteQuestion = () => {
        let newArray = [...questions]
        newArray.splice(questionIndex, 1)
        setQuestions(newArray)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (questionIndex >= 0) {
            const editedQuestions = [...questions]
            editedQuestions[questionIndex] = {
                    type: "fillInTheBlank",
                    fragments: fragments,
                    questionText: questionText, 
                    correctAnswers: correctAnswers
                }
                setQuestions(editedQuestions)
            } else {
            setQuestions(
                [...questions, {
                    type: "fillInTheBlank",
                    fragments: fragments,
                    questionText: questionText, 
                    correctAnswers: correctAnswers
                }]
            )
            setNewQuestion(false)
            setNewQuestionType("select")
            }
    }

    return (
        <FillInTheBlankForm onSubmit={handleSubmit}> 
            <p>Write the complete text in the box below. Add an asterisk, *, wherever you'd like to add a blank. <br></br>
                <span className="example">Example: She (throw) * away the letter that she (write) * . </span></p>
            <TextareaAutosize   onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseOut} 
                                required 
                                minRows={3} 
                                style={{width: "98%", fontFamily: "Roboto"}} 
                                value={questionText} onChange={(e) => handleChange(e.target.value)}/>
                <button     type="button" 
                            disabled={questionText === initialQuestionText} 
                            onClick={handleVerifyText}>
                        Verify Text
                </button>
                    {
                        fragments.length > 0 &&
                        <>
                        <p>Enter the correct answers for each blank below, in order. If there are multiple acceptable answers for a blank, separate them with a comma, without spaces. Answers will be case and spelling sensitive.</p>
                            {fragments.map((fragment,index) => {
                                return (
                                    <div className="inputDiv" key={index}>    
                                    { 
                                    index !== fragments.length - 1 && 
                                        <>
                                        <br></br>
                                        <span>Answer(s) for blank #{index + 1}  </span>
                                        <input 
                                            required
                                            id={index}
                                            style={{fontFamily: "Roboto"}}
                                            value={correctAnswers[index] ? correctAnswers[index] : ""}
                                            key={index}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseOut}
                                            onChange={(e) => handleAnswerChange(e.target.id, e.target.value)}
                                            type="text" /> 
                                        </>
                                    }
                                    </div>
                                )
                            })
                            }
                            <div className="saveDeleteContainer">
                                <button type="submit" 
                                        className="submitButton"
                                        disabled={correctAnswers.toString() === initialCorrectAnswers?.toString() && questionText === initialQuestionText 
                                                ? true 
                                                : correctAnswers.length < fragments.length - 1 
                                                ? true 
                                                : false}>
                                        Save Question
                                </button>
                                <button 
                                            type="button"
                                            className="trash" 
                                            onClick={deleteQuestion}
                                            disabled={questionIndex >= 0 ? false : true} 
                                            > 
                                        <FiTrash2 size={15}/>
                                </button>
                            </div>
                        </>
                    }
        </FillInTheBlankForm>
        )
}

const FillInTheBlankForm = styled.form`

.trash {
    background-color: transparent;
    border: none; 
    margin-top: 0px; 
}

.saveDeleteContainer {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-top: 10px; 
}

.submitButton {
    margin-top: 0px; 
}

`

export default BuildFillInTheBlank
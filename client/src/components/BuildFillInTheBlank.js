import styled from "styled-components"
import { useState, useEffect } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from "react-icons/fi";
import { TagsInput } from "react-tag-input-component";

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
    const [addAnswers, setAddAnswers] = useState([])

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
    
    // const handleAnswerChange = (id, value) => {
    //     let answers = [...correctAnswers]
    //     if (value.includes(",")) {
    //         answers[id] = value.split(/,\s*/)
    //     } else {
    //     answers[id] = [value]
    //     }
    //     setCorrectAnswers(answers)
    // }

    const handleAnswerChange = (id, value) => {
        let answers = [...addAnswers]
        answers[id] = value
        setAddAnswers(answers)
    }

    const handleAddAnswer = (index) => {
        let correct = [...correctAnswers]
        if (correct[index]) {
            correct[index] = [...correctAnswers[index], addAnswers[index]]
        } else {
            correct[index] = [addAnswers[index]]
        }
        setCorrectAnswers(correct)
        let add = [...addAnswers]
        add[index] = ""
        setAddAnswers(add) 
    }

    const deleteAnswer = (index, ansIndex) => {
        let newArray = [...correctAnswers[index]]
        newArray.splice(ansIndex, 1)

        let newAnswers = [...correctAnswers]
        newAnswers[index] = newArray
        setCorrectAnswers(newAnswers)
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
            <p>Write the complete text in the box below. Add an asterisk, *, wherever you'd like to add a blank. Then click "Verify Text" to generate answer inputs for each blank. You can edit and re-verify the text at any time. <br></br>
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
                        <p>Enter the correct answers for each blank below, in order. If there are multiple acceptable answers for a blank, separate them with a comma. Answers are case and spelling sensitive (be careful of unwanted spaces!)</p>
                            {fragments.map((fragment,index) => {
                                return (
                                    <div className="inputDiv" key={index}>    
                                    { 
                                    index !== fragments.length - 1 && 
                                        <>
                                        <br></br>
                                        <span>Answer(s) for blank #{index + 1}</span>
                                        <input 
                                            id={index}
                                            style={{fontFamily: "Roboto"}}
                                            value={addAnswers[index] ? addAnswers[index] : ""}
                                            key={index}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseOut}
                                            onChange={(e) => handleAnswerChange(e.target.id, e.target.value)}
                                            type="text" /> 
                                        <button className="addAnswer" type="button" onClick={() => handleAddAnswer(index)}>Add Answer</button>
                                        {correctAnswers[index]?.map((ans, ansIndex) => {
                                            return(
                                                <div className="answer">
                                                    <span>{ans}</span>
                                                    <button type="button" onClick={() => deleteAnswer(index, ansIndex)} className="trash"><FiTrash2 size={12}/></button>
                                                </div>
                                        )}
                                        )}
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
                                                : !correctAnswers.every(ans => ans.length > 0)
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
    margin-top: 2px; 
    height: 20px;
    
}

.inputDiv {
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    margin-bottom: 10px; 
    flex-wrap: wrap; 
    line-height: 1.6; 
}

.saveDeleteContainer {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-top: 10px; 
}

.submitButton, .addAnswer {
    margin-top: 0px;
}

.answer {
    background-color: pink;
    font-size: 0.8em; 
    border-radius: 5px; 
    margin: 1px 0px 1px 5px;  
    padding-left: 5px; 
    border: solid grey 1px; 
    height: 20px; 
    display: flex;
    flex-direction: row;
    align-items: center; 
}

input {
    margin: 0px 5px 0px 5px; 
}

`

export default BuildFillInTheBlank
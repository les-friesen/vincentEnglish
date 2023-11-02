import styled from "styled-components"
import { useState, useEffect } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from "react-icons/fi";

const BuildComposeText = ({questions, setQuestions, setNewQuestion, setNewQuestionType, initialFragments, initialQuestionText, questionIndex, handleMouseEnter, handleMouseOut}) => {
    
    const [fragments, setFragments] = useState([])
    //     () => {
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
    // }
    // );

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

    const handleChange = (value) => {
        setQuestionText(value)
    }

    const handleVerifyText = () => {
        setFragments((questionText.split("*").map(str => str.trim())))
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
                    type: "composeText",
                    fragments: fragments,
                    questionText: questionText, 
                    correctAnswers: []
            }
            setQuestions(editedQuestions)
        } else {
            setQuestions(
                [...questions, {
                    type: "composeText",
                    fragments: fragments,
                    questionText: questionText, 
                    correctAnswers: []
                }]
            )
            setNewQuestion(false)
            setNewQuestionType("select")
        }
    }

    return (
        <ComposeTextForm onSubmit={handleSubmit}> 
            <p>Write one or more text prompts in the box below. For multiple prompts, add an asterisk, *, to separate them. Click verify text before saving.<br></br>
                <span className="example">Example: What is your favourite song? * Who is your favourite artist? </span></p>
            <TextareaAutosize 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseOut} 
                    required minRows={3} 
                    style={{width: "98%", fontFamily: "Roboto"}} 
                    value={questionText} 
                    onChange={(e) => handleChange(e.target.value)}/>
            <button type="button" 
                    disabled={questionText === initialQuestionText} 
                    onClick={handleVerifyText}>
                    Verify Text
            </button> 
            <div className="saveDeleteContainer">   
                <button type="submit" 
                        className="submitButton"
                        disabled={fragments === initialFragments
                                    ? true 
                                    : fragments.length > 0 ? 
                                    false 
                                    : true}>
                    Save Question
                </button>
                <button className="trash" 
                        onClick={deleteQuestion}
                        disabled={questionIndex >= 0 ? false : true} 
                        type="button"> 
                    <FiTrash2 size={15}/>
                </button>
            </div>    
        </ComposeTextForm>
        )
}

const ComposeTextForm = styled.form`

.submitButton {
    margin-top: 0px; 
}

.saveDeleteContainer {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-top: 10px; 
}

.trash {
    background-color: transparent;
    border: none; 
    margin-top: 0px; 
}

`

export default BuildComposeText; 
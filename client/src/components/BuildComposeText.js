import styled from "styled-components"
import { useState } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const BuildComposeText = ({questions, setQuestions, setNewQuestion, setNewQuestionType, initialFragments, initialQuestionText, questionIndex}) => {
    
    const [fragments, setFragments] = useState(() => {
        if (!initialFragments) {
            return []
        } else {
            return initialFragments
        }
    });
    const [questionText, setQuestionText] = useState(() => {
        if (!initialQuestionText) {
            return ""
        } else {
            return initialQuestionText
        }
    }

    );

    const handleChange = (value) => {
        setQuestionText(value)
    }

    const handleVerifyText = () => {
        setFragments((questionText.split("*").map(str => str.trim())))
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
            <p>Write one or more text prompts in the box below. For multiple prompts, add an asterisk, *, to separate them. <br></br>
                <span className="example">Example: What is your favourite song? * Who is your favourite artist? </span></p>
            <TextareaAutosize required minRows={3} style={{width: "98%", fontFamily: "Roboto"}} value={questionText} onChange={(e) => handleChange(e.target.value)}/>
                <button type="button" onClick={handleVerifyText}>Verify Text</button> 
                <button type="submit" disabled={fragments === initialFragments? true : fragments.length > 0 ? false : true}>Save Question</button>
        </ComposeTextForm>
        )
}

const ComposeTextForm = styled.form`

`

export default BuildComposeText; 
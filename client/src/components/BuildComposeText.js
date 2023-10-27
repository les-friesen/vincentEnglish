import styled from "styled-components"
import { useState } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const BuildComposeText = ({questions, setQuestions, setNewQuestion, setNewQuestionType}) => {
    
    const [fragments, setFragments] = useState([]);
    const [questionText, setQuestionText] = useState("");

    const handleChange = (value) => {
        setQuestionText(value)
    }

    const handleVerifyText = () => {
        setFragments((questionText.split("*").map(str => str.trim())))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuestions([...questions, {
            type: "composeText",
            fragments: fragments,
            correctAnswers: []
        }])
        setNewQuestion(false)
        setNewQuestionType("select")
    }

    return (
        <form onSubmit={handleSubmit}> 
            <p>Write one or more text prompts in the box below. For multiple prompts, add an asterisk, *, to separate them. <br></br>
                <span className="example">Example: What is your favourite song? * Who is your favourite artist? </span></p>
            <TextareaAutosize required minRows={3} style={{width: "98%", fontFamily: "Roboto"}} onChange={(e) => handleChange(e.target.value)}/>
                <button type="button" onClick={handleVerifyText}>Verify Text</button> 
                <button type="submit" disabled={fragments.length > 0 ? false : true}>Save Question</button>
        </form>
        )
}

export default BuildComposeText; 
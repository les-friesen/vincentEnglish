import styled from "styled-components"
import { useState } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const BuildFillInTheBlank = ({questions, setQuestions, setNewQuestion, setNewQuestionType}) => {
    
    const [fragments, setFragments] = useState([]);
    const [questionText, setQuestionText] = useState("");
    const [correctAnswers, setCorrectAnswers] = useState([])

    const handleChange = (value) => {
        setQuestionText(value)
    }

    const handleVerifyText = () => {
        setFragments((questionText.split("*").map(str => str.trim())))
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuestions([...questions, {
            type: "fillInTheBlank",
            fragments: fragments,
            correctAnswers: correctAnswers
        }])
        setNewQuestion(false)
        setNewQuestionType("select")
    }

    return (
        <form onSubmit={handleSubmit}> 
            <p>Write the complete text in the box below. Add an asterisk, *, wherever you'd like to add a blank. <br></br>
                <span className="example">Example: She (throw) * away the letter that she (write) * . </span></p>
            <TextareaAutosize required minRows={3} style={{width: "98%", fontFamily: "Roboto"}} onChange={(e) => handleChange(e.target.value)}/>
                <button type="button" onClick={handleVerifyText}>Verify Text</button>
                    {
                        fragments.length > 0 &&
                        <>
                        <p>Enter the correct answers for each blank below, in order. If there are multiple acceptable answers for a blank, separate them with a comma. Answers will be case and spelling sensitive.</p>
                            {fragments.map((fragment,index) => {
                                return (
                                    <div className="inputDiv">    
                                    { 
                                    index !== fragments.length - 1 && 
                                        <>
                                        <br></br>
                                        <span>Answer for blank #{index + 1}  </span>
                                        <input 
                                            required
                                            id={index}
                                            key={index}
                                            onChange={(e) => handleAnswerChange(e.target.id, e.target.value)}
                                            type="text" /> 
                                        </>
                                    }
                                    </div>
                                )
                            })
                            }
                            <button type="submit" disabled={correctAnswers.length === fragments.length - 1 ? false : true}>Save Question</button>
                        </>
                    }
        </form>
        )
}

export default BuildFillInTheBlank
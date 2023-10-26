import styled from "styled-components";
import { useState, useEffect } from "react";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';

const BuildQuiz = () => {

    const [questions, setQuestions] = useState([])
    const [fragments, setFragments] = useState([])
    const [questionText, setQuestionText] = useState("")

    const [newQuestion, setNewQuestion] = useState(false)

    const [newQuestionType, setNewQuestionType] = useState("select")
    
    const handleAddNewQuestion = () => {
        setNewQuestion(!newQuestion)
    }

    const handleSelectType = (type) => {
        setNewQuestionType(type)
    }

    const handleChange = (value) => {
        setQuestionText(value)
    }

    const handleVerifyText = () => {
        setFragments((questionText.split("*").map(str => str.trim())))
    }

    return (
        <Container>
            <div className="subContainer">
                <p className="title">Create a new module</p>
                {/* Map existing questions here */}
                <button onClick={handleAddNewQuestion}>{newQuestion ? "Cancel" : "Add new question"}</button>
                {
                    newQuestion &&
                    <div className="newQuestionContainer">
                        <select name="type" id="type" onChange={(e) => handleSelectType(e.target.value)} style={{fontFamily: "OpenSans"}}>
                            <option value="select">Choose Type of Question</option>
                            <option value="fillInTheBlank">Fill in the Blank</option>
                            <option value="multipleChoice">Multiple Choice</option>
                            <option value="composeText">Compose Text</option>
                        </select>
                        { newQuestionType === "fillInTheBlank" &&
                            <>
                                <p>Write the complete text in the box below. Add an asterisk, *, wherever you'd like to add a blank. <br></br>
                                    <span className="example">Example: She (throw) * away the letter that she (write) * . </span></p>
                                <TextareaAutosize minRows={3} style={{width: "98%", fontFamily: "Open Sans"}} onChange={(e) => handleChange(e.target.value)}/>
                                <button onClick={handleVerifyText}>Verify Text</button>
                                {
                                    fragments.length > 0 &&
                                        fragments.map((fragment,index) => {
                                          
                                            return (
                                                <>
                                                { 
                                                index !== fragments.length - 1 && 
                                                    <>
                                                    <br></br>
                                                    <input type="text" /> 
                                                    </>
                                                }
                                                </>
                                            )
                                        
                                        })
                                }
                            </>
                        }
                    </div>
                }
            </div> 
        </Container>

    )
}

const Container = styled.div`

font-family: Open Sans; 
width: 100%;
height: 100%;
display: flex;
justify-content: center;

.subContainer {
    width: 85%; 
    border: solid black 1px;
    background-color: lightblue; 
    padding: 20px; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    align-items: center; 
}

.title {
    font-weight: bold; 
    font-size: 1.5em; 
    text-align: center; 
}

.newQuestionContainer {
    margin: 20px; 
    padding: 20px; 
    width: 70%;
    border: solid black 1px; 
    background-color: lightyellow; 

}

.example {
    font-size: .7em;
    font-style: italic; 
}


`

export default BuildQuiz; 
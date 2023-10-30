import styled from "styled-components"
import { useState } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from 'react-icons/fi'; 

const BuildMultipleChoice = ({questions, setQuestions, setNewQuestion, setNewQuestionType, initialQuestionText, initialCorrectAnswers, initialOptions, questionIndex}) => {
    
    const [options, setOptions] = useState(() => {
        if (!initialOptions) {
            return []
        } else {
            return initialOptions
        }
    });
    const [questionText, setQuestionText] = useState(() => {
        if (!initialQuestionText) {
            return ""
        } else {
            return initialQuestionText
        }
    })
    const [correctAnswers, setCorrectAnswers] = useState(() => {
        if (!initialCorrectAnswers) {
            return ""
        } else {
            return initialCorrectAnswers
        }
    });

    const [addOption, setAddOption] = useState("");

    const handleChange = (value) => {
        setQuestionText(value)
    }

    const handleOptionChange = (e) => {
        setAddOption(e.target.value)
    }

    const handleAddOption = () => {
        addOption.length > 0 && 
        setOptions([...options, addOption ])
        setAddOption("")
    }

    const handleAnswerChange = (value) => {
        setCorrectAnswers(value)
    }

    const deleteOption = (index) => {
        let newArray = [...options]
        newArray.splice(index, 1)
        setOptions(newArray)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionIndex >= 0) {
            const editedQuestions = [...questions]
            editedQuestions[questionIndex] = {
                    type: "multipleChoice",
                    question: questionText,
                    options: options,
                    correctAnswers: correctAnswers 
                }
                setQuestions(editedQuestions)
            } else {
            setQuestions(
                [...questions, {
                    type: "multipleChoice",
                    question: questionText,
                    options: options,
                    correctAnswers: correctAnswers 
                }]
            )
            setNewQuestion(false)
            setNewQuestionType("select")
            }
    }

    return (
        <MultipleChoiceForm onSubmit={handleSubmit}> 
            <p>Write a question in the text box below, and add between 2 and 6 multiple choice options in the inputs below. Select the correct answer from the options.</p> 
            <TextareaAutosize required minRows={3} style={{width: "98%", fontFamily: "Roboto"}} value={questionText} onChange={(e) => handleChange(e.target.value)}/>
                <button type="button" disabled={options?.length >= 6 ? true : false} onClick={handleAddOption}>Add Option</button> 
                <input type="text" value={addOption} onChange={handleOptionChange}></input>
                <p className="options-title"> Options ({options.length}/6) </p>
                <ol>
                            { options?.map((option, index) => {
                                return (
                                    <div className="optionContainer" key={index}>
                                    <li >
                                            <input  type="radio" 
                                            name="choice" 
                                            className="choice"
                                            onChange={(e) => handleAnswerChange(e.target.value)}
                                            checked={correctAnswers === option ? true : false}
                                            required
                                            value={option}/>
                                        <label htmlFor="choice" 
                                            >{option}</label>
                                        <button type="button" onClick={() => deleteOption(index)} className="trash"><FiTrash2 size={15}/></button>
                                        
                                    </li>
                                    </div>
                                )
                            })}
                 </ol>
                <button type="submit" disabled={options === initialOptions && correctAnswers === initialCorrectAnswers && questionText === initialQuestionText ? true : options.length >= 2 ? false : true}>Save Question</button>
        </MultipleChoiceForm>
        )
}

const MultipleChoiceForm = styled.form`

ol {
    list-style-type: upper-alpha;
    margin-left: 10px;  
    list-style-position: inside;
   
}

li {
    line-height: 1.6;
    display: list-item; 
    
}

.choice { 
    margin-top: 0px; 
}

.trash {
    background-color: transparent;
    border: none; 
   
    margin-top: 0px; 
}

.optionContainer {
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    
}

.options-title {
    color: green; 
}



`

export default BuildMultipleChoice; 
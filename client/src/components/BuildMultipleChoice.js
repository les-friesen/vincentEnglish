import styled from "styled-components"
import { useState, useRef, useEffect } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from 'react-icons/fi'; 

const BuildMultipleChoice = ({questions, setQuestions, setNewQuestion, setNewQuestionType, initialQuestionText, initialCorrectAnswers, initialOptions, questionIndex, handleMouseEnter, handleMouseOut}) => {
    
    const [options, setOptions] = useState([])
    //     () => {
    //     if (!initialOptions) {
    //         return []
    //     } else {
    //         return initialOptions
    //     }
    // });
    const [questionText, setQuestionText] = useState("")
    //     () => {
    //     if (!initialQuestionText) {
    //         return ""
    //     } else {
    //         return initialQuestionText
    //     }
    // })
    const [correctAnswers, setCorrectAnswers] = useState([])
    //     () => {
    //     if (!initialCorrectAnswers) {
    //         return ""
    //     } else {
    //         return initialCorrectAnswers
    //     }
    // });
    useEffect(() => {
        if (!initialOptions) {
            setOptions([])
        } else {
            setOptions(initialOptions)
        }
    }, [initialOptions]);

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

    const [addOption, setAddOption] = useState("");

    const dragOption = useRef();
    const dragOverOption = useRef();
    
    const dragOptionStart = (e, position) => {
        dragOption.current = position;  
    };
     
    const dragOptionEnter = (e, position) => {
        dragOverOption.current = position;  
    };

    const drop = (e) => {
        const copyOptions = [...options];
        const dragOptionContent = copyOptions[dragOption.current];
        copyOptions.splice(dragOption.current, 1);
        copyOptions.splice(dragOverOption.current, 0, dragOptionContent);
        dragOption.current = null;
        dragOverOption.current = null;
        setOptions(copyOptions);
    };
    
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
            <p>Write a question in the text box below.</p>
            <TextareaAutosize   required 
                                onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseOut} 
                                minRows={3} 
                                style={{width: "98%", fontFamily: "Roboto"}} 
                                value={questionText} 
                                onChange={(e) => handleChange(e.target.value)}/>
                <p> Add between 2-6 options, one at a time, by entering text in the input below and clicking "Add Option". Options can be reordered via drag and drop or deleted. Select the correct answer before saving.</p> 
                <button type="button" disabled={options?.length >= 6 ? true : false} onClick={handleAddOption}>Add Option</button> 
                <input  onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseOut} 
                        type="text" 
                        className="addOption"
                        value={addOption} 
                        onChange={handleOptionChange}>
                </input>
                <p className="options-title"> Options ({options.length}/6) </p>
                <ol>
                            { options?.map((option, index) => {
                                return (
                                    <div className="optionContainer" 
                                        
                                        key={index}>
                                    <li onDragStart={(e) => dragOptionStart(e, index)}
                                        onDragEnter={(e) => dragOptionEnter(e, index)}
                                        onDragEnd={drop}
                                        className="listItem"
                                        onDragOver={(e) => e.preventDefault()}
                                        draggable>
                                            <input  type="radio" 
                                            name="choice" 
                                            className="choice"
                                            onChange={(e) => handleAnswerChange(e.target.value)}
                                            checked={correctAnswers === option ? true : false}
                                            required
                                            value={option}/>
                                        <label htmlFor="choice" 
                                            >{option}</label>
                                        <button type="button" onClick={() => deleteOption(index)} className="trash"><FiTrash2 size={13}/></button>
                                        
                                    </li>
                                    </div>
                                )
                            })}
                 </ol>
                 <div className="saveDeleteContainer">
                    <button type="submit" 
                            className="submitButton"
                            disabled={options === initialOptions && 
                            correctAnswers === initialCorrectAnswers && 
                            questionText === initialQuestionText 
                            ? true 
                            : options.length >= 2 ? 
                            false 
                            : true}>
                            Save Question
                    </button>
                    <button className="trash" 
                            onClick={deleteQuestion}
                            type="button">
                            <FiTrash2 size={15}/>
                    </button>
                </div>
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
    margin-bottom: 5px; 
    display: list-item; 
    min-width: 120px; 
}

.choice { 
    margin-top: 0px; 
}

.listItem {
    background-color: pink;
    font-size: 0.9em; 
    border-radius: 5px; 
    margin-left: 5px; 
    padding-left: 5px; 
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

.addOption {
    margin-left: 5px; 
}

.options-title {
    color: green; 
}

.submitButton {
    margin-top: 0px; 
}

.saveDeleteContainer {
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-top: 10px; 
}


`

export default BuildMultipleChoice; 
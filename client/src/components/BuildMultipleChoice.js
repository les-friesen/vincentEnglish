import styled from "styled-components"
import { useState, useRef, useEffect } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from 'react-icons/fi'; 
import ImageUpload from "./ImageUpload";
import { Editor } from '@tinymce/tinymce-react'

const BuildMultipleChoice = ({questions, setQuestions, quizId, updateQuiz, hasImages, setHasImages, setNewQuestion, setNewQuestionType, initialQuestionText, initialCorrectAnswers, initialOptions, initialImages, questionIndex, handleMouseEnter, handleMouseOut}) => {
    
    const [options, setOptions] = useState([])
    const [questionText, setQuestionText] = useState("")
    const [correctAnswers, setCorrectAnswers] = useState("")
    const [images, setImages] = useState([])
    const editorRef = useRef(null);

    useEffect(() => {
        if (!initialImages) {
            setImages([])
        } else {
            setImages(initialImages)
        }
    }, [initialImages]);

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
            setCorrectAnswers("")
        } else {
            setCorrectAnswers(initialCorrectAnswers)
        }
    }, [initialCorrectAnswers]);

    const [addOption, setAddOption] = useState("");
    const dragOption = useRef();
    const dragOverOption = useRef();
    
    const dragOptionStart = (e, position) => {
        e.stopPropagation();
        dragOption.current = position;  
    };

    const dragOptionEnter = (e, position) => {
        e.stopPropagation();
        dragOverOption.current = position;  
    };

    const drop = (e) => {
        e.stopPropagation();
        const copyOptions = [...options];
        const dragOptionContent = copyOptions[dragOption.current];
        copyOptions.splice(dragOption.current, 1);
        copyOptions.splice(dragOverOption.current, 0, dragOptionContent);
        dragOption.current = null;
        dragOverOption.current = null;
        setOptions(copyOptions);
    };
    
    // const handleChange = (value) => {
    //     setQuestionText(value)
    // }

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
        if (options.length === 1 || options[index] === correctAnswers) {
            setCorrectAnswers("")
        }
        let newArray = [...options]
        newArray.splice(index, 1)
        setOptions(newArray)
    }

    const deleteQuestion = () => {
        if (questionIndex >= 0 && JSON.stringify(images) !== JSON.stringify(initialImages)) {
            alert("Delete newly added images (or save changes) before deleting question")
        } else {
        let newArray = [...questions]
        newArray.splice(questionIndex, 1)
        // setQuestions(newArray)
        updateQuiz({questions: newArray})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionIndex >= 0) {
            const editedQuestions = [...questions]
            editedQuestions[questionIndex] = {
                    type: "multipleChoice",
                    question: questionText,
                    options: options,
                    correctAnswers: correctAnswers,
                    images: images
                }
                updateQuiz({questions: editedQuestions})
                // setQuestions(editedQuestions)
            } else {
            const editedQuestions = 
                [...questions, {
                    type: "multipleChoice",
                    question: questionText,
                    options: options,
                    correctAnswers: correctAnswers,
                    images: images
                }]
            updateQuiz({questions: editedQuestions})
            setNewQuestion(false)
            setNewQuestionType("select")
            setHasImages(false)
            console.log("just set has images to false")
            }
    }

    return (
        <MultipleChoiceDiv> 
            <ImageUpload questionIndex={questionIndex} setImages={setImages} images={images} hasImages={hasImages} setHasImages={setHasImages}/>
            <p className="para">Write a question in the text box below.</p>
            <Editor
                apiKey='hggy776ed6votmeb2cy185ot2xr1ube1k8ol325vqtqk2lz7'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialQuestionText}
                value={questionText}
                onEditorChange={(newValue, editor) => setQuestionText(newValue)}
                init={{
                height: 200,
                menubar: "false", 
                forced_root_block : 'false',
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | ' +
                'bold italic forecolor backcolor ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                
                }}
            />
            {/* <button onClick={log}>Log editor content</button> */}
            {/* <TextareaAutosize   required 
                                onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseOut} 
                                minRows={3} 
                                style={{width: "98%", fontFamily: "Roboto"}} 
                                value={questionText} 
                                onChange={(e) => handleChange(e.target.value)}/> */}
                <p className="para"> Add between 2-6 options, one at a time, by entering text in the input below and clicking "Add Option". Options can be reordered via drag and drop or deleted. Select the correct answer before saving.</p> 
                <input  onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseOut} 
                        type="text" 
                        className="addOption"
                        value={addOption} 
                        onChange={handleOptionChange}>
                </input>
                <button type="button" disabled={options?.length >= 6 ? true : false} onClick={handleAddOption}>Add Option</button>
                <p className="para options-title"> Options ({options.length}/6) </p>
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
                                    <button 
                                        type="button" 
                                        onClick={() => deleteOption(index)} 
                                        className="trash">
                                            <FiTrash2 size={13}/>
                                    </button>
                                </li>
                            </div>
                        )
                    })}
                </ol>
                <div className="saveDeleteContainer">
                    <button type="button" 
                            onClick={handleSubmit}
                            className="submitButton"
                            disabled={options === initialOptions && 
                            correctAnswers === initialCorrectAnswers && 
                            questionText === initialQuestionText &&
                            JSON.stringify(images) === JSON.stringify(initialImages)
                            ? true 
                            : questionText.length > 0 && options.length >= 2 && correctAnswers.length > 0
                            ? false 
                            : true}>
                            Save Question
                    </button>
                    <button className="trash" 
                            onClick={deleteQuestion}
                            type="button">
                            <FiTrash2 size={15}/>
                    </button>
                </div>
        </MultipleChoiceDiv>
        )
}

const MultipleChoiceDiv = styled.div`

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
    align-self: center; 
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
    height: 20px;
    line-height: 0px; 
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
    margin-right: 5px; 
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
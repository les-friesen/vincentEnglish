import styled from "styled-components"
import { useState, useEffect, useRef } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from "react-icons/fi";
import ImageUpload from "./ImageUpload";
import { Editor } from "@tinymce/tinymce-react";

const BuildFillInTheBlank = ({questions, setQuestions, quizId, updateQuiz, setNewQuestion, setNewQuestionType, hasImages, setHasImages, initialQuestionText, initialFragments, initialCorrectAnswers, initialImages, questionIndex, handleMouseEnter, handleMouseOut}) => {
    
    const [fragments, setFragments] = useState([])
    const [questionText, setQuestionText] = useState("")
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [images, setImages] = useState([])
    const [addAnswers, setAddAnswers] = useState([])
    const editorRef = useRef(null);

    useEffect(() => {
        if (!initialFragments) {
            setFragments([])
        } else {
            setFragments(initialFragments)
        }
    }, [initialFragments]);

    useEffect(() => {
        if (!initialImages) {
            setImages([])
        } else {
            setImages(initialImages)
        }
    }, [initialImages]);

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

        if (!questionText.includes("_")) {
            alert("Include at least one blank in your question")
        } else {
        // setFragments(questionText.split(/\s*_+\s*/g))
        setFragments(questionText.split("_"))
        let answers = [...correctAnswers].slice(0, questionText.split("_").length - 1)
        setCorrectAnswers(answers)
        }
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
        if (addAnswers[index] !== "") {
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
    }

    const deleteAnswer = (index, ansIndex) => {
        let newArray = [...correctAnswers[index]]
        newArray.splice(ansIndex, 1)
        let newAnswers = [...correctAnswers]
        newAnswers[index] = newArray
        setCorrectAnswers(newAnswers)
    }

    const deleteQuestion = () => {
        if (questionIndex >= 0 && JSON.stringify(images) !== JSON.stringify(initialImages)) {
            alert("Delete newly added images (or save changes) before deleting question")
        } else {
        let newArray = [...questions]
        newArray.splice(questionIndex, 1)
        updateQuiz({questions: newArray})
        // setQuestions(newArray)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (questionIndex >= 0) {
            const editedQuestions = [...questions]
            editedQuestions[questionIndex] = {
                    type: "fillInTheBlank",
                    fragments: fragments,
                    questionText: questionText, 
                    correctAnswers: correctAnswers,
                    images: images
                }
                updateQuiz({questions: editedQuestions})
                // setQuestions(editedQuestions)
            } else {

            const editedQuestions = 
                [...questions, {
                    type: "fillInTheBlank",
                    fragments: fragments,
                    questionText: questionText, 
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

    // const updateQuiz = async (theData) => {
    //     setIsLoading("loading");
    //     try {
    //         // const token = await getAccessTokenSilently();
    //         const response = await fetch(`/api/updateQuiz/${quizId}`, {
    //             method: "PATCH",
    //             headers : {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //                 // "authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(theData)
    //             })
    //         const data = await response.json();
    //             console.log(data)
    //             setIsLoading("")
    //             setReload(data)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <FillInTheBlankDiv> 
            <ImageUpload questionIndex={questionIndex} setImages={setImages} images={images} hasImages={hasImages} setHasImages={setHasImages}/>
            <p className="para"> Write the complete text in the box below. Add a single underscore, _, wherever you'd like to add a blank. Then click "Verify Text" to generate answer inputs for each blank. 
                You can edit and re-verify the text at any time. For best results, stop any rich text settings (bold, italic, etc.) before adding a new blank (blanks should not be rich text).  
            </p>
            <p className="para example">
                Example: She <strong>(throw)</strong> ____ away the letter that she <strong>(write)</strong> ____ .    
            </p>
            <Editor
                apiKey='hggy776ed6votmeb2cy185ot2xr1ube1k8ol325vqtqk2lz7'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialQuestionText}
                value={questionText}
                onEditorChange={(newValue, editor) => setQuestionText(newValue)}
                init={{
                height: 200,
                forced_root_block : 'false',
                menubar: 'false',
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
            {/* <TextareaAutosize   onMouseEnter={handleMouseEnter} 
                                onMouseLeave={handleMouseOut} 
                                required 
                                minRows={3} 
                                style={{width: "98%", fontFamily: "Roboto"}} 
                                value={questionText} onChange={(e) => handleChange(e.target.value)}/> */}
                <button     type="button" 
                            disabled={questionText === initialQuestionText 
                                ? true 
                                : fragments.join("_") === questionText 
                                ? true
                                : false } 
                            onClick={handleVerifyText}>
                        Verify Text
                </button>
                    {
                        fragments.length > 0 &&
                        <>
                            <hr></hr>
                            <p className="para">Enter the correct answers for each blank below, one at a time, by entering text in the corresponding input and clicking "Add Answer". 
                                Answers can be deleted, and each blank must have at least one answer. Answers are case and spelling sensitive (be careful of unwanted spaces!)</p>
                            {fragments.map((fragment,index) => {
                                return (
                                    <div key={fragment + index}>
                                    { 
                                    index !== fragments.length - 1 && 
                                        <div className="inputDiv" key={index}> 
                                            <br></br>
                                            <span>Answer(s) for blank #{index + 1}</span>
                                            <input 
                                                id={index}
                                                style={{fontFamily: "Arial"}}
                                                value={addAnswers[index] ? addAnswers[index] : ""}
                                                key={index}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseOut}
                                                onChange={(e) => handleAnswerChange(e.target.id, e.target.value)}
                                                type="text" /> 
                                            <button className="addAnswer" type="button" onClick={() => handleAddAnswer(index)}>Add Answer</button>
                                            {correctAnswers[index]?.map((ans, ansIndex) => {
                                                return(
                                                    <div key={ans + ansIndex} className="answer">
                                                        <span>{ans}</span>
                                                        <button type="button" onClick={() => deleteAnswer(index, ansIndex)} className="trash"><FiTrash2 size={12}/></button>
                                                    </div>
                                            )}
                                            )}
                                        </div> 
                                    }
                                    </div>
                                )
                            })
                            }
                            <hr></hr>
                            <div className="saveDeleteContainer">
                                <button type="button" 
                                        className="submitButton"
                                        onClick={handleSubmit}
                                        disabled={correctAnswers.toString() === initialCorrectAnswers?.toString() && questionText === initialQuestionText && JSON.stringify(images) === JSON.stringify(initialImages)
                                                ? true 
                                                : correctAnswers.length < fragments.length - 1 
                                                ? true 
                                                : !correctAnswers.every(ans => ans.length > 0)
                                                ? true
                                                : fragments.join("_") !== questionText
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
        </FillInTheBlankDiv>
        )
}

const FillInTheBlankDiv = styled.div`

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

.submitButton, .addAnswer, .addImages {
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
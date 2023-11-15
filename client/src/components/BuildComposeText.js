import styled from "styled-components"
import { useState, useEffect, useRef } from "react"
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { FiTrash2 } from "react-icons/fi";
import ImageUpload from "./ImageUpload";
import { Editor } from "@tinymce/tinymce-react";

const BuildComposeText = ({questions, setQuestions, setNewQuestion, setNewQuestionType, initialFragments, initialQuestionText, initialImages, questionIndex, handleMouseEnter, handleMouseOut}) => {
    
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

    // const handleChange = (value) => {
    //     setQuestionText(value)
    // }

    const handleVerifyText = () => {
        setFragments((questionText.split(/_+/g)))
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
                    correctAnswers: [],
                    images: images
            }
            setQuestions(editedQuestions)
        } else {
            setQuestions(
                [...questions, {
                    type: "composeText",
                    fragments: fragments,
                    questionText: questionText, 
                    correctAnswers: [],
                    images: images
                }]
            )
            setNewQuestion(false)
            setNewQuestionType("select")
        }
    }

    return (
        <ComposeTextDiv> 
            <ImageUpload setImages={setImages} images={images}/>
            <p className="para">Write one or more text prompts in the box below. For multiple prompts, add an underscore, _, to separate them. Click "Verify Text" before saving. 
                For best results, stop any rich text settings (bold, italic, etc.) before adding a new blank (blanks should not be rich text).
                <br></br> 
                <br></br>
                <span className="example">
                    Example: What is your favourite <strong>song?</strong> _ Who is your favourite <strong>artist?</strong> 
                </span>
            </p>
            <Editor
                apiKey='hggy776ed6votmeb2cy185ot2xr1ube1k8ol325vqtqk2lz7'
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={initialQuestionText}
                value={questionText}
                onEditorChange={(newValue, editor) => setQuestionText(newValue)}
                init={{
                height: 200,
                menubar: false,
                forced_root_block : 'false',
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor backcolor ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            {/* <TextareaAutosize 
                    onMouseEnter={handleMouseEnter} 
                    onMouseLeave={handleMouseOut} 
                    required minRows={3} 
                    style={{width: "98%", fontFamily: "Roboto"}} 
                    value={questionText} 
                    onChange={(e) => handleChange(e.target.value)}/> */}
            <button type="button" 
                    disabled={questionText === initialQuestionText 
                        ? true
                        : fragments.join("_") === questionText
                        ? true 
                        : false} 
                    onClick={handleVerifyText}>
                    Verify Text
            </button> 
            
            <div className="saveDeleteContainer">   
                <button type="submit" 
                        onClick={handleSubmit}
                        className="submitButton"
                        disabled={fragments === initialFragments && JSON.stringify(images) === JSON.stringify(initialImages)
                                    ? true 
                                    : fragments.join("_") !== questionText
                                    ? true
                                    : fragments.length > 0 
                                    ? false 
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
        </ComposeTextDiv>
        )
}

const ComposeTextDiv = styled.div`

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
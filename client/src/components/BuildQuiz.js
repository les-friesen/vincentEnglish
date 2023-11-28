import styled from "styled-components";
import { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom"
import BuildFillInTheBlank from "./BuildFillInTheBlank";
import BuildComposeText from "./BuildComposeText";
import BuildMultipleChoice from "./BuildMultipleChoice";
import Quiz2 from "./Quiz2";
import { ReloadContext } from "./ReloadContext";
import { CircularProgress } from "@mui/material";

const BuildQuiz = () => {

    const { quizId } = useParams();
    const navigate = useNavigate(); 
    const [questions, setQuestions] = useState([]);
    const [quizData, setQuizData] = useState({title: "", subtitle: "", _id: ""});
    const [newQuizData, setNewQuizData] = useState({title: "", subtitle: ""});
    const [newQuestion, setNewQuestion] = useState(false);
    const [newQuestionType, setNewQuestionType] = useState("select");
    const [preview, setPreview] = useState(false);
    const [isDragging, setIsDragging] = useState(); 
    const [isDraggable, setIsDraggable] = useState(true); 
    const [hasImages, setHasImages] = useState(false); 

    const { reload, setReload, isLoading, setIsLoading } = useContext(ReloadContext); 
    
    
    const getQuiz = async () => {
        if (isLoading === "") {
        setIsLoading("loading");
        }
        try {
            // const token = await getAccessTokenSilently();
            const response = await fetch(`/api/getQuizById/${quizId}`, 
                // { headers : {
                //     "authorization" : `Bearer ${token}`
                // }}
                )
            const data = await response.json();
            if (data.status !== 200) {
                console.log(data)
                // navigate("/");
                setIsLoading("");
            }
            else {
                setQuizData({title: data.data.title, subtitle: data.data.subtitle, _id: data.data._id });
                setNewQuizData({title: data.data.title, subtitle: data.data.subtitle, _id: data.data._id });
                setQuestions(data.data.questions)
                setIsLoading("");
            } 
        } catch (error) {
            console.log(error);
            // navigate("/");
            setIsLoading("");
        }
    };
    
    useEffect(() => {
        getQuiz(); 
        console.log("Rerender triggered reload")
    }, [reload])

    const handlePreview = () => {
        setPreview(!preview)
    }

    const handleFormChange = (id, value) => {
        setNewQuizData({
            ...newQuizData,
            [id] : value
        }) 
    }

    const handleChangeTitle = () => {
        updateQuiz(newQuizData, "updateTitle")
    }

    const handleAddNewQuestion = () => {
        if (newQuestion && hasImages) {
            alert("Delete all images before cancelling!")
        } else if (newQuestion) {
            setNewQuestionType("select");
            setNewQuestion(!newQuestion)
        } else {
            setNewQuestion(!newQuestion)
        }
    }

    const handleSelectType = (type) => {
        setNewQuestionType(type)
    }

    const handleMouseEnter = () => {
        setIsDraggable(false)
    }

    const handleMouseOut = () => {
        setIsDraggable(true)
    }

    const dragQuestion = useRef();
    const dragOverQuestion = useRef();

    const dragQuestionStart = (e, position) => {
        dragQuestion.current = position;
        setIsDragging(position)
        console.log(position)
    };

    const dragQuestionEnter = (e, position) => {
        dragOverQuestion.current = position; 
    };

    const dropQuestion = (e) => {
        
        const copyQuestions = [...questions];
        const dragQuestionContent = copyQuestions[dragQuestion.current];
        copyQuestions.splice(dragQuestion.current, 1);
        copyQuestions.splice(dragOverQuestion.current, 0, dragQuestionContent);
        dragQuestion.current = null;
        dragOverQuestion.current = null;
        setQuestions(copyQuestions);
        updateQuiz({questions: copyQuestions}, "questionOrderChange")
        setIsDragging(); 
    };

    //Function for adding the expense when hitting the "add expense" button. 
    const updateQuiz = async (theData, loadingMessage) => {
        setIsLoading(loadingMessage);
        try {
            // const token = await getAccessTokenSilently();
            const response = await fetch(`/api/updateQuiz/${quizId}`, {
                method: "PATCH",
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                    // "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(theData)
                })
            const data = await response.json();
                console.log(data)
                // setIsLoading("")
                setReload(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            {   isLoading === "loading"
            ?   <ProgressDiv>
                    <CircularProgress /> 
                </ProgressDiv>
            :   <div className="subContainer">
                    <p className="title para">Edit Module</p>
                    <div className="newQuestionContainer">
                            <div className="introInputDiv">
                                <label>Title</label>
                                <input  type="text"
                                        id="title"
                                        value={newQuizData.title}
                                        onChange={(e) => handleFormChange(e.target.id, e.target.value)}
                                        />
                            </div>
                            <div className="introInputDiv">
                                <label>Subtitle</label>
                                <input  type="text"
                                        id="subtitle"
                                        value={newQuizData.subtitle}
                                        onChange={(e) => handleFormChange(e.target.id, e.target.value)}
                                        />
                            </div>
                            <div className="introInputDiv">
                                <label>ID</label>
                                <input  type="text"
                                        id="_id"
                                        disabled
                                        value={quizData._id}
                                        onChange={(e) => handleFormChange(e.target.id, e.target.value)}
                                        />
                            </div>
                            <button
                                className="updateTitle"
                                disabled={quizData.title === newQuizData.title && quizData.subtitle === newQuizData.subtitle}
                                onClick={handleChangeTitle}>
                                    {
                                        isLoading === "updateTitle" 
                                        ? <CircularProgress size={11} />
                                        : "Update Title/Subtitle"
                                    }
                            </button>
                    </div>
                    <button type="button" 
                            disabled={questions.length < 1 || newQuestion} 
                            onClick={handlePreview}>
                                {preview ? "Cancel Preview" : "Preview Quiz"}
                    </button>
                    { preview &&    
                        <Quiz2 questions={questions}/>
                    }
                    { questions.length > 0 && !preview && 
                        questions.map((question, index) => {
                            return (
                            <div    className={`newQuestionContainer ${isDragging === index ? "isDragging" : ""}`}
                                    key={index} 
                                    onDragEnter={(e) => dragQuestionEnter(e, index)}
                                    onDragEnd={dropQuestion}
                                    onDragOver={(e) => {e.preventDefault()}}
                                    onDragStart={(e) => dragQuestionStart(e, index)}
                                    draggable={isDraggable}>
                                <span>{index+1}.  </span>           
                                { question.type === "fillInTheBlank" &&
                                <>
                                    <span className="heading">Fill In The Blank</span>
                                    <BuildFillInTheBlank 
                                            questions={questions} 
                                            quizId={quizId}
                                            updateQuiz={updateQuiz}
                                            setQuestions={setQuestions} 
                                            setNewQuestion={setNewQuestion} 
                                            setNewQuestionType={setNewQuestionType}
                                            initialFragments={question.fragments}
                                            initialQuestionText={question.questionText}
                                            initialCorrectAnswers={question.correctAnswers}
                                            initialImages={question.images}
                                            questionIndex={index}
                                            handleMouseEnter={handleMouseEnter}
                                            handleMouseOut={handleMouseOut}
                                            />
                                    </>
                                }
                                { question.type === "composeText" &&
                                <>
                                    <span className="heading">Compose Text</span>
                                    <BuildComposeText 
                                            questions={questions} 
                                            // hasImages={hasImages}
                                            // setHasImages={setHasImages}
                                            quizId={quizId}
                                            updateQuiz={updateQuiz}
                                            setQuestions={setQuestions} 
                                            setNewQuestion={setNewQuestion} 
                                            setNewQuestionType={setNewQuestionType}
                                            initialFragments={question.fragments}
                                            initialQuestionText={question.questionText}
                                            initialImages={question.images}
                                            questionIndex={index}
                                            handleMouseEnter={handleMouseEnter}
                                            handleMouseOut={handleMouseOut}/> 
                                    </>
                                }
                                { question.type === "multipleChoice" &&
                                <>
                                    <span className="heading">Multiple Choice</span>
                                    <BuildMultipleChoice 
                                            questions={questions} 
                                            quizId={quizId}
                                            updateQuiz={updateQuiz}
                                            // hasImages={hasImages}
                                            // setHasImages={setHasImages}
                                            setQuestions={setQuestions} 
                                            setNewQuestion={setNewQuestion} 
                                            setNewQuestionType={setNewQuestionType}
                                            initialQuestionText={question.question}
                                            initialCorrectAnswers={question.correctAnswers}
                                            initialOptions={question.options}
                                            initialImages={question.images}
                                            questionIndex={index}
                                            handleMouseEnter={handleMouseEnter}
                                            handleMouseOut={handleMouseOut}/>
                                </>  
                                }  
                                
                            </div>
                            )
                        })
                    }
                    {!preview && 
                    <button onClick={handleAddNewQuestion}>{newQuestion ? "Cancel" : "Add New Question"}</button>
                    }
                    {
                        newQuestion &&
                        <div className="newQuestionContainer">
                            <select name="type" disabled={hasImages ? true : false} id="type" onChange={(e) => handleSelectType(e.target.value)} style={{fontFamily: "Arial"}}>
                                <option value="select">Choose Type of Question</option>
                                <option value="fillInTheBlank">Fill in the Blank</option>
                                <option value="multipleChoice">Multiple Choice</option>
                                <option value="composeText">Compose Text</option>
                            </select>
                            { newQuestionType === "fillInTheBlank" &&
                                <BuildFillInTheBlank 
                                    quizId={quizId}
                                    updateQuiz={updateQuiz}
                                    questions={questions} 
                                    hasImages={hasImages}
                                    setHasImages={setHasImages}
                                    setQuestions={setQuestions} 
                                    setNewQuestion={setNewQuestion} 
                                    setNewQuestionType={setNewQuestionType}/>
                            }
                            { newQuestionType === "composeText" &&
                                <BuildComposeText 
                                    quizId={quizId}
                                    updateQuiz={updateQuiz}
                                    questions={questions} 
                                    hasImages={hasImages}
                                    setHasImages={setHasImages}
                                    setQuestions={setQuestions} 
                                    setNewQuestion={setNewQuestion} 
                                    setNewQuestionType={setNewQuestionType}/> 
                            }
                            { newQuestionType === "multipleChoice" &&
                                <BuildMultipleChoice 
                                    quizId={quizId}
                                    questions={questions} 
                                    updateQuiz={updateQuiz}
                                    setQuestions={setQuestions}
                                    hasImages={hasImages}
                                    setHasImages={setHasImages} 
                                    setNewQuestion={setNewQuestion} 
                                    setNewQuestionType={setNewQuestionType}/>
                            }
                        </div>
                    }  
                </div> 
            }
        </Container>
    )
}

const ProgressDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center; 
`

const Container = styled.div`
font-family: Arial; 
width: 100vw;
display: flex;

.subContainer {
    width: 100vw; 
    min-height: 100vh; 
    border: solid black 1px;
    background-color: white;  
    padding: 20px; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
}

.introInputDiv {
    display: flex; 
    flex-direction: row; 
    justify-content: space-between; 
    width: 250px; 
    margin-bottom: 5px; 
    input {
        width: 175px; 
    }
}

input, textarea {
    border: solid black 1px; 
    font-family: Arial; 
}

.title {
    font-weight: bold; 
    font-size: 1.5em; 
    text-align: center;  
}

.isDragging {
    opacity: 0.3; 
}

.newQuestionContainer {
    transform: translate3d(0, 0, 0);
    padding: 20px; 
    width: 80vw; 
    border: solid black 1px; 
    background-color: lightblue; 
    margin-bottom: 10px; 
    border-radius: 5px; 
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.example {
    font-size: .8em;
    font-style: italic; 
}

.heading {
    font-weight: bold; 
}

.inputDiv {
    line-height: 1;
}

.para {
    margin: 10px 0px 10px 0px; 
}

.updateTitle {
    width: 135px; 
}

button {
    margin-top: 10px; 
    font-family: Arial; 
    background-color: lightyellow;
    border: solid grey 1px; 
    border-radius: 5px; 
    height: 22px; 
}
`

export default BuildQuiz; 
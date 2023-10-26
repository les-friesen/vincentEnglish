// import { useState } from "react";
// import { useRef } from "react";
// import { useEffect } from "react";
// import styled from "styled-components";

// const Quiz = ( {questions, correctAnswers} ) => {

//     const inputRef = useRef();
//     const buttonRef = useRef(); 
//     const [currentQuestion, setCurrentQuestion] = useState(0);
//     const [redoIndex, setRedoIndex] = useState(0); 
//     const [round, setRound] = useState(1)
//     const [button, setButton] = useState("Check")
//     const [answers, setAnswers] = useState({})
//     const [redos, setRedos] = useState([])

//     useEffect(() => {
//         if (currentQuestion < questions.length) {
//             inputRef.current.focus();
//         }
//         }, [currentQuestion]);
    
//     useEffect(() => {
//         if (button === "Continue" && currentQuestion < questions.length)
//         buttonRef.current.focus();
//     }, [button])

//     const calcPercent = () => {
//             let num = 0;
//             const denom = Object.keys(answers).length; 
//                 Object.keys(answers).forEach(key => {
//                     if (answers[key].status === "correct") {
//                         num++
//                     } 
//                 })
//                 return Math.round(num/denom*100)
//             }

//         // useEffect(() => {
//         //     const listener = event => {
//         //       if (event.code === "Enter" || event.code === "NumpadEnter") {
//         //         console.log("Enter key was pressed. Run your function.");
//         //         handleCheck(event); 
//         //       }
//         //     };
//         //     document.addEventListener("keydown", listener);
//         //     return () => {
//         //       document.removeEventListener("keydown", listener);
//         //     };
//         //   }, [button]);

//     const handleChange = (key, value) => {
//         if (round === 1) {
//             setAnswers({
//                 ...answers,
//                 [key]: {answer: value, firstAnswer: value, status: "none"},
//                 })
//         }
//         if (round === 2) {
//             setAnswers({
//                 ...answers,
//                 [key]: {...answers[key], answer: value, status: "none", secondAnswer: value}
//             })
//         }
//     } 

//     const handleCheck = (e) => {
//         e.preventDefault();
//         if (round === 1 && button === "Check") {

//         Object.keys(answers).forEach(key => {
//             if (correctAnswers[key].includes(answers[key].answer)) {
//                 setAnswers(answers=>({...answers, [key] : {...answers[key], status: "correct", firstAnswerResult: "correct"}}))
//             } else  {
//                 setAnswers(answers=>({...answers, [key] : {...answers[key], status: "incorrect", firstAnswerResult: "incorrect"}}))
//                 //push question into ReDo array
//                 if (!redos.includes(+key.split("-")[0]-1)) {
//                 setRedos(redos=>([...redos, +key.split("-")[0]-1]))
//                 }
//             }
//         })  
//         setButton("Continue")
//     } 
//         if (round === 1 && button === "Continue" && currentQuestion < questions.length - 1) {
//             setButton("Check")
//             setCurrentQuestion(currentQuestion + 1)  
//         }

//         if (round === 1 && button === "Continue" && currentQuestion === questions.length - 1) {
            
//             redos.length > 0 ? setButton("Fix Mistakes") : setButton("Submit Answers")
//             setCurrentQuestion(currentQuestion + 1)  
//         }

//         if (button === "Fix Mistakes") {
//             setRound(2);
//             setButton("Check")
//             setCurrentQuestion(redos[0])
//         }

//         if (round === 2 && button === "Check") {
//             Object.keys(answers).forEach(key => {
//                 if (correctAnswers[key].includes(answers[key].answer)) {
//                     setAnswers(answers=>({...answers, [key] : {...answers[key], status: "correct", secondAnswerResult: "correct"}}))
//                 } else  {
//                     setAnswers(answers=>({...answers, [key] : {...answers[key], status: "incorrect", secondAnswerResult: "incorrect"}}))
//                 }
//             })  
//             setButton("Continue")
//             setRedoIndex(redoIndex + 1); 
//         } 

//         if (round === 2 && button === "Continue" && redoIndex <= redos.filter((x,i) => redos.indexOf(x) === i).length - 1) {
//             setButton("Check");
//             setCurrentQuestion(redos.filter((x,i) => redos.indexOf(x) === i)[redoIndex])
//         }

//         if (round === 2 && button === "Continue" && redoIndex === redos.filter((x,i) => redos.indexOf(x) === i).length) {
//             setCurrentQuestion(questions.length)
//             setButton("Submit")
//             }
//         }
    

    

//     return (
//         <Container>
//             <div className="quizContainer">
//                 {
//                     currentQuestion < questions.length &&
//                     <p className="progress">Question {currentQuestion+1}/{questions.length}</p>
//                 }
//                 { button === "Fix Mistakes" || button === "Submit"
//                 ? <div>
//                     <p>End of module. You scored {calcPercent()}%! </p>
//                     <div className="buttonContainer">
//                         <button onClick={handleCheck}>{button}</button>
//                     </div>
//                 </div>
//                 :  
//                 <form onSubmit={handleCheck}>
//                     <p className="question">
//                     {
//                     questions[currentQuestion].map( (fragment, index) => {
//                         return (
//                             <>  
//                                     <span> {fragment} </span>
//                                     { index < questions[currentQuestion].length - 1 && 
//                                         <input 
//                                             required
//                                             type="text"
//                                             disabled={button === "Check" ? false : true}
//                                             ref={index === 0 ? inputRef : null}
//                                             className={answers[`${currentQuestion+1}-${index+1}`] ? answers[`${currentQuestion+1}-${index+1}`].status : "regular"}
//                                             id={`${currentQuestion+1}-${index+1}`}
//                                             value={answers[`${currentQuestion+1}-${index+1}`] ? answers[`${currentQuestion+1}-${index+1}`].answer : ""}
//                                             onChange={(e) => handleChange(e.target.id, e.target.value)}
//                                             ></input>
//                                     }
//                             </>
//                         )
//                     })   
//                     }
//                     </p>
//                     <br/>
//                     <div className="buttonContainer">
//                         <button type="submit" ref={buttonRef}
//                             // onClick={handleCheck}
//                             >{button}</button>
//                     </div>
//                 </form>
//                 }
//             </div> 
//         </Container>
//     )
// }

// const Container = styled.div`


// display: flex; 
// flex-direction: row; 
// justify-content: center;
// align-items: center;

// p {
//     margin: 5px; 
// }

// .quizContainer {
//     margin-top: 5px; 
//     width: 80vw;
//     padding: 10px; 
//     min-height: 40px; 
//     background-color: lightblue;
//     border-radius: 15px; 
//     border: solid black 5px; 
// }
// .progress {
//     font-weight: 700; 
//     font-style: italic; 
// }

// .question {
//     line-height: 1.6; 
// }

// .buttonContainer {
//     display: flex; 
//     justify-content: center; 
// }

//     .correct {
//         background-color: green; 
//         color: white;
//     }
//     .incorrect {
//         background-color: red;
//         color: white; 
//     }


// `

// export default Quiz; 
// import styled from "styled-components"; 
// import { assignment1 } from "../data";
// import { useState } from "react";

// const Assignment = () => {

//     const [formData, setFormData] = useState({}); 
//     const [attempts, setAttempts] = useState(0); 

//     const handleChange = (key, value) => {
//         setFormData({
//             ...formData,
//             [key]: {answer: value, status: "none"},
//             })
//     } 
    
//     const calcPercent = () => {
//         let num = 0;
//         const denom = Object.keys(assignment1.answers).length; 
//         Object.keys(assignment1.answers).forEach(key => {
//             if (formData[key].status === "correct") {
//                 num++
//             } 
//         })
//         return Math.round(num/denom*100)
//     }

//     const handleSubmit = (e) => {
        
//         e.preventDefault(); 

//         Object.keys(assignment1.answers).forEach(key => {
//             console.log(assignment1.answers[key])
//             console.log(formData[key].answer)
//             if (assignment1.answers[key] === formData[key].answer) {
//                 setFormData(formData=>({...formData, [key] : {answer: formData[key].answer, status: "correct"}}))
//             } else {
//                 setFormData(formData=>({...formData, [key] : {answer: formData[key].answer, status: "incorrect"}}))
//             }
//             setAttempts(attempts+1)
//         })
//     }

//     return (
//         <Container>
//             <div>
//                 <p className="title">{assignment1.title}</p>
//                 <p className="subtitle">{assignment1.subtitle}</p>
//                 <form onSubmit={handleSubmit}>
//                     { 
//                     assignment1.questions.map( (question,index) => {
//                         return (
//                             <p className="question">
//                                 <span>{index+1}. </span>
//                                 {
//                                     question.map((string, strIndex) => {
//                                         return (
//                                             <>
//                                                 <span> {string} </span>
//                                                 { strIndex < question.length - 1 && 
//                                                 <input 
//                                                     required
//                                                     type="text"
//                                                     className={formData[`${index+1}-${strIndex+1}`] ? formData[`${index+1}-${strIndex+1}`].status : "regular" }
//                                                     id={`${index+1}-${strIndex+1}`}
//                                                     onChange={(e) => handleChange(e.target.id, e.target.value)}
//                                                     ></input>
//                                                 }
//                                             </>
//                                         )
//                                     })
//                                 }
//                             </p>
//                         )
//                         })
//                     }
//                     <button>{ attempts > 0 ? "Try Again" : "Check Answers" }</button>
//                 </form>
//                 {attempts > 0 && <p>Your score is {calcPercent()}%! </p>}
//             </div>
//         </Container>
//     )
// }

// const Container = styled.div`

// font-family: arial; 
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center; 

// div {
// padding: 20px; 
// background-color: lightblue; 
// width: 90vw; 
//     .title {
//         text-align: center; 
//         font-size: 2em; 
//         font-weight: 800; 
//     }
//     .subtitle {
//         font-style: italic; 
//         font-size: 1.4em; 
//     }
//     .question {
//         line-height: 1.4; 
//     }
//     .correct {
//         background-color: green; 
//         color: white;
//     }
//     .incorrect {
//         background-color: red;
//         color: white; 
//     }
    
// }

// `

// export default Assignment; 
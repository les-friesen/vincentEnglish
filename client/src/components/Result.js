import styled from "styled-components"; 
import React from "react";


const Result = ( {questions, answers} ) => {

    return (
            <Container>
                {
                    questions.map( (question,index) => {
                        return (
                            <div className="question" key={index}>
                                 <span>{index+1}. </span>  
                                    {question.type === "fillInTheBlank" &&
                                        question.fragments.map((fragment, fragIndex) => {
                                            return (
                                                <React.Fragment key={fragment + fragIndex}>
                                                    <span dangerouslySetInnerHTML={{__html: fragment}}></span>
                                                    { fragIndex < question.fragments.length - 1 && 
                                                    <>
                                                        <span className={answers[`${index + 1}-${fragIndex + 1}`].firstAnswerResult}>
                                                            {`(1) ${answers[`${index + 1}-${fragIndex + 1}`].firstAnswer}`}
                                                        </span>     
                                                        { answers[`${index + 1}-${fragIndex + 1}`].secondAnswer &&
                                                        <span className={answers[`${index + 1}-${fragIndex + 1}`].secondAnswerResult}>
                                                            {`(2) ${answers[`${index + 1}-${fragIndex + 1}`].secondAnswer}`}
                                                        </span>
                                                        }
                                                        {answers[`${index + 1}-${fragIndex + 1}`].secondAnswerResult === "incorrect" &&
                                                        <span className="correct">
                                                            {`(answer) ${question.correctAnswers[fragIndex][0]}`}
                                                        </span>
                                                        }
                                                    </>
                                                    }  
                                                </React.Fragment>
                                            )
                                        })
                                    }
                                    {
                                        question.type === "multipleChoice" &&
                                        <> 
                                            <span dangerouslySetInnerHTML={{__html: question.question}}></span>
                                            <ol type="A">
                                                    {
                                                    question.options.map((option) => {
                                                        return (
                                                            <li key={option}>
                                                                <input  type="radio" 
                                                                        disabled={true}
                                                                        name="choice" 
                                                                        checked={answers[`${index + 1}-1`].firstAnswerResult === option 
                                                                            ? true 
                                                                            : answers[`${index + 1}-1`].secondAnswerResult === option 
                                                                            ? true 
                                                                            : false}
                                                                        value={option}/>
                                                                <label htmlFor="choice" 
                                                                        className={answers[`${index + 1}-1`].firstAnswer === option 
                                                                            ? answers[`${index + 1}-1`].firstAnswerResult 
                                                                            : answers[`${index + 1}-1`].secondAnswer === option 
                                                                            ? answers[`${index + 1}-1`].secondAnswerResult 
                                                                            : "regular"}>  
                                                                                {answers[`${index + 1}-1`].firstAnswer === option && "(1)  "}
                                                                                {answers[`${index + 1}-1`].secondAnswer === option && "(2)  "} 
                                                                                {option}  
                                                                </label>
                                                                <br></br>
                                                            </li>
                                                        )}
                                                    )
                                                    }
                                                </ol>
                                                { answers[`${index + 1}-1`].firstAnswerResult === "incorrect" && answers[`${index + 1}-1`].secondAnswerResult === "incorrect" &&
                                                
                                                <span className="correct">
                                                    (answer) {question.correctAnswers}
                                                </span>
                                                
                                                }
                                            </>
                                    }
                                    {
                                        question.type === "composeText" && 
                                        question.fragments.map((fragment, fragIndex) => {
                                            return (
                                                <React.Fragment key={fragment + fragIndex}>
                                                    <span dangerouslySetInnerHTML={{__html: fragment}}></span>
                                                    <br></br>
                                                    { fragIndex < question.fragments.length && 
                                                    <>
                                                        <span className="compose">
                                                            {answers[`${index + 1}-${fragIndex + 1}`].answer}
                                                        </span>   
                                                    </>    
                                                    }
                                                    <br></br>
                                                </React.Fragment>
                                            )
                                        })
                                    }
                            </div>
                        )
                        })
                    }
            </Container>
    )
}

const Container = styled.div`

.question {
   margin-bottom: 30px;  
}
 
p {
    display: flex;
    flex-direction: row; 
    margin: 0; 
}

.questionSubContainer {
    display: flex;
    flex-direction: row;
    align-items: center; 
    flex-wrap: wrap; 
}

.composeSubContainer {
    display: flex;
    flex-direction: row;
    align-items: center; 
    flex-wrap: wrap; 
}

.multipleChoiceSubContainer {
    display: flex;
    flex-direction: column;
    align-items: left; 
    flex-wrap: wrap; 
}

input {
    margin: 0px 3px 0px 3px; 
}

.compose {
    margin-left: 5px; 
}

.number {
    margin-right: 5px;
}

`

export default Result; 
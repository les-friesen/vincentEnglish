import { useEffect, useState} from "react";
import styled from "styled-components";

const FillInTheBlank = ( {question, button, inputRef, answers, currentQuestion, handleChange} ) => {


    return (
        <p className="question">
        {question.fragments.map( (fragment, index) => {
            return (
                <span key={fragment}>
                        <span> {fragment} </span>
                        { index < question.fragments.length - 1 && 
                            <input 
                                required
                                type="text"
                                disabled={button === "Check" ? false : true}
                                ref={index === 0 ? inputRef : null}
                                className={answers[`${currentQuestion + 1}-${index + 1}`] ? answers[`${currentQuestion + 1}-${index + 1}`].status : "regular"}
                                id={`${currentQuestion +1 }-${index + 1}`}
                                value={answers[`${currentQuestion + 1}-${index + 1}`] ? answers[`${currentQuestion + 1}-${index + 1}`].answer : ""}
                                onChange={(e) => handleChange(e.target.id, e.target.value)}
                                ></input>
                                
                        }
                </span>
            )
        }) 
        }
    </p>
    )
}

export default FillInTheBlank
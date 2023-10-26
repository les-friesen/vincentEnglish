import { useEffect, useState} from "react";
import styled from "styled-components";

const ComposeText = ( {question, button, inputRef, answers, currentQuestion, handleChange} ) => {

    return (
        <p className="question">
        {question.fragments.map( (fragment, index) => {
            return (
                <span key={fragment}>
                        <p> {fragment} </p>
                        { index < question.fragments.length && 
                            <textarea 
                                required
                                type="text"
                                style={{width: "98%"}}
                                disabled={button === "Check" ? false : true}
                                ref={index === 0 ? inputRef : null}
                                className="composeText"
                                id={`${currentQuestion +1 }-${index + 1}`}
                                value={answers[`${currentQuestion + 1}-${index + 1}`] ? answers[`${currentQuestion + 1}-${index + 1}`].answer : ""}
                                onChange={(e) => handleChange(e.target.id, e.target.value)}
                                ></textarea>   
                        }
                </span>
            )
        }) 
        }
    </p>
    )
}

export default ComposeText
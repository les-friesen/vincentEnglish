import styled from "styled-components";
import React from "react";

const FillInTheBlank = ( {question, button, inputRef, answers, currentQuestion, handleChange} ) => {

    return (
        <FillInTheBlankContainer> 
            <div className="questionContainer">
                {question.fragments.map( (fragment, index) => {
                return (
                    <React.Fragment key={index}>
                            <span dangerouslySetInnerHTML={{__html: fragment}}></span>
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
                    </React.Fragment>
                )
            })
            }
            </div>
        </FillInTheBlankContainer>
    )
}

const FillInTheBlankContainer = styled.div`
line-height: 1.6; 
margin: 30px 0px 10px 0px;
display: flex;
align-items: center;  
justify-content: center;

.questionSubContainer {
    display: flex;
    flex-direction: row;
    align-items: center; 
    flex-wrap: wrap; 
}

input {
    margin: 0px 3px 0px 3px; 
}

p {
    margin: 0px; 
    display: flex;
    flex-direction: row; 
}

`

export default FillInTheBlank
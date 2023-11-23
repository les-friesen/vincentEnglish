
import styled from "styled-components";

const ComposeText = ( {question, button, inputRef, answers, currentQuestion, handleChange} ) => {

    return (
        <div className="question">
        {question.fragments.map( (fragment, index) => {
            return (
                <div className="questionSubContainer" key={index}>
                        <p dangerouslySetInnerHTML={{__html: fragment}}></p>
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
                                onChange={(e) => handleChange(e.target.id, e.target.value)}>
                            </textarea>   
                        }
                </div>
            )
        }) 
        }
    </div>
    )
}

export default ComposeText
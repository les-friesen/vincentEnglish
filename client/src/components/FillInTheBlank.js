import styled from "styled-components";

const FillInTheBlank = ( {question, button, inputRef, answers, currentQuestion, handleChange} ) => {

    return (
        <FillInTheBlankContainer> 
            <div className="questionContainer">
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
            </div>
        </FillInTheBlankContainer>
    )
}

const FillInTheBlankContainer = styled.div`
line-height: 1.6; 
margin: 10px 0px 10px 0px; 

.questionContainer {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap; 
    justify-content: center; 
}

span {
    margin: 0px 3px 0px 3px; 
}
`

export default FillInTheBlank
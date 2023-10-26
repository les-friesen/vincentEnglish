import styled from "styled-components"; 


const Result = ( {questions, answers} ) => {

    return (
            <div>
                {
                    questions.map( (question,index) => {
                        return (
                            <div className="question">
                                <span>{index+1}. </span>
                                {
                                    question.type === "fillInTheBlank" &&
                                    question.fragments.map((fragment, fragIndex) => {
                                        return (
                                            <>
                                                <span> {fragment} </span>
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
                                            </>
                                        )
                                    })
                                }
                                {
                                    question.type === "multipleChoice" &&
                                    <>
                                        <span className="mcQuestion">
                                            {question.question}
                                        </span>
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
                                            <>
                                                <span> {fragment} </span>
                                                <br></br>
                                                { fragIndex < question.fragments.length && 
                                                
                                                <span className="compose">
                                                    {answers[`${index + 1}-${fragIndex + 1}`].answer}
                                                </span>
                                                    // <textarea
                                                    //     style={{width: "80%"}}
                                                    //     className="compose"
                                                    //     disabled
                                                    //     value={answers[`${index + 1}-${fragIndex + 1}`].answer}>
                                                    //     </textarea>
                                                }
                                                <br></br>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        )
                        })
                    }
            </div>
    )
}



export default Result; 
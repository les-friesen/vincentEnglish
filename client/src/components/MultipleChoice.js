const MultipleChoice = ( {question, button, answers, currentQuestion, handleChange} ) => {

    return (
        <div className="mcContainer">
            <p className="mcQuestion">
                {question.question}
            </p>
            <ol type="A">
                {
                question.options.map((option) => {
                    return (
                        <li key={option}>
                            <input  type="radio" 
                                    id={`${currentQuestion+1}-1`} 
                                    disabled={button === "Check" ? false : true}
                                    name="choice" 
                                    onChange={(e) => handleChange(e.target.id, e.target.value)}
                                    checked={answers[`${currentQuestion + 1}-1`] && answers[`${currentQuestion + 1}-1`].answer === option ? true : false}
                                    value={option}/>
                            <label htmlFor="choice" 
                                    className={answers[`${currentQuestion + 1}-1`] && answers[`${currentQuestion + 1}-1`].answer === option ? answers[`${currentQuestion + 1}-1`].status : "regular"}
                                    >{option}</label><br></br>
                        </li>
                    )}
                )
                }
            </ol>
        </div>
)
}

export default MultipleChoice; 
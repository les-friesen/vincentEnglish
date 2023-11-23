import { useState, useContext } from "react";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { ReloadContext } from "./ReloadContext";

const CreateNewQuiz = () => {

    const { setReload, isLoading, setIsLoading } = useContext(ReloadContext);
    const [error, setError] = useState(false)
    const [creatingQuiz, setCreatingQuiz] = useState(false)

    const [formData, setFormData] = useState({_id: "", title: "", subtitle: ""})

    const handleFormChange = (id, value) => {
        setFormData({
            ...formData,
            [id] : value
        }) 
    }

       // Function for adding a new quiz
    const AddQuiz = async () => {
        setIsLoading("loading")
        try {
            // const token = await getAccessTokenSilently();
            const response = await fetch('/api/addQuiz', {
                method: "POST",
                headers : {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    // "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
                })
            const data = await response.json();
                if (data.status === 500) {
                    console.log(data)
                    setError(true)
                    setIsLoading("");
                } else {
                setReload(data)
                setFormData({_id: "", title: "", subtitle: ""});
                setCreatingQuiz(false); 
                setIsLoading("");
                setError(false);
                }
        } catch (error) {
            console.log(error);
            setError(true)
            setIsLoading("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AddQuiz(); 
    }

    return (
        <Container>
                <button onClick={() => setCreatingQuiz(!creatingQuiz)}> {creatingQuiz ? "Cancel" : "Add New Quiz"}</button>
                { creatingQuiz && 
                <form className="newQuestionContainer" onSubmit={handleSubmit}>
                        <div className="introInputDiv">
                            <label>Title</label>
                            <input  type="text"
                                    required
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => handleFormChange(e.target.id, e.target.value)}
                                    />
                        </div>
                        <div className="introInputDiv">
                            <label>Subtitle</label>
                            <input  type="text"
                                    id="subtitle"
                                    value={formData.subtitle}
                                    onChange={(e) => handleFormChange(e.target.id, e.target.value)}
                                    />
                        </div>
                        <div className="introInputDiv">
                            <label>ID</label>
                            <input  type="text"
                                    id="_id"
                                    required
                                    value={formData._id}
                                    onChange={(e) => handleFormChange(e.target.id, e.target.value)}
                                    />
                        </div>
                        <p className="para text">Each ID must be unique and will also function as the URL path for the quiz. Avoid spaces or capitalizing, use hyphens as needed. </p>  
                        <div className="buttonContainer">
                            <button type="submit">
                                { isLoading === "loading" ? <CircularProgress size={11}/> : "Create Quiz"}
                            </button>
                        </div>
                        {
                            error &&
                            <p className="error">Quiz not created. Make sure the ID does not alreay exist</p>
                        }
                </form>
                }
        </Container>          
    )
}

const Container = styled.div`
font-family: Arial; 
display: flex; 
flex-direction: column; 
justify-content: center; 
align-items: center; 


.newQuestionContainer {
    transform: translate3d(0, 0, 0);
    padding: 20px; 
    width: 300px; 
    border: solid black 1px; 
    background-color: lightblue; 
    margin-bottom: 10px; 
    border-radius: 5px; 
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
}

.para {
    margin: 10px 0px 10px 0px; 
}

.buttonContainer {
    display: flex;
    justify-content: center; 
}

button {
    
    font-family: Arial; 
    background-color: lightyellow;
    border: solid grey 1px; 
    border-radius: 5px; 
    height: 22px; 
    width: 100px; 
    display: flex;
    justify-content: center; 
    align-items: center; 
}

.introInputDiv {
    display: flex; 
    flex-direction: row; 
    justify-content: space-between; 
    width: 250px; 
    margin-bottom: 10px; 
    input {
        width: 175px; 
    }
}

.error {
    padding: 5px; 
    margin: 5px 0px 5px 0px; 
    background-color: lightyellow; 
    color: red; 
    border-radius: 5px; 
    border: solid black 2px;  
}

`


export default CreateNewQuiz; 
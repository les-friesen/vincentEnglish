import CreateNewQuiz from "./CreateNewQuiz";
import styled from "styled-components";
import { CircularProgress } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ReloadContext } from "./ReloadContext";
import { FiTrash2 } from "react-icons/fi";

const AllQuizzes = () => {

    const [ quizData, setQuizData] = useState();
    const { isLoading, setIsLoading, reload, setReload } = useContext(ReloadContext); 

    useEffect (() => {
        getQuizzes()
    }, [reload])

    const getQuizzes = async () => {
        try {
            // const token = await getAccessTokenSilently();
            const response = await fetch(`/api/getQuizzes`, 
            // { headers : {
            //     authorization: `Bearer ${token}`
            // }}
            )
            const data = await response.json();
            setQuizData(data.data.reverse()); 
            console.log(data)
            setIsLoading("")
        } catch (error) {
            console.log(error);
            setIsLoading("")
        }
    };

    const handleDeleteQuiz = async (id) => {
        console.log(id)
        setIsLoading(`deleteQuiz-${id}`)
        try {
            // const token = await getAccessTokenSilently();
            const response = await fetch(`/api/deleteQuiz/${id}`, {
                method: "DELETE"
                // headers : {
                //     "authorization": `Bearer ${token}`
                // }
            })
            const data = await response.json();
                //setUpdateData(data);
                console.log(data)
                setReload(data); 
        } catch (error) {
        console.log(error);
        setIsLoading("");
        }
    }

return (
    <Container>
        <CreateNewQuiz />
        {   !quizData 
        ?   <ProgressDiv>
                <CircularProgress /> 
            </ProgressDiv>
        :  <div className="subcontainer">
            {
            quizData.map((quiz) => {
                    return (
                        <div key={quiz._id} className="quiz">
                            <StyledLink to={`/admin/edit/${quiz._id}`}>
                                <button>{quiz.title}</button>
                            </StyledLink>
                            <button 
                                className="trash"
                                id={quiz._id}
                                onClick={(e) => handleDeleteQuiz(e.currentTarget.id)}
                                >
                                {
                                    isLoading === `deleteQuiz-${quiz._id}` 
                                    ? <CircularProgress size={11}/>
                                    : <FiTrash2 style={{paddingBottom: "0px"}}size={13}/>
                                }
                            </button>
                        </div>
                    )
                })
            }
            </div>
        }
    </Container>
)
}

const ProgressDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center; 
`

const Container = styled.div`

font-family: Arial; 
display: flex; 
flex-direction: column;
justify-cotent: center;
align-items: center; 

.subcontainer {
    display: flex;
    width: 30%; 
    min-width: 100px; 
    flex-direction: column; 
    justify-content: left; 
}

.trash {
    display: flex; 
    align-items: center; 
    justify-content: center; 
    height: 21.5px; 
}

.quiz {
    border: solid black 1px; 
    border-radius: 3px; 
    background-color: lightblue; 
    margin: 5px 0px 5px 0px; 
    padding: 3px; 
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}



`

const StyledLink = styled(Link)`
    text-decoration: none; 
    &:hover {
    text-decoration: none;
    color: inherit;
}
`

export default AllQuizzes; 

import styled from "styled-components";
import { useState } from "react";
import AllQuizzes from "./AllQuizzes";
import Quiz2 from "./Quiz2";
import BuildQuiz from "./BuildQuiz";
import GlobalStyle from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

function App() {

  return (
    <BrowserRouter>
      <GlobalStyle/>
      {/* <BuildQuiz/> */}
      {/* <Container>
        <p className="title">{assignment2.title}</p>
        <p className="subtitle">{assignment2.subtitle}</p>
        <Quiz2 questions={assignment2.questions} />
      </Container> */}
      <Routes>
        <Route path="/admin/quizzes" element={<AllQuizzes />} />
        <Route path="/admin/edit/:quizId" element={<BuildQuiz />} /> 
      </Routes>
    </BrowserRouter>
  );
}

const Container = styled.div`
 
padding-top: 20px; 
padding-bottom: 20px; 
font-family: Open Sans;
.title {
  margin-top: 0; 
  
  font-size: 2em; 
  font-weight: 800; 
  text-align: center; 
}
.subtitle {
   
  text-align: center; 
  font-size: 1.5em; 
  font-style: italic; 
}

`

export default App;

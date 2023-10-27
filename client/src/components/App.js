import Assignment from "./Assignment";
import Quiz from "./Quiz";
import styled from "styled-components";
import { useState } from "react";
import { assignment1 } from "../data";
import { assignment2 } from "../data";
import Quiz2 from "./Quiz2";
import BuildQuiz from "./BuildQuiz";
import GlobalStyle from "./GlobalStyles";

function App() {

  return (
    <>
      <GlobalStyle/>
      <BuildQuiz/>
      {/* <Container>
        <p className="title">{assignment2.title}</p>
        <p className="subtitle">{assignment2.subtitle}</p>
        <Quiz2 questions={assignment2.questions} />
      </Container> */}
    </>
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

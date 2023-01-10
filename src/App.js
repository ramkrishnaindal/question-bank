import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
// import CreateQuestions from './pages/CreateQuestions';
import Test from "./pages/Test";
import QuestionBank from "./pages/QuestionBank";
import CreateQuestions from "./pages/CreateQuestions";
import Heading from "./components/Heading";
import { Route, Routes, Navigate } from "react-router-dom";
// able to use this app.import React from "react";
// import {
//   // BrowserRouter as Router,
//   Switch,
//   Route,
//   // Link
// } from "react-router-dom";
// import {Switch} from 'react-router'
export const NotFound = () => (
  <div className="container">
    <h5
      className="row justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      {" "}
      404: Page Not Found
    </h5>
  </div>
);

function App() {
  debugger;
  // console.log("process.env.REACT_APP_JSON_SERVER_URL",process.env)
  console.log("REACT_APP_JSON_SERVER_URL", process.env.REACT_APP_PUBLIC_URL);
  return (
    <div className="container">
      <Heading />
      {/* <QuestionBank/> */}
      <Routes basename={process.env.REACT_APP_PUBLIC_URL}>
        <Route path="/" exact element={<Test />} />
        <Route path="/question-bank" exact element={<QuestionBank />} />
        <Route path="/create-questions" exact element={<CreateQuestions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

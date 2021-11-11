import { useState, useEffect } from "react";

import AnswerQuestion from "./AnswerQuestion";
import PageNavigator from "./PageNavigator";
const AnswersWrapper = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const [pageQuestions, setPageQuestions] = useState([]);
  let { noOfQuestionsPerPage, answers } = props;
  noOfQuestionsPerPage = +noOfQuestionsPerPage;
  useEffect(() => {
    
    let answersSelected;
    if (noOfQuestionsPerPage >= answers.length) {
      // setQuestionsPerPage(answers.length);
      answersSelected = answers;
    } else {
      // setQuestionsPerPage(noOfQuestionsPerPage);

      if (
        answers.length - (currentPage - 1) * noOfQuestionsPerPage >
        noOfQuestionsPerPage
      )
        answersSelected = answers.slice(
          (currentPage - 1) * noOfQuestionsPerPage,
          (currentPage - 1) * noOfQuestionsPerPage + noOfQuestionsPerPage
        );
      else
        answersSelected = answers.slice(
          (currentPage - 1) * noOfQuestionsPerPage,
          (currentPage - 1) * noOfQuestionsPerPage +
            (answers.length - (currentPage - 1) * noOfQuestionsPerPage)
        );
    }
    
    setPageQuestions(answersSelected);
  }, [currentPage]);
  
  const nextHandler = () => {
    setCurrentPage((prevVal) => prevVal + 1);
  };
  const prevHandler = () => {
    setCurrentPage((prevVal) => prevVal - 1);
  };
  return (
    <>
      {pageQuestions.map((ans, index) => (
        <AnswerQuestion
          index={index}
          key={ans.id}
          answer={ans}
          
          answerChanged={props.answerChanged}
        />
      ))}
      <PageNavigator
        noOfQuestionsPerPage={noOfQuestionsPerPage}
        totalQuestions={answers.length}
        currentPage={currentPage}
        next={nextHandler}
        prev={prevHandler}
        submitTest={props.submitTest}
        isSubmitted={props.isSubmitted}
      />
    </>
  );
};

export default AnswersWrapper;

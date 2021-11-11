import { useState, useEffect } from "react";
import TestAnswer from "./TestAnswer";
const AnswerQuestion = (props) => {
  // const [answersSubmitted, setAnswersSubmitted] = useState([]);
  const { question, questionHint, questionId, id, isSingle, answers } =
    props.answer;
  // useEffect(() => {
  //   const answersTemp = [...answers];
  //   answersTemp.map((a) => {
  //     a.answerSubmitted = false;
  //   });
  //   setAnswersSubmitted(answersTemp);
  //   props.answerChanged(id,answersTemp)
  // }, []);

  const optionChangedHandler = (answr) => {
    let answersTemp = [...answers];
    debugger
    if(isSingle)
    {
      answersTemp=answersTemp.map((a) => {
        if (a.answer === answr.answer) {
          a.answerSubmitted = true;
        } else a.answerSubmitted = false;
        return a
      });  
    }else{
      answersTemp=answersTemp.map((a) => {
        if (a.answer === answr.answer) {
          a.answerSubmitted = !a.answerSubmitted;
        }
        return a
      });  
    }
    // setAnswersSubmitted(answersTemp);
    props.answerChanged(id,answersTemp)
  };
  return (
    <div
      className={`row justify-content-center align-items-center `}
      data-bs-toggle="tooltip"
      data-bs-html="true"
      data-bs-placement="bottom"
      style={
        props.index % 2 === 0 ? { backgroundColor: "rgb(247, 248, 249)" } : null
      }
      title={questionHint && `Hint: ${questionHint}`}
    >
      <div className="row  mb-3">
        <div className="form-group">
          <label className="form-label" htmlFor="question">
            Question :
          </label>
          <label className="form-text ms-3">{question}</label>
        </div>
      </div>
      {answers.map((ans, index) => {    
        // debugger    
        return (
          <TestAnswer
            key={index}
            answer={ans.answer}
            value={ans.value}
            isSingle={isSingle}
            answerSubmitted={ans.answerSubmitted}
            optionChanged={optionChangedHandler.bind(null, ans)}
          />
        );
      })}
    </div>
  );
};
export default AnswerQuestion;

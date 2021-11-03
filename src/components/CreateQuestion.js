import { useState, useRef } from "react";
import Answer from "./Answer";
import classes from "./CreateQuestion.module.css";
const CreateQuestion = () => {
  const [questionType, setQuestionType] = useState("0");
  const [questionIsValid, setQuestionIsValid] = useState(true);
  const [option,setOption]=useState();
  const [answer,setAnswer]=useState();
  const questionInputRef = useRef();
  const questionHintInputRef=useRef();
  const onQuestionChangeHandler = (e) => {
    setQuestionIsValid(e.target.value.trim().length > 0);
  };
  const setQsnTypeChangeHandler = (e) => {
    setQuestionType(e.target.value);
  };
  const optionChangedHandler = (e) => {
    setOption(e.target.value);
  };
  const answerChangeHandler=(e)  =>{
    setAnswer(e.target.value)
  }
  return (
    <div
      className={`row justify-content-center align-items-center ${classes.content}`}
    >
      <div className="col-10 ">
        <form onSubmit={() => {}}>
          <div className="row mb-3">
            <div className="col-2">
              <label class="form-label">Question Type</label>
            </div>
            <div className="col-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="questionType"
                  id="questionTypeSingle"
                  checked={questionType === "0"}
                  value={"0"}
                  onChange={setQsnTypeChangeHandler}
                />
                <label class="form-check-label" for="questionTypeSingle">
                  Single
                </label>
              </div>
            </div>
            <div className="col-3">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="questionType"
                  checked={questionType === "1"}
                  id="questionTypeMultiple"
                  value={"1"}
                  onChange={setQsnTypeChangeHandler}
                />
                <label class="form-check-label" for="questionTypeMultiple">
                  Multiple
                </label>
              </div>
            </div>
          </div>
          <div className="row  mb-3">
            <div className="form-group">
              <label className="form-label" htmlFor="question">
                Question
              </label>
              <textarea
                className="form-control"
                id="question"
                type="text"
                rows={2}
                style={{resize:"none"}}
                ref={questionInputRef}
                onChange={onQuestionChangeHandler}
              />
              {!questionIsValid && (
                <label className="form-text" style={{ color: "red" }}>
                  Please enter a question
                </label>
              )}
            </div>
          </div>
          <div className="row  mb-3">
            <div className="form-group">
              <label className="form-label" htmlFor="questionHint">
                Question Hint
              </label>
              <textarea
                className="form-control"
                id="questionHint"
                type="text"
                rows={2}
                ref={questionHintInputRef}
                style={{resize:"none"}}
              />
            </div>
          </div>
          <Answer single={questionType === "0"} name="answer" index={0} answer={option}  optionChanged={optionChangedHandler} answerChanged={answerChangeHandler} value={answer}/>
          <Answer single={questionType === "0"} name="answer" index={1} answer={option} optionChanged={optionChangedHandler} answerChanged={answerChangeHandler} value={answer}/>
          <div className={classes.actions}>
            <button
              type="submit"
              className="btn btn-outline-primary d-block ms-auto my-3"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateQuestion;

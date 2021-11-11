import { useState, useRef, useEffect } from "react";
import Answer from "./Answer";
import { v4 as uuid } from "uuid";
import classes from "./CreateQuestion.module.css";
const CreateQuestion = (props) => {
  const [questionType, setQuestionType] = useState("0");
  const [duplicates, setDuplicates] = useState([]);
  const [sameQuestion, setSameQuestion] = useState(false);
  const [questionIsValid, setQuestionIsValid] = useState(true);
  const [answerIsValid, setAnswerIsValid] = useState(false);
  const [answersIsValid, setAnswersIsValid] = useState([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [option, setOption] = useState();
  const [checkedValues, setCheckedValues] = useState([]);
  const [answers, setAnswers] = useState([]);
  const questionInputRef = useRef();
  const questionHintInputRef = useRef();
  console.log("resetNew2", props.resetNew);
  const { resetNew } = props;
  useEffect(() => {
    if (resetNew) {
      setAnswers([]);
      setAnswerCount(0);
      setCheckedValues([]);
      setQuestionType("0");
      setOption("");
      questionInputRef.current.value = "";
      questionHintInputRef.current.value = "";
    }
  }, [resetNew]);
  const onQuestionChangeHandler = (e) => {
    setQuestionIsValid(e.target.value.trim().length > 0);
  };
  const setQsnTypeChangeHandler = (e) => {
    setQuestionType(e.target.value);
  };
  const optionChangedHandler = (i, e) => {
    setOption((prevOption) => {
      prevOption = e.target.value;
      return prevOption;
    });
  };
  const answerChangeHandler = (i, e) => {
    setAnswers((prevAnswer) => {
      const answersPrev = [...prevAnswer];
      answersPrev[+i - 1] = e.target.value;
      const duplicateElements = answersPrev.filter(
        (item, index) => answersPrev.indexOf(item) !== index
      );

      setDuplicates(duplicateElements);
      return answersPrev;
    });
    let isValid = true;
    answers.forEach((answer, index) => {
      const answersIsValidTmp = [...answersIsValid];
      if (i - 1 == index) {
        answersIsValidTmp[+i - 1] = e.target.value.trim().length > 0;
        if (e.target.value.trim().length == 0) {
          isValid = false;
        }
      } else {
        answersIsValidTmp[+i - 1] = answer.trim().length > 0;
        if (answer.trim().length == 0) {
          isValid = false;
        }
      }

      setAnswersIsValid(answersIsValidTmp);
    });
    setAnswerIsValid(isValid);
  };
  const checkedChangedHandler = (i, e) => {
    setCheckedValues((prevCheckedValues) => {
      const checkedValuesPrev = [...prevCheckedValues];
      checkedValuesPrev[+i - 1] = !checkedValuesPrev[+i - 1];
      return checkedValuesPrev;
    });
  };
  const addAnswerHandler = () => {
    setAnswerCount((prevState) => prevState + 1);
    setAnswers((prevAnswer) => {
      prevAnswer.push("");
      return prevAnswer;
    });
    setCheckedValues((prevCheckedValues) => {
      prevCheckedValues.push("");
      return prevCheckedValues;
    });
    setAnswersIsValid((prevAnswersIsValid) => {
      prevAnswersIsValid.push(true);
      return prevAnswersIsValid;
    });
  };
  const removeHandler = (i) => {
    setAnswerCount((prevState) => prevState - 1);

    if (option == +i - 1) {
      setOption("");
    }

    setAnswers((prevAnswer) => {
      prevAnswer.pop();
      return prevAnswer;
    });
    setCheckedValues((prevCheckedValues) => {
      prevCheckedValues.pop();
      return prevCheckedValues;
    });
  };
  const addQuestionHandler = async () => {
    const questionIsValid = questionInputRef.current.value.trim().length > 0;
    setQuestionIsValid(questionIsValid);
    let isValid = true;
    const answersIsValidTmp = [...answersIsValid];

    answers.forEach((answer, index) => {
      answersIsValidTmp[index] = answer.trim().length > 0;
      if (answer.trim().length == 0) {
        isValid = false;
      }
    });
    setAnswerIsValid(isValid);
    setAnswersIsValid(answersIsValidTmp);
    if (
      questionType === "0" &&
      (!answerIsValid || !option || !questionIsValid)
    ) {
      return;
    }
    const answerSelected = checkedValues.some((ans) => ans === true);
    if (
      questionType === "1" &&
      (!answerIsValid || !answerSelected || !questionIsValid)
    ) {
      return;
    }
    const duplicateElements = answers.filter(
      (item, index) => answers.indexOf(item) !== index
    );
    setDuplicates(duplicateElements);
    if (duplicateElements.length > 0) {
      return;
    }
    let answersToPost = [];
    if (questionType === "0") {
      answers.forEach((ans, index) => {
        answersToPost.push({ answer: ans, value: +index === +option });
      });
    } else {
      answers.forEach((ans, index) => {
        answersToPost.push({ answer: ans, value: !!checkedValues[index] });
      });
    }
    const body = {
      id: uuid(),
      question: questionInputRef.current.value,
      questionHint: questionHintInputRef.current.value,
      isSingle: questionType === "0",
      answers: answersToPost,
    };

    const responseGet = await fetch(
      `http://localhost:3004/questionBank/${props.questionBankId}`
    );
    const data = await responseGet.json();
    const questions = data.questions;
    const found = questions.some(
      (qns) => qns.question === questionInputRef.current.value
    );
    if (found) {
      setSameQuestion(true);
      return;
    } else {
      setSameQuestion(false);
    }
    questions.push(body);
    props.addQuestion(questions);

    // console.log("answerIsValid", answerIsValid);
    // console.log("option", option);
    // console.log("answers", answers);
    // console.log("checkedValues", checkedValues);
  };
  const getAnswers = () => {
    const answersComp = [];
    for (let i = 1; i <= answerCount; i++) {
      answersComp.push(
        <Answer
          key={i}
          single={questionType === "0"}
          name="answer"
          index={i - 1}
          answer={option}
          checked={checkedValues[i - 1]}
          optionChanged={optionChangedHandler.bind(null, i)}
          answerChanged={answerChangeHandler.bind(null, i)}
          checkedChanged={checkedChangedHandler.bind(null, i)}
          isLast={i == answerCount}
          value={answers[i - 1]}
          answerIsValid={answersIsValid[i - 1]}
          remove={removeHandler.bind(null, i)}
        />
      );
    }
    return answersComp.length > 0 ? answersComp : null;
  };
  return (
    <div
      className={`row justify-content-center align-items-center ${classes.content}`}
      style={{
        border: "2px solid rgb(247, 248, 249)",
        overflowx: "hidden",
        overflowY: "auto",
        marginRight: "0px",
      }}
    >
      <div className="col-10 ">
        <div className="row mb-3">
          <div className="col-2">
            <label className="form-label">Question Type</label>
          </div>
          <div className="col-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="questionType"
                id="questionTypeSingle"
                checked={questionType === "0"}
                value={"0"}
                onChange={setQsnTypeChangeHandler}
              />
              <label className="form-check-label" htmlFor="questionTypeSingle">
                Single
              </label>
            </div>
          </div>
          <div className="col-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="questionType"
                checked={questionType === "1"}
                id="questionTypeMultiple"
                value={"1"}
                onChange={setQsnTypeChangeHandler}
              />
              <label
                className="form-check-label"
                htmlFor="questionTypeMultiple"
              >
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
              style={{ resize: "none" }}
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
          <div className="col-10">
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
                style={{ resize: "none" }}
              />
            </div>
          </div>
          <div className="col-2 d-flex align-items-end ms-auto">
            <button
              type="button"
              className={`btn btn-outline-primary  ${classes["btn-small"]}`}
              onClick={addAnswerHandler}
            >
              Add Answer
            </button>
          </div>
        </div>

        {getAnswers()}
        {duplicates && duplicates.length > 0 && (
          <>
            <div style={{ color: "red" }}>Duplicate entries found</div>
            {duplicates.map((dup, index) => (
              <div key={index}>
                <label className="form-text" style={{ color: "red" }}>
                  {dup}
                </label>
              </div>
            ))}
          </>
        )}
        {sameQuestion && (
          <>
            <div style={{ color: "red" }}>Question already exists.</div>
            <label className="form-text" style={{ color: "red" }}>
              {questionInputRef.current.value}
            </label>
          </>
        )}

        <div className={classes.actions}>
          <button
            type="button"
            className="btn btn-outline-primary d-block ms-auto my-3"
            onClick={addQuestionHandler}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};
export default CreateQuestion;

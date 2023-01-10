import { useRef, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import AnswersWrapper from "./AnswersWrapper";
const NewTest = () => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [qnsBankIsValid, setQnsBankIsValid] = useState(true);
  const [noOfQuestions, setNoOfQuestions] = useState("2");
  const [loading, setIsLoading] = useState(false);
  const [nameIsValid, setNameIsValid] = useState(true);
  const [questionBankID, setquestionBankID] = useState();
  const [questions, setQuestions] = useState();
  const [tests, setTests] = useState([]);
  const [currentTest, setCurrentTest] = useState();
  const [answers, setAnswers] = useState([]);
  const [testScore, setTestScore] = useState();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const noOfQuestionsChangeHandler = (e) => {
    setNoOfQuestions(e.target.value);
  };
  const getMarksScored = () => {
    debugger;
    let correctAnswers = 0;
    answers.forEach((qns) => {
      let qnsAnsweredCorrect = true;
      let qnsAnsweredCorrectVal = 0;
      let qnsAnsweredCorrectPerc = 0;
      qns.answers.forEach((ans) => {
        if (qns.isSingle) {
          if (ans.value !== ans.answerSubmitted) {
            qnsAnsweredCorrect = false;
            return;
          }
        } else {
          if (ans.value === ans.answerSubmitted) {
            qnsAnsweredCorrectVal++;
          }
        }
      });
      if (qns.isSingle) {
        if (qnsAnsweredCorrect) {
          correctAnswers++;
        }
      } else {
        qnsAnsweredCorrectPerc = qnsAnsweredCorrectVal / qns.answers.length;
        correctAnswers += qnsAnsweredCorrectPerc;
      }
    });
    return Math.round(correctAnswers * 100) / 100;
  };
  const submitTestHandler = async () => {
    debugger;
    const score = getMarksScored();
    const modifiedTests = tests.map((t) => {
      if (t.id === currentTest.id) {
        t.answers = answers;
        t.submitted = true;
        t.score = score;
      }
      return t;
    });

    setTestScore(`You scored ${score}/${answers.length}`);
    const response = await fetch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`,
      {
        method: "PATCH",
        body: JSON.stringify({ tests: modifiedTests }),
        headers: { "Content-type": "application/json" },
      }
    );
    debugger;
  };
  const answerChangedHandler = (id, answersChanged) => {
    debugger;
    const answersToBeChanged = [...answers];
    const changedPageQuestions = answersToBeChanged.map((pqns) => {
      if (pqns.id === id) {
        pqns.answers = answersChanged;
      }
      return pqns;
    });
    setAnswers(changedPageQuestions);
  };

  const questionBankTitleChangeHandler = (e) => {
    const qsnBank = questionBanks.find((sqb) => sqb.id === e.target.value);
    setquestionBankID(e.target.value);
    if (qsnBank && qsnBank.questions) {
      setQuestions(qsnBank.questions);

      setTests(qsnBank.tests ? qsnBank.tests : []);
      // setCurrentTest(() => {
      //   const test = qsnBank.tests.find(
      //     (t) => t.id === "a82cad11-4ff3-48bc-9a95-92ea9c9756bc"
      //   );
      //   if (test) setAnswers(test.answers);
      //   return test;
      // });
      setQnsBankIsValid(true);
    } else {
      setQuestions(null);
    }
  };
  const resetTestHandler = () => {
    setCurrentTest(null);
    setTestScore(null);
  };
  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank`
      );
      let data = await response.json();
      // .filte((qnsBank) => qnsBank.questions.length > 0);
      data = data.filter((qnsBank) => qnsBank.questions.length > 0);
      setQuestionBanks(data);
      setIsLoading(false);
    };
    loadData();
  }, []);
  const onNameChangeHandler = (e) => {
    setNameIsValid(e.target.value.trim().length > 0);
  };
  const startTestHandler = async () => {
    debugger;
    if (nameInputRef.current.value.trim().length === 0) {
      setNameIsValid(false);
      return;
    }
    if (!questionBankID) {
      setQnsBankIsValid(false);
      return;
    }
    const test = { id: uuid() };

    // const answersFromQuestions = questions.map((qns) => {
    //   const { id: questionId, questionHint,answers, ...otherProps } = qns;
    //   const ans = { ...otherProps, questionHint, questionId };
    //   ans.id = uuid();
    //   return ans;
    // });
    test.answers = questions.map((qns) => {
      return {
        ...qns,
        answers: qns.answers.map((a) => {
          return {
            ...a,
            answerSubmitted: null,
          };
        }),
      };
    });
    test.name = nameInputRef.current.value;
    test.email = emailInputRef.current.value;
    test.noOfQuestionsPerPage = noOfQuestions;
    const testsModified = [...tests];
    setCurrentTest(test);
    setAnswers(test.answers);
    testsModified.push(test);
    setTests(testsModified);

    const response = await fetch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`,
      {
        method: "PATCH",
        body: JSON.stringify({ tests: testsModified }),
        headers: { "Content-type": "application/json" },
      }
    );
    // responseGet = await fetch(
    //   `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`
    // );
    // data = await responseGet.json();
    // setQuestions(data.questions);
  };
  if (loading)
    return (
      <div className="justify-content-center align-items-center">
        Loading...
      </div>
    );
  if (!currentTest)
    return (
      <>
        <div className={`row justify-content-center align-items-center`}>
          <div
            className="col-10"
            style={{ border: "2px solid rgb(247, 248, 249)" }}
          >
            <form onSubmit={() => {}} className="d-flex flex-column">
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Question bank title
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                  onChange={questionBankTitleChangeHandler}
                >
                  <option>please select a Question Bank</option>
                  {questionBanks.map((questionBank) => (
                    <option key={questionBank.id} value={questionBank.id}>
                      {questionBank.title}
                    </option>
                  ))}
                </select>
                {!qnsBankIsValid && (
                  <label className="form-text" style={{ color: "red" }}>
                    Please select a QuestionBank
                  </label>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className={`row justify-content-center align-items-center`}>
          <div
            className="col-10"
            style={{ border: "2px solid rgb(247, 248, 249)" }}
          >
            <div className="row  mb-3">
              <div className="form-group col-6">
                <label className="form-label" htmlFor="question">
                  Name
                </label>
                <input
                  className="form-control"
                  id="name"
                  type="text"
                  ref={nameInputRef}
                  onChange={onNameChangeHandler}
                />
                {!nameIsValid && (
                  <label className="form-text" style={{ color: "red" }}>
                    Please enter your name
                  </label>
                )}
              </div>
              <div className="form-group col-6">
                <label className="form-label" htmlFor="noOfQuestions">
                  Number of Questions per page
                </label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                  id="noOfQuestions"
                  onChange={noOfQuestionsChangeHandler}
                  value={noOfQuestions}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div className="row  mb-3 justify-content-center">
              <div className="form-group col-6">
                <label className="form-label" htmlFor="question">
                  E Mail
                </label>
                <input
                  className="form-control"
                  id="email"
                  type="email"
                  ref={emailInputRef}
                />
              </div>
            </div>
            <div className="row  mb-3 justify-content-center">
              <div className="form-group col-6 d-flex justify-content-center">
                <button
                  type="button"
                  className={`btn btn-outline-primary`}
                  onClick={startTestHandler}
                >
                  Start Test
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  if (currentTest)
    return (
      <>
        <AnswersWrapper
          answers={answers}
          noOfQuestionsPerPage={currentTest.noOfQuestionsPerPage}
          answerChanged={answerChangedHandler}
          submitTest={submitTestHandler}
          isSubmitted={!!testScore}
        />
        {testScore && (
          <>
            <div
              class="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid rgb(247, 248, 249)",
              }}
            >
              <div className="col-2 my-3 text-primary mx-auto d-block">
                <h6 style={{ textAlign: "center" }}>{testScore}</h6>
              </div>
            </div>

            <div
              class="row"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "2px solid rgb(247, 248, 249)",
              }}
            >
              <div className="col-2 my-3">
                <button
                  type="button"
                  className="btn btn-primary mx-auto d-block"
                  onClick={resetTestHandler}
                >
                  Reset
                </button>
              </div>
            </div>
          </>
        )}
      </>
    );
};
export default NewTest;

import { useState, useEffect } from "react";
import classes from "./CreateQuestionsForQuestionBankComponent.module.css";
import Questions from "./Questions";

const CreateQuestionsForQuestionBankComponent = () => {
  const [loading, setIsLoading] = useState(false);
  const [resetNew, setResetNew] = useState(false);
  const [questionBanks, setQuestionBanks] = useState([]);
  const [questions, setQuestions] = useState();
  const [questionBankID, setquestionBankID] = useState();

  const removeQuestionHandler = async (id) => {
    let responseGet = await fetch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`
    );
    let data = await responseGet.json();
    const questions = data.questions.filter((qns) => qns.id !== id);

    const response = await fetch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`,
      {
        method: "PATCH",
        body: JSON.stringify({ questions: questions }),
        headers: { "Content-type": "application/json" },
      }
    );
    responseGet = await fetch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`
    );
    data = await responseGet.json();
    setQuestions(data.questions);
  };
  const addQuestionHandler = async (questions) => {
    const response = await fetch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`,
      {
        method: "PATCH",
        body: JSON.stringify({ questions: questions }),
        headers: { "Content-type": "application/json" },
      }
    );
    const responseGet = await fetch(
      `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank/${questionBankID}`
    );
    const data = await responseGet.json();
    setQuestions(data.questions);
    setResetNew(true);
    setTimeout(() => {
      setResetNew(false);
    }, 100);
  };
  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_JSON_SERVER_URL}/questionBank`
      );
      const data = await response.json();

      setQuestionBanks(data);
      setIsLoading(false);
    };
    loadData();
  }, []);
  const questionBankTitleChangeHandler = (e) => {
    const qsnBank = questionBanks.find((sqb) => sqb.id === e.target.value);
    setquestionBankID(e.target.value);
    if (qsnBank && qsnBank.questions) setQuestions(qsnBank.questions);
    else {
      setQuestions(null);
    }
  };

  if (loading)
    return (
      <div className="justify-content-center align-items-center">
        Loading...
      </div>
    );
  return (
    <div
      className={`row justify-content-center align-items-center ${classes.content}`}
    >
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
          </div>
          <Questions
            resetNew={resetNew}
            questions={questions}
            questionBankId={questionBankID}
            removeQuestion={removeQuestionHandler}
            addQuestion={addQuestionHandler}
          />
        </form>
      </div>
    </div>
  );
};
export default CreateQuestionsForQuestionBankComponent;

import { useRef ,useEffect, useState } from "react";

const NewTest = () => {
  const [questionBanks, setQuestionBanks] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [nameIsValid,setNameIsValid]=useState(true);
  const [questionBankID, setquestionBankID] = useState();
  const [questions, setQuestions] = useState();
  const nameInputRef=useRef()
  const questionBankTitleChangeHandler = (e) => {
    const qsnBank = questionBanks.find((sqb) => sqb.id === e.target.value);
    setquestionBankID(e.target.value);
    if (qsnBank && qsnBank.questions) setQuestions(qsnBank.questions);
    else {
      setQuestions(null);
    }
  };
  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      const response = await fetch("http://localhost:3004/questionBank");
      let data = await response
        .json()
        // .filte((qnsBank) => qnsBank.questions.length > 0);
      data=data.filter((qnsBank) => qnsBank.questions.length > 0);
      setQuestionBanks(data);
      setIsLoading(false);
    };
    loadData();
  }, []);
  const onNameChangeHandler=(e)=>{
    setNameIsValid(e.target.value.trim().length>0)
  }
  if (loading)
    return (
      <div className="justify-content-center align-items-center">
        Loading...
      </div>
    );
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
            </div>
          </form>
        </div>
      </div>
      <div className={`row justify-content-center align-items-center`}>
        <div className="row  mb-3">
          <div className="form-group">
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
        </div>
      </div>
    </>
  );
};
export default NewTest;

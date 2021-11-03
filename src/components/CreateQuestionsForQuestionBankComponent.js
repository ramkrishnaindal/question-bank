import { useState, useEffect } from "react";
import classes from "./CreateQuestionsForQuestionBankComponent.module.css";
import Questions  from "./Questions";

const CreateQuestionsForQuestionBankComponent = () => {
  const [loading, setIsLoading] = useState(false);
  const [questionBanks, setQuestionBanks] = useState([]);
  const [questions, setQuestions] = useState();
  
  useEffect(() => {
    setIsLoading(true);
    const loadData = async () => {
      const response = await fetch("http://localhost:3004/questionBank");
      const data = await response.json();
      console.log(data);
      setQuestionBanks(data);
      setIsLoading(false);
    };
    loadData();
  }, []);
  const questionBankTitleChangeHandler=(e)=>{
    const qsnBank=questionBanks.find(sqb=>sqb.id===e.target.value)
    
    if(qsnBank && qsnBank.questions)
    setQuestions(qsnBank.questions)
    else{
        setQuestions(null)
    }
    
  }
  
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
      <div className="col-10 ">
        <form onSubmit={() => {}}>
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Question bank title
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              defaultValue="" onChange={questionBankTitleChangeHandler}
            >
              <option>please select a Question Bank</option>
              {questionBanks.map((questionBank) => (
                <option key={questionBank.id} value={questionBank.id}>
                  {questionBank.title}
                </option>
              ))}
            </select>
          </div>
          <Questions questions={questions}/>
          <div className={classes.actions}>
            <button
              type="submit"
              className="btn btn-outline-primary d-block ms-auto my-3"
            >
              Save Question Bank
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateQuestionsForQuestionBankComponent;

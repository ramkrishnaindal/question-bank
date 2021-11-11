import { useRef, useState } from "react";
import classes from "./CreateQuestionBankComponent.module.css";
import { v4 as uuid } from "uuid";
const CreateQuestionBankComponent = (props) => {
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [titleIsTaken, setTitleIsTaken] = useState(false);
  const titleInputRef = useRef();
  const onTitleChangeHandler = () => {
    setTitleIsTaken(false);
    if (titleInputRef.current.value.trim() === "") {
      setTitleIsValid(false);
      return;
    }
    setTitleIsValid(true);
  };
  const saveHandler = async (e) => {
    e.preventDefault();
    if (titleInputRef.current.value.trim() === "") {
      setTitleIsValid(false);
      return;
    }
    setTitleIsValid(true);
    const response = await fetch("http://localhost:3004/questionBank");
    const data = await response.json();
    const some = data.some(
      (qnsBnk) => qnsBnk.title === titleInputRef.current.value.trim()
    );
    if (some) {
      setTitleIsTaken(true);
      return;
    }
    const body = {
      id: uuid(),
      title: titleInputRef.current.value,
      questions: [],
      tests: []
    };
    props.addQuestionBank(body);
  };
  return (
    <div
      className={`row justify-content-center align-items-start mb-3 ${classes.content}`}
    >
      <div className="col-10 ">
        <form onSubmit={saveHandler}>
          <div className="row">
            <div className="col-10 ">
              <div className="form-group">
                <label className="form-label" htmlFor="title">
                  Question bank title
                </label>
                <input
                  className="form-control"
                  id="title"
                  type="text"
                  ref={titleInputRef}
                  onChange={onTitleChangeHandler}
                />
                {!titleIsValid && (
                  <label className="form-text" style={{ color: "red" }}>
                    {" "}
                    Please enter a title
                  </label>
                )}
              </div>
              {titleIsTaken && (
                <>
                  <div style={{ color: "red" }}>
                    Question bank with same name already exists.
                  </div>
                  <label className="form-text" style={{ color: "red" }}>
                    {titleInputRef.current.value}
                  </label>
                </>
              )}
            </div>
            <div className={`col-2 d-flex align-items-end`}>
              <button
                type="submit"
                className="btn btn-outline-primary d-block ms-auto align-self-end"
              >                
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateQuestionBankComponent;

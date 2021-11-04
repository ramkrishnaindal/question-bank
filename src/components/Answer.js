import { useState,useEffect } from 'react';
import classes from './Answer.module.css'
const Answer = (props) => {
  
  const [textIsValid,setTextIsValid]=useState(props.answerIsValid);
  const {answerIsValid}=props;
  useEffect(()=>{
    setTextIsValid(answerIsValid)
  },[answerIsValid])
  const answerChangeHandler=(e)=>{    
    setTextIsValid(e.target.value.trim().length>0)
    props.answerChanged(e)    
  }
  let option;
  if (props.single) {
    option = (
      <div className="col-1">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={props.name}
            checked={
              props.answer === "" ? false : +props.answer === props.index
            }
            value={props.index}
            onChange={props.optionChanged}
          />
        </div>
      </div>
    );
  } else {
    option = (
      <div className="col-1">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            name={props.name}
            checked={props.checked}
            onChange={props.checkedChanged}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="row mb-2">
        {option}
        <div className="col-9">
          <textarea
            className="form-control"
            id={`${props.name}textarea${props.index}`}
            type="text"
            rows={2}
            style={{ resize: "none" }}
            onChange={answerChangeHandler}
            value={props.value}
          />
          {!textIsValid && (
                <label className="form-text" style={{ color: "red" }}>
                  Please enter an answer text
                </label>
              )}
        </div>
        {props.isLast && (
          <div className="col-2 d-flex align-items-end ms-auto px-3 ">
            <button
              type="button"
              className={`btn btn-outline-primary  ${classes["btn-small"]}`}
              onClick={props.remove}
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default Answer;

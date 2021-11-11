const TestAnswer = (props) => {
  let option;
  if (props.isSingle) {
    option = (
      <div className="col-1">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name={props.name}
            checked={
              props.answerSubmitted
            }
            value={props.answer}
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
            name={props.answer}
            checked={props.answerSubmitted}
            onChange={props.optionChanged}
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
          <label className="form-check-label">{props.answer}</label>
        </div>
      </div>
    </>
  );
};
export default TestAnswer;

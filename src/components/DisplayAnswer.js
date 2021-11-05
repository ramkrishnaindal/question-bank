const DisplayAnswer = (props) => {
  
  const { answer, value, question, index, isLast } = props;
  let option;
  if (props.isSingle) {
    option = (
      <div className="col-1">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            readOnly
            name={question}
            checked={value}
            value={index}
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
            readOnly
            checked={value}
          />
        </div>
      </div>
    );
  }
  return (
    <div className="row mb-2">
      {option}
      <div className={isLast ? "col-8" : "col-10"}>
        <label className="form-check-label">{answer}</label>
      </div>
      {isLast && (
        <div className="col-3">
          <button
            type="button"
            className="btn btn-outline-primary d-block ms-auto my-3"
            onClick={props.removeQuestion}
          >
            Remove Question
          </button>
        </div>
      )}
    </div>
  );
};
export default DisplayAnswer;

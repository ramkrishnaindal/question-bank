
const Answer = (props) => {
  let option;
  if (props.single) {
    option = (
      <div className="col-1">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name={props.name}
            checked={props.answer == props.index}
            value={props.index}
            onChange={props.optionChanged}
          />
        </div>
      </div>
    );
  } else {
    option = (
      <div className="col-1">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            name={props.name}
            defaultValue={props.checked}
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
        <div className="col-11">
          <textarea
            className="form-control"
            id={`${props.name}textarea${props.index}`}
            type="text"
            rows={2}
            style={{ resize: "none" }}
            onChange={props.answerChanged}
            value={props.value}
          />
        </div>
      </div>
    </>
  );
};
export default Answer;

import DisplayAnswer from "./DisplayAnswer";
const ViewQuestion = (props) => {
  const { id, isSingle, question, questionHint, answers } = props.question;
  return (
    <div
      className={`row justify-content-center align-items-center`}
      style={
        props.index % 2 === 0 ? { backgroundColor: "rgb(247, 248, 249)" } : null
      }
    >
      <div className="row  mb-3">
        <div className="form-group">
          <label className="form-label" htmlFor="question">
            Question :
          </label>
          <label className="form-text ms-3">{question}</label>
        </div>
      </div>
      {questionHint && (
        <div className="row  mb-3">
          <div className="col-10">
            <div className="form-group">
              <label className="form-label" htmlFor="questionHint">
                Question Hint :
              </label>

              <label className="form-text  ms-3">{questionHint}</label>
            </div>
          </div>
        </div>
      )}
      {answers.map((answer, index) => {
        return (
          <DisplayAnswer
            key={index}
            answer={answer.answer}
            value={answer.value}
            question={question}
            index={index}
            isLast={index ===answers.length-1}
            isSingle={isSingle}
            removeQuestion={props.removeQuestion}
          />
        );
      })}
    </div>
  );
};
export default ViewQuestion;

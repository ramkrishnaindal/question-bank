import Questions from "./Questions";

const ViewQuestionBanks = (props) => {
  const { isLoading, questionBanks } = props;

  if (isLoading) return <div className="">Laoding...</div>;
  if (questionBanks.length > 0)
    return (
      <div style={{ border: "2px solid rgb(247, 248, 249)" }} className="pt-3">
        {questionBanks.map((qnsBank) => (
          <div key={qnsBank.id} className="row mb-3 justify-content-center">
            <div className="col-10">
              <div key={qnsBank.id} className="row align-items-center">
                <div className="col-8">{qnsBank.title}</div>
                <div className="col-2">
                  {qnsBank.questions.length} questions
                </div>
                <div className="col-2">
                  <button
                    type="button"
                    className="btn btn-outline-primary d-block ms-auto my-3"
                    onClick={props.removeQuestionBank.bind(null, qnsBank.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );

  return null;
};
export default ViewQuestionBanks;

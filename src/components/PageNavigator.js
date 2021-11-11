const PageNavigator = (props) => {
  const { noOfQuestionsPerPage, totalQuestions, currentPage } = props;
  if (totalQuestions <= noOfQuestionsPerPage)
    return (
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid rgb(247, 248, 249)",
        }}
      >
        <div className="col-2 my-3">
          <button
            type="button"
            className="btn btn-primary mx-auto d-block"
            onClick={props.submitTest}
            disabled={props.isSubmitted}
          >
            Submit Test
          </button>
        </div>
      </div>
    );
  const showNextPage = currentPage * noOfQuestionsPerPage < totalQuestions;
  const showPrevPage = currentPage !== 1;
  return (
    <>
      <div
        class="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "2px solid rgb(247, 248, 249)",
        }}
      >
        <div className="col-1  my-3">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={props.prev}
            style={{ visibility: showPrevPage ? "visible" : "hidden" }}
          >
            Prev
          </button>
        </div>

        <h6 className="col-1  my-3 text-primary">{`Page ${currentPage}`}</h6>

        <div className="col-1  my-3">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={props.next}
            style={{ visibility: showNextPage ? "visible" : "hidden" }}
          >
            Next
          </button>
        </div>
      </div>
      {(!showNextPage || (!showNextPage && !showPrevPage)) && (
        <div
          class="row"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid rgb(247, 248, 249)",
          }}
        >
          <div className="col-2 my-3">
            <button
              type="button"
              className="btn btn-primary mx-auto d-block"
              onClick={props.submitTest}
              style={{ visibility: showPrevPage ? "visible" : "hidden" }}
              disabled={props.isSubmitted}
            >
              Submit Test
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default PageNavigator;
